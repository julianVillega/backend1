class MongoCrudService {
  constructor(manager) {
    this.manager = manager;
  }
  async create(data) {
    return await this.manager.create(data);
  }
  async read(id) {
    return await this.manager.read(id);
  }
  async readAll(filter) {
    return await this.manager.readAll(filter);
  }
  async update(id, data) {
    return await this.manager.update(id, data);
  }
  async delete(id) {
    return await this.manager.delete(id);
  }
}

export default MongoCrudService;
