import OrderRepository from "../Repositories/OrderRepository.js";
import OrderDetailsRepository from "../Repositories/OrderDetailsRepository.js";
import ProductRepository from "../Repositories/ProductRepository.js";
import Order from "../Models/Order.js";
import OrderDetailClassifyValuesRepository from "../Repositories/OrderDetailClassifyValuesRepository.js"
import { generateUrlFromFirebase } from "../Common/helpers.js";

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderDetailsRepository = new OrderDetailsRepository();
    this.productRepository = new ProductRepository();
    this.orderDetailClassifyValuesRepository = new OrderDetailClassifyValuesRepository();
  };

  async store (data, authUser) {
    const productIds = data.order_details.map(
      orderDetail => orderDetail.product_id
    );
    const products = await this.productRepository.getByConditions(
      {
        _id: {
          $in: productIds
        }
      }
    );
    const orderDetailsData = [];
    let orderTotalPrice = 0;
    let orderTotalProduct = 0;

    data.order_details.forEach( (el) => {
      const product = products.find(item => item._id == el.product_id);
      const totalPrice = product.price * el.quantity;
      orderTotalPrice += totalPrice;
      orderTotalProduct += el.quantity;
      orderDetailsData.push({
        product_id: el.product_id,
        quantity: el.quantity,
        price: product.price,
        total_price:totalPrice,
      })
    });

    const orderData = {
      user_id: data.user_id,
      note: data.note,
      status: data.status,
      total_price: orderTotalPrice,
      total_product: orderTotalProduct
    };
    const order = await this.orderRepository.create(orderData, authUser);
    orderDetailsData.map(
      orderDetail => {
        orderDetail.order_id = order._id
      }  
    )
    const orderDetails = await this.orderDetailsRepository.createMultiple(orderDetailsData);

    const orderDetailClassifyValueData = [];
    data.order_details.forEach((el, index) => {
      el.orderDetailClassifyValues.forEach(item => {
        orderDetailClassifyValueData.push({
          orderDetail_id: orderDetails[index]._id,
          classifyValue_id: item.classifyValue_id
        })
      })
    });
    
    await this.orderDetailClassifyValuesRepository.createMultiple(orderDetailClassifyValueData)
    
    await order.populate([
      {
        path: 'order_details',
        populate: [
          {
            path: 'product',
            select: 'name',
          },
          {
            path: 'orderDetailClassifyValues',
            populate: [
              {
                path: 'classify_values'
              }
            ]
          }
        ]
      }
    ]);
    
    return this.handleDataOrder(order);
  };

  async index (params) {
    let { keyword, limit = 20, page = 1 } = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if (keyword) {
      conditions = {
        name: new RegExp (`${keyword}`, 'i')
      }
    };
    
    let orderDetails = await this.orderDetailsRepository.getByConditions({}, [
      {
        path: 'product',
        select: 'name',
        match: conditions
      }
    ]);

    const orderIds = orderDetails.map(
      orderDetail => {
        if (orderDetail.product) {
          return orderDetail.order_id
        }
      }
    ).filter(
      orderDetail => orderDetail
    );

    const orders = await this.orderRepository.index(
      {
        _id: {
          $in: orderIds
        }
      },
      limit,
      page,
      [
        {
          path: 'order_details',
          match: {
            product_id: {$exists: true},
          },
          // match: conditions,
          populate: [
            {
              path: 'product',
              select: 'name',
              match: conditions,
            },
            {
              path: 'orderDetailClassifyValues',
              populate: [
                {
                  path: 'classify_values'
                }
              ]
            }
          ]
        }
      ]
    );

    orders.data = await Promise.all(orders.data.map(
      async (order) => {
        return await this.handleDataOrder(order);
      }
    ));

    return orders;
  };

  async list (authUserId) {
    const orderList = await Order.find({ user_id: authUserId })
    .populate({
      path: 'order_details',
      populate: [
        {
          path: 'product',
          select: 'name',
        },
        {
          path: 'orderDetailClassifyValues',
          populate: [
            {
              path: 'classify_values',
            },
          ],
        },
      ],
    });

  const orders = await Promise.all(orderList.map(async (order) => {
    return await this.handleDataOrder(order);
  }));

  return orders;
  };

  async update (orderId, data, authUser) {
    const order = await this.orderRepository.update(
      orderId,
      data,
      authUser
    );
    
    await order.populate([
      {
        path: 'order_details',
        populate: [
          {
            path: 'product',
            select: 'name',
          },
          {
            path: 'orderDetailClassifyValues',
            populate: [
              {
                path: 'classify_values'
              }
            ]
          }
        ]
      }
    ]);

    return this.handleDataOrder(order);
  };

  async handleDataOrder (order) {
    const updateImage = async (classify_value) => {
      if (classify_value.image != null) {
        classify_value.image = await generateUrlFromFirebase(classify_value.image);
      };

      return classify_value;
    };

    for (const order_detail of order.order_details) {
      order_detail.orderDetailClassifyValues = await Promise.all(
        order_detail.orderDetailClassifyValues.map(async (orderDetailClassifyValue) => {
          orderDetailClassifyValue.classify_values = await Promise.all(
            orderDetailClassifyValue.classify_values.map(updateImage)
          );
          return orderDetailClassifyValue;
        })
      );
    };

    return order;
  };
};

export default OrderService;