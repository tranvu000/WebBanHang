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

  async index(conditions = {}, limit, page) {
    conditions.delete_at = null;
    limit = +limit;
    page = +page;

    const [total, data] = await Promise.all([
      this.getModel().count(conditions),
      this.getModel()
        .find(conditions)
        .skip(limit * (page - 1))
        .limit(limit),
    ]);

    return {
      data,
      total,
      limit,
      page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async update(userId, data, authUser) {
    return await this.getModel().findByIdAndUpdate(
      userId,
      {
        ...data,
        // update_by: authUser._id || null,
      },
      {
        new: true,
      }
    );
  }

  async destroy(userId, authUser, softDelete = true) {
    if (softDelete) {
      return !!(await this.getModel().findByIdAndUpdate(
        userId,
        {
          update_by: authUser._id || null,
          delete_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        },
        {
          new: true,
        }
      ));
    }

    const userDeleted = await this.getModel().findByIdAndDelete(userId);

    return !!userDeleted;
  }
}

export default BaseRepository;
