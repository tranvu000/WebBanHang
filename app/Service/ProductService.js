import ProductRepository from "../Repositories/ProductRepository.js";
import ProductMediaRepository from "../Repositories/ProductMediaRepository.js";
import ClassifyRepository from "../Repositories/ClassifyRepository.js";
import ClassifyValueRepository from "../Repositories/ClassifyValueRepository.js"
import Product from '../Models/Product.js'
import ProductMedia from "../Models/ProductMedia.js";
import Classify from "../Models/Classify.js";
class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.productMediaRepository = new ProductMediaRepository();
    this.classifyRepository = new ClassifyRepository();
    this.classifyValueRepository = new ClassifyValueRepository();
  }
  async store(data, authUser) {
    const productData = {
      name: data.name,
      price: data.price,
      discount: data.discount,
      category_id: data.category_id,
      brand_id: data.brand_id
    }
    const product = await this.productRepository.create(productData, authUser);

    const productMediaData = []
    const imageData = data.images
    imageData.forEach(el => {
      productMediaData.push({
          product_id: product._id,
          url: el,
          type: 1
      })
    })

    if(data.video){
      productMediaData.push({
        product_id: product._id,
        url: data.video,
        type: 2
      })
    }
    const productMedia = await this.productMediaRepository.createMultiple(productMediaData);
    
    const classifiesData = []
    data.classifies.forEach(el => {
      classifiesData.push({
        product_id: product._id,
        name: el.name,
        description: el.description,
      })
    })
    const classifies = await this.classifyRepository.createMultiple(classifiesData);

    const classifiesValueData = []
    data.classifies.forEach((el, index) => {
      el.classify_values.forEach(item => {
        classifiesValueData.push({
          classify_id: classifies[index]._id,
          value: item.value,
          image: item.image,
        })
      })
    })
    const classifyValue = await this.classifyValueRepository.createMultiple(classifiesValueData);

    return await product.populate([
      {
        path: 'brand',
        select: ['_id', "name"]
      },
      {
        path: 'category'
      },
      {
        path: 'productMedia',
      },
      {
        path: 'classifies',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ])
  };

  async index(params) {
    let { name, limit = 10, page = 1 } = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if (name) {
      conditions = {
        name: new RegExp (`${name}`, 'i')
      }
    };

    const productIndex = await this.productRepository.index(
      conditions,
      limit,
      page,
      [
        {
          path: 'brand',
          select: ['_id', "name"]
        },
        {
          path: 'category'
        },
        {
          path: 'productMedia',
        },
        {
          path: 'classifies',
          populate: [
            {
              path: 'classify_values'
            }
          ]
        }
      ]
    );

    return productIndex;
  };

  async show(productId) {
    const productShow = await Product.findById(productId);
    await productShow.populate([
      {
        path: 'brand',
        select: ['_id', "name"]
      },
      {
        path: 'category'
      },
      {
        path: 'productMedia',
      },
      {
        path: 'classifies',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ]);

    return productShow;
  };

  async update(productId, data, authUser) {
    const productData = {
      name: data.name,
      price: data.price,
      discount: data.discount,
      category_id: data.category_id,
      brand_id: data.brand_id
    }
    const product = await this.productRepository.update(productId, productData);    

    const productMediaDelete = await ProductMedia.findByIdAndDelete(productId);

    const productMediaData = []
    const imageData = data.images
    imageData.forEach(el => {
      productMediaData.push({
          product_id: product._id,
          url: el,
          type: 1
      })
    })

    if(data.video){
      productMediaData.push({
        product_id: product._id,
        url: data.video,
        type: 2
      })
    };
    
    const productMedia = await this.productMediaRepository.createMultiple(productMediaData);

    const classifiesDelete = await Classify.findByIdAndDelete(productId)
    const classifiesData = []
    data.classifies.forEach(el => {
      classifiesData.push({
        product_id: product._id,
        name: el.name,
        description: el.description,
      })
    })
    const classifies = await this.classifyRepository.createMultiple(classifiesData);

    const classifiesValueData = []
    data.classifies.forEach((el, index) => {
      el.classify_values.forEach(item => {
        classifiesValueData.push({
          classify_id: classifies[index]._id,
          value: item.value,
          image: item.image,
        })
      })
    })
    const classifyValue = await this.classifyValueRepository.createMultiple(classifiesValueData);

    return await product.populate([
      {
        path: 'brand',
        select: ['_id', "name"]
      },
      {
        path: 'category'
      },
      {
        path: 'productMedia',
      },
      {
        path: 'classifies',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ])
  };

  async destroy(productId) {
    const productDelete = await Product.findById(productId);
    await productDelete.populate([
      {
        path: 'productMedia',
      },
      {
        path: 'classifies',
        populate: [
          {
            path: 'classify_values'
          }
        ]
      }
    ]);

    console.log(productDelete);
    


    //1 . Get product and relations collection

    //2. Delete product

    //3. Delete Media

    //4. Delete Classifies

    // 5. Return boolean
    // const productDelete = await Product.findByIdAndDelete(productId);
    

    return productDelete;

  };
};

export default ProductService;