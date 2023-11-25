import ShoppingCarts from "../Models/ShoppingCarts.js";
import ShoppingCartsRepository from "../Repositories/ShoppingCartsRepository.js";
import ShoppingCartClassifyValuesRepository from "../Repositories/ShoppingCartClassifyValuesRepository.js"
import ShoppingCartClassifyValues from "../Models/ShoppingCartClassifyValues.js";
class ShoppingCartsService {
  constructor() {
    this.shoppingCartsRepository = new ShoppingCartsRepository();
    this.shoppingCartClassifyValuesRepository = new ShoppingCartClassifyValuesRepository();
  }

  async store (data, authUser) {
    const shoppingCartsData = {
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity
    };
    const shoppingCarts = await this.shoppingCartsRepository.create(shoppingCartsData, authUser);

    const shoppingCartClassifyValuesData = [];
    data.shoppingCartClassifyValues.forEach( el => {
      shoppingCartClassifyValuesData.push({
        shoppingCart_id: shoppingCarts._id,
        classifyValue_id: el.classifyValue_id
      })
    })
    await this.shoppingCartClassifyValuesRepository.createMultiple(shoppingCartClassifyValuesData)

    return await shoppingCarts.populate([
      {
        path: 'product',
        select: {'discount': 0},
        populate: [
          {
            path: 'classifies',
            select: {'description': 0},
            populate: [
              {
                path: 'classify_values',
                select: 'value'
              }
            ]
          }
        ]
      },
      {
        path: 'shoppingCartClassifyValues',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ])
  }

  async list (authUserId) {
    const shoppingCartsList = await ShoppingCarts.find({user_id: authUserId})
    const populatedShoppingCarts = await Promise.all(shoppingCartsList.map(async (shoppingCart) => {
      return shoppingCart.populate([
        {
          path: 'product',
          select: {'discount': 0},
          populate: [
            {
              path: 'classifies',
              select: {'description': 0},
              populate: [
                {
                  path: 'classify_values'
                }
              ]
            }
          ]
        },
        {
          path: 'shoppingCartClassifyValues',
          populate: [
            {
              path: 'classify_values'
            }
          ]
        }
      ]);
    }));

    return populatedShoppingCarts;
  };

  async update (shoppingCartId, data, authUser) {
    if (!data.quantity) {
      const shoppingCart = await ShoppingCarts.findById(shoppingCartId);
      data.quantity = shoppingCart.quantity
    };

    const shoppingCartData = {
      quantity: data.quantity
    }
    const shoppingCart = await this.shoppingCartsRepository.update(
      shoppingCartId,
      shoppingCartData,
      authUser
    )
    await this.shoppingCartClassifyValuesRepository.destroyByConditions(
      {
        shoppingCart_id: shoppingCartId
      },
      authUser,
      false
    )
    
    const shoppingCartClassifyValuesData = [];
    data.shoppingCartClassifyValues.forEach( el => {
      shoppingCartClassifyValuesData.push({
        shoppingCart_id: shoppingCart._id,
        classifyValue_id: el.classifyValue_id
      })
    })
    await this.shoppingCartClassifyValuesRepository.createMultiple(shoppingCartClassifyValuesData)

    return await shoppingCart.populate([
      {
        path: 'product',
        select: {'discount': 0},
        populate: [
          {
            path: 'classifies',
            select: {'description': 0},
            populate: [
              {
                path: 'classify_values',
                select: 'value'
              }
            ]
          }
        ]
      },
      {
        path: 'shoppingCartClassifyValues',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ])
  };

  async destroy(shoppingCartId, authUser) {
    const shoppingCartDelete = await this.shoppingCartsRepository.destroy(shoppingCartId, authUser, false);
    await this.shoppingCartClassifyValuesRepository.destroyByConditions(
      {
        shoppingCart_id: shoppingCartId
      },
      authUser,
      false
    )
    return shoppingCartDelete;
  };
};

export default ShoppingCartsService;