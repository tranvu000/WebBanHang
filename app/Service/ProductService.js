import ProductRepository from "../Repositories/ProductRepository.js";
import ProductMediaRepository from "../Repositories/ProductMediaRepository.js";
import ClassifyRepository from "../Repositories/ClassifyRepository.js";
import ClassifyValueRepository from "../Repositories/ClassifyValueRepository.js";
import CategoryRepository from "../Repositories/CategoryRepository.js";
import BrandRepository from "../Repositories/BrandRepository.js"
import Product from '../Models/Product.js'
import ProductMedia from "../Models/ProductMedia.js";
import Classify from "../Models/Classify.js";
class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.productMediaRepository = new ProductMediaRepository();
    this.classifyRepository = new ClassifyRepository();
    this.classifyValueRepository = new ClassifyValueRepository();
    this.categoryRepository = new CategoryRepository();
    this.brandRepository = new BrandRepository();
  }
  async store(data, authUser) {
    const productData = {
      name: data.name,
      description: data.description,
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
    let { name, limit = 40, page = 1 } = params;
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
    const productDelete = await Product.findById(productId).populate([
      {
        path: 'classifies',
      }
    ]);

    if (!productDelete) {
      return false;
    }
    const classifyIds = productDelete.classifies.map(
      classify => classify._id
    );
    
    const [productDeleted, productMediaDeleted, classifyDeleted, classifyValueDeleted] = await Promise.all([
      this.productRepository.destroy(productId, null, false),
      this.productMediaRepository.destroyByConditions(
        {
          product_id: productId
        },
        null,
        false
      ),
      this.classifyRepository.destroyByConditions(
        {
          product_id: productId
        },
        null,
        false
      ),
      this.classifyValueRepository.destroyByConditions(
        {
          classify_id: {
            $in: classifyIds
          }
        },
        null,
        false
      )
    ]);

    return productDelete
  };

  async searchProduct (params) {
    let {keyword, limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if(keyword) {
      conditions = {
        name: new RegExp (`${keyword}`, 'i')
      }
    };

    const searchProduct = await this.productRepository.index(
      conditions,
      limit,
      page,
      [
        {
          path: 'productMedia',
          limit: 1
        },
      ],
    );

    return searchProduct;
  };

  async searchBrand (params) {
    let {keyword, limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if(keyword) {
      conditions = {
        name: new RegExp (`${keyword}`, 'i')
      }
    };

    const searchBrand = await this.brandRepository.index(
      conditions,
      limit,
      page,
    );

    return searchBrand;
  };

  async listCategory (params) {
    let {limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    const productCategory = await this.categoryRepository.index(
      conditions,
      limit,
      page,
      [],
      ['image', 'name']
    );

    return productCategory;
  };

  async listProduct (params) {
    let {limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    const productList = await this.productRepository.index(
      conditions,
      limit,
      page,
      [
        {
          path: 'productMedia',
          limit: 1
        },
      ]
    );

    return productList;
  };

  async listProductByCategory (params) {
    let {category_id, limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if(category_id) {
      conditions = {
        category_id: `${category_id}`
      }
    };

    const listProductByCategory = await this.productRepository.index(
      conditions,
      limit,
      page,
      [
        {
          path: 'productMedia',
          limit: 1
        }
      ]
    );

    return listProductByCategory;
  }

  async details (productId) {
    const productdetails = await Product.findById(productId);

    await productdetails.populate([
      {
        path: 'category'
      },
      {
        path: 'productMedia'
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

    return productdetails;
  };
};

export default ProductService;