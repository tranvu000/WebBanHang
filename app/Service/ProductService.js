import ProductRepository from "../Repositories/ProductRepository.js";
import ProductMediaRepository from "../Repositories/ProductMediaRepository.js";
import ClassifyRepository from "../Repositories/ClassifyRepository.js";
import ClassifyValueRepository from "../Repositories/ClassifyValueRepository.js";
import CategoryRepository from "../Repositories/CategoryRepository.js";
import BrandRepository from "../Repositories/BrandRepository.js"
import Product from '../Models/Product.js'
import { PRODUCT } from "../config/constants.js";
import { generateUrlFromFirebase } from "../Common/helpers.js";
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
    if(data.images){
      const imageData = data.images
      imageData.forEach(el => {
        productMediaData.push({
            product_id: product._id,
            url: el,
            type: PRODUCT.type.images
        })
      })
    };

    if(data.video){
      productMediaData.push({
        product_id: product._id,
        url: data.video,
        type: PRODUCT.type.video
      })
    };
    
    const productMedia = await this.productMediaRepository.createMultiple(productMediaData);

    const classifiesData = [];
    data.classifies.forEach(el => {
      classifiesData.push({
        product_id: product._id,
        name: el.name,
        description: el.description,
      })
    });

    const classifies = await this.classifyRepository.createMultiple(classifiesData);

    const classifiesValueData = [];
    data.classifies.forEach((el, index) => {
      el.classify_values.forEach(item => {
        classifiesValueData.push({
          classify_id: classifies[index]._id,
          value: item.value,
          image: item.image || null,
        })
      })
    });

    const classifyValue = await this.classifyValueRepository.createMultiple(classifiesValueData);

    await product.populate([
      {
        path: 'brand',
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

    return this.handleDataProduct(product);
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


    const products = await this.productRepository.index(
      conditions,
      limit,
      page,
      [
        {
          path: 'brand',
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

    products.data = await Promise.all(products.data.map(
      async (product) => {
        return await this.handleDataProduct(product);
      }
    ));

    return products;
  };

  async show(productId) {
    const productShow = await Product.findById(productId);
    
    await productShow.populate([
      {
        path: 'brand',
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

    return this.handleDataProduct(productShow);

  };

  async update(productId, data, authUser) {
    const productData = {
      name: data.name,
      price: data.price,
      discount: data.discount,
      category_id: data.category_id,
      brand_id: data.brand_id
    }
    const product = await this.productRepository.update(productId, productData, authUser);    

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
    
    const [productMediaDeleted, classifyDeleted, classifyValueDeleted] = await Promise.all([
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

    const productMediaData = []
    if(data.images){
      const imageData = data.images
      imageData.forEach(el => {
        productMediaData.push({
            product_id: product._id,
            url: el,
            type: PRODUCT.type.images
        })
      });
    };

    if(data.video){
      productMediaData.push({
        product_id: product._id,
        url: data.video,
        type: PRODUCT.type.video
      })
    };
    
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

    await product.populate([
      {
        path: 'brand',
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

    return this.handleDataProduct(product);
  };

  async destroy(productId, authUser) {
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
      this.productRepository.destroy(productId, authUser, false),
      this.productMediaRepository.destroyByConditions(
        {
          product_id: productId
        },
        authUser,
        false
      ),
      this.classifyRepository.destroyByConditions(
        {
          product_id: productId
        },
        authUser,
        false
      ),
      this.classifyValueRepository.destroyByConditions(
        {
          classify_id: {
            $in: classifyIds
          }
        },
        authUser,
        false
      )
    ]);

    return productDelete
  };

  async searchProduct (params) {
    let { keyword, limit, page } = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if (keyword) {
      conditions = {
        name: new RegExp (`${keyword}`, 'i')
      }
    };

    const products = await this.productRepository.index(
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

    products.data = await Promise.all(products.data.map(
      async (product) => {
        product.productMedia = await Promise.all(product.productMedia.map(
          async (productMedia) => {
            productMedia.url = await generateUrlFromFirebase(productMedia.url);
    
            return productMedia;
          }
        ));

        return product;
      }
    ));

    return products;
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

    const brands = await this.brandRepository.index(
      conditions,
      limit,
      page,
    );

    brands.data = await Promise.all(brands.data.map(
      async (brand) => {
        brand.logo = await generateUrlFromFirebase(brand.logo);

        return brand;
      }
    ));

    return brands;
  };

  async listCategory (params) {
    let {limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    const categories = await this.categoryRepository.index(
      conditions,
      limit,
      page,
      [],
      ['image', 'name']
    );
    
    categories.data = await Promise.all(categories.data.map(
      async (category) => {
        category.image = await generateUrlFromFirebase(category.image);

        return category;
      }
    ));

    return categories;
  };

  async listProduct (params) {
    let {limit, page} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    const products = await this.productRepository.index(
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

    products.data = await Promise.all(products.data.map(
      async (product) => {
        product.productMedia = await Promise.all(product.productMedia.map(
          async (productMedia) => {
            productMedia.url = await generateUrlFromFirebase(productMedia.url);
    
            return productMedia;
          }
        ));

        return product;
      }
    ));

    return products;
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

    const products = await this.productRepository.index(
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

    products.data = await Promise.all(products.data.map(
      async (product) => {
        product.productMedia = await Promise.all(product.productMedia.map(
          async (productMedia) => {
            productMedia.url = await generateUrlFromFirebase(productMedia.url);
    
            return productMedia;
          }
        ));

        return product;
      }
    ));

    return products;
  }

  async details (productId) {
    const productdetails = await Product.findById(productId);

    await productdetails.populate([
      {
        path: 'category'
      },
      {
        path: 'brand'
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

    return this.handleDataProduct(productdetails);
  };

  async handleDataProduct (product) {
    product.category = await Promise.all(product.category.map(
      async (category) => {
        category.image = await generateUrlFromFirebase(category.image);

        return category;
      }
    ));

    product.brand = await Promise.all(product.brand.map(
      async (brand) => {
        brand.logo = await generateUrlFromFirebase(brand.logo);

        return brand;
      }
    ));

    product.productMedia = await Promise.all(product.productMedia.map(
      async (productMedia) => {
        productMedia.url = await generateUrlFromFirebase(productMedia.url);

        return productMedia;
      }
    ));
    
    product.classifies = await Promise.all(product.classifies.map(
      async (classify) => {
        classify.classify_values = await Promise.all(classify.classify_values.map(
          async (classify_value) => {
            if(!!classify_value.image) {
              classify_value.image = await generateUrlFromFirebase(classify_value.image);
            }

            return classify_value;
          }
        ));

        return classify;
      }
    ));

    return product;
  };
};


export default ProductService;