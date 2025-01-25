class MongoCrudController {
  constructor(service, modelName) {
    this.service = service;
    this.modelName = modelName;
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readAll = this.readAll.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async readAll(req, res) {
    const filter = req.query;
    const instances = await this.service.readAll(filter);

    return instances.length > 0
      ? res.json200(instances, `fetched ${instances.length} ${this.modelName}s`)
      : res.json404(null, `no ${this.modelName}s were found`);
  }

  async read(req, res) {
    const { id } = req.params;
    const instance = await this.service.read(id);
    return instance
      ? res.json200(
          instance,
          `fetched ${this.modelName} with id ${instance._id} `
        )
      : res.json404(null, `${this.modelName} with id ${id} was not found`);
  }

  async create(req, res) {
    const data = req.body;
    const instance = await this.service.create(data);
    return res.json201(
      instance._id,
      `created ${this.modelName} with id ${instance._id}`
    );
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    const instance = await this.service.update(id, data);
    return instance
      ? res.json200(
          instance,
          `updated ${this.modelName} with id ${instance._id} `
        )
      : res.json404(null, `${this.modelName} with id ${id} was not found`);
  }

  async delete(req, res) {
    const { id } = req.params;
    const instance = await this.service.delete(id);

    return instance
      ? res.json200(
          instance,
          `deleted ${this.modelName} with id ${instance._id} `
        )
      : res.json404(null, `${this.modelName} with id ${id} was not found`);
  }
}

export default MongoCrudController;
