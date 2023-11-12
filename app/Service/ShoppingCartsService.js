import ShoppingCarts from "../Models/ShoppingCarts.js";
import ShoppingCartsRepository from "../Repositories/ShoppingCartsRepository.js"
class ShoppingCartsService {
  constructor() {
    this.shoppingCartsRepository = new ShoppingCartsRepository();
  }

  async store (data, authUser) {
    const shoppingCarts = await this.shoppingCartsRepository.create(data, authUser);
    
    return shoppingCarts;
  }

  async show (shoppingCartsId) {
    const shoppingCartsShow = await ShoppingCarts.findById(shoppingCartsId);

    await shoppingCartsShow.populate([
      {
        path: 'product',
        select: {'discount': 0},
        populate: [
          {
            path: 'productMedia',
            limit: 1
          },
          {
            path: 'classifies',
            select: {'description': 0},
            populate: [
              {
                path: 'classify_values',
                select: {'image': 0}
              }
            ]
          }
        ]
      }
    ]);

    return shoppingCartsShow;
  };

  async destroy(shoppingCartsId, authUser) {
    const shoppingCartsDelete = await this.shoppingCartsRepository.destroy(shoppingCartsId, authUser, false);

    return shoppingCartsDelete;
  };
};

export default ShoppingCartsService;