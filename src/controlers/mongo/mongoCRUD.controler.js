class MongoCrudControler {
  constructor(manager, modelName) {
    this.manager = manager;
    this.modelName = modelName;
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readAll = this.readAll.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async readAll(req, res, next) {
    try {
      const filter = req.query;
      const instances = await this.manager.readAll(filter);
      if (instances.length > 0) {
        return res.status(200).json({
          message: `fetched ${instances.length} ${this.modelName}s`,
          response: instances,
        });
      } else {
        const error = new Error(`no ${this.modelName}s were found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { id } = req.params;
      const instance = await this.manager.read(id);
      if (instance) {
        return res.status(200).json({
          message: `fetched ${this.modelName} with id ${instance.id} `,
          response: instance,
        });
      } else {
        const error = new Error(
          `${this.modelName} with id ${id} was not found`
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      const instance = await this.manager.create(data);
      console.log(instance.id);
      console.log(instance._id);
      return res.status(201).json({
        message: `created ${this.modelName} with id ${instance._id}`,
        response: instance._id,
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const instance = await this.manager.update(id, data);
      if (instance) {
        return res.status(200).json({
          message: `updated ${this.modelName} with id ${id}`,
          response: instance,
        });
      } else {
        const error = new Error(
          `${this.modelName} with id ${id} was not found`
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const instance = await this.manager.delete(id);
      if (instance) {
        return res.status(200).json({
          message: `${this.modelName} with id ${id} was deleted`,
          response: instance,
        });
      } else {
        const error = new Error(
          `${this.modelName} with id ${id} was not found`
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default MongoCrudControler;
