import { Types } from "mongoose";

class MongoCrudManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const instance = await this.model.create(data);
      return instance;
    } catch (error) {
      throw error;
    }
  }

  async read(id) {
    try {
      const instance = await this.model.findOne({ _id: new Types.ObjectId(id)});
      return instance;
    } catch (error) {
      throw error;
    }
  }

  async readAll(filter) {
    try {
      const instances = await this.model.find(filter, "-__v").lean();
      return instances;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const options = { new: true };
      const instance = this.model.findOneAndUpdate({ _id: id }, data, options);
      return instance;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const instance = this.model.findOneAndDelete({ _id: id });
      return instance;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoCrudManager;
