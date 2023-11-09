import moment from "moment";
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  
  getModel() {
    return this.model;
  }

  async create(data, authUser) {
    return this.getModel().create({
      ...data,
      created_by: authUser?._id || null,
    });
  }

  async index(conditions = {}, limit, page, populate = [], select = []) {
    conditions.delete_at = null;
    limit = +limit;
    page = +page;

    const [total, data] = await Promise.all([
      this.getModel().count(conditions),
      this.getModel()
        .find(conditions)
        .select(select)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate(populate)
    ]);

    return {
      data,
      total,
      limit,
      page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async update(id, data, authUser) {
    
    return await this.getModel().findByIdAndUpdate(
      id,
      {
        ...data,
        update_by: authUser?._id || null,
      },
      {
        new: true,
      }
    );
  };

  async destroy(id, authUser, softDelete = true) {
    if (softDelete) {
      return !!(await this.getModel().findByIdAndUpdate(
        id,
        {
          update_by: authUser?._id || null,
          delete_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        },
        {
          new: true,
        }
      ));
    }

    const deleted = await this.getModel().findByIdAndDelete(id);

    return !!deleted;
  }

  async destroyByConditions(conditions, authUser, softDelete = true) {
    if (softDelete) {
      return !!(await this.getModel().updateMany(
        conditions,
        {
          update_by: authUser?._id || null,
          delete_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        },
        {
          new: true,
        }
      ));
    }
    const deleted = await this.getModel().deleteMany(conditions);

    return !!deleted;
  }

  async findById(id) {
    return {};
  }
  async createMultiple(data) {
    return this.getModel().create(data);
  }
}

export default BaseRepository;
