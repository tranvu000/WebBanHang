import ShoppingCart from "../Models/ShoppingCart.js";
import ShoppingCartRepository from "../Repositories/ShoppingCartRepository.js";
import ShoppingCartClassifyValueRepository from "../Repositories/ShoppingCartClassifyValueRepository.js"
import { generateUrlFromFirebase } from "../Common/helpers.js";
class ShoppingCartService {
  constructor() {
    this.shoppingCartRepository = new ShoppingCartRepository();
    this.shoppingCartClassifyValueRepository = new ShoppingCartClassifyValueRepository();
  }

  async store (data, authUser) {
    const shoppingCartData = {
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity
    };
    const shoppingCart = await this.shoppingCartRepository.create(shoppingCartData, authUser);

    const shoppingCartClassifyValueData = [];
    data.shoppingCartClassifyValues.forEach( el => {
      shoppingCartClassifyValueData.push({
        shoppingCart_id: shoppingCart._id,
        classifyValue_id: el.classifyValue_id
      })
    })
    await this.shoppingCartClassifyValueRepository.createMultiple(shoppingCartClassifyValueData)

    await shoppingCart.populate([
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
    ]);

    return this.handleDataShoppingCart(shoppingCart);
  };

  async list (authUserId) {
    const shoppingCartList = await ShoppingCart.find({user_id: authUserId})
    .populate([
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
    ]);
    const ShoppingCarts = await Promise.all(shoppingCartList.map(async (shoppingCart) => {
      return await this.handleDataShoppingCart(shoppingCart)
    }));

    return ShoppingCarts;
  };

  async update (shoppingCartId, data, authUser) {
    if (!data.quantity) {
      const shoppingCart = await ShoppingCart.findById(shoppingCartId);
      data.quantity = shoppingCart.quantity
    };

    const shoppingCartData = {
      quantity: data.quantity
    }
    const shoppingCart = await this.shoppingCartRepository.update(
      shoppingCartId,
      shoppingCartData,
      authUser
    )
    await this.shoppingCartClassifyValueRepository.destroyByConditions(
      {
        shoppingCart_id: shoppingCartId
      },
      authUser,
      false
    )
    
    const shoppingCartClassifyValueData = [];
    data.shoppingCartClassifyValues.forEach( el => {
      shoppingCartClassifyValueData.push({
        shoppingCart_id: shoppingCart._id,
        classifyValue_id: el.classifyValue_id
      })
    })
    await this.shoppingCartClassifyValueRepository.createMultiple(shoppingCartClassifyValueData)

    await shoppingCart.populate([
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
    ]);

    return this.handleDataShoppingCart(shoppingCart);
  };

  async destroy(shoppingCartId, authUser) {
    const shoppingCartDelete = await this.shoppingCartRepository.destroy(shoppingCartId, authUser, false);
    await this.shoppingCartClassifyValueRepository.destroyByConditions(
      {
        shoppingCart_id: shoppingCartId
      },
      authUser,
      false
    )
    return shoppingCartDelete;
  };

  async handleDataShoppingCart (shoppingCart) {
    shoppingCart.shoppingCartClassifyValues = await Promise.all(
      shoppingCart.shoppingCartClassifyValues.map(
        async (shoppingCartClassifyValue) => {
          shoppingCartClassifyValue.classify_values = await Promise.all(
            shoppingCartClassifyValue.classify_values.map(
              async (classify_value) => {
                if (classify_value.image != null) {
                  classify_value.image = await generateUrlFromFirebase(classify_value.image)
                };
  
                return classify_value;
              }
            )
          );

          return shoppingCartClassifyValue;
        }
      )
    );

    return shoppingCart;
  };
};

export default ShoppingCartService;