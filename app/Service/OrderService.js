import authRouter from "../../router/User/auth.js";
import OrderRepository from "../Repositories/OrderRepository.js";
import OrderDetailsRepository from "../Repositories/OrderDetailsRepository.js";
import Product from "../Models/Product.js";
import ProductRepository from "../Repositories/ProductRepository.js";
import Order from "../Models/Order.js";
import OrderDetails from "../Models/OrderDetails.js";
import OrderDetailClassifyValuesRepository from "../Repositories/OrderDetailClassifyValuesRepository.js"

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderDetailsRepository = new OrderDetailsRepository();
    this.productRepository = new ProductRepository();
    this.orderDetailClassifyValuesRepository = new OrderDetailClassifyValuesRepository();
  };

  async createOrder (data, authUser) {
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
      orderDatail => {
        orderDatail.order_id = order._id
      }  
    )
    const orderDatails = await this.orderDetailsRepository.createMultiple(orderDetailsData);

    const orderDetailClassifyValueData = [];
    data.order_details.forEach((el, index) => {
      el.orderDetailClassifyValues.forEach(item => {
        orderDetailClassifyValueData.push({
          orderDatail_id: orderDatails[index]._id,
          classifyValue_id: item.classifyValue_id
        })
      })
    });
    
    await this.orderDetailClassifyValuesRepository.createMultiple(orderDetailClassifyValueData)
    
    return await order.populate([
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
  };

  async list (params) {
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
          match: { product_id: {$exists: true}},
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

    return orders;
  };

  async update (orderId, data, authUser) {
    const order = await this.orderRepository.update(
      orderId,
      data,
      authUser
    );
    
    return await order.populate([
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
  };
};

export default OrderService;