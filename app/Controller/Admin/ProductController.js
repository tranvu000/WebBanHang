import { responseError, responseSuccess} from '../../Common/helpers.js';
import ProductService from '../../Service/ProductService.js';

class ProductController {
  static productService = new ProductService();

  async store (req, res) {
    try {
      const data = req.body;
      data.images = [];

      for(let file of req.files) {
        if (file.fieldname === "images") {
          data.images.push('storage/product/any/images/' + file.filename)
        } else if (file.fieldname === "video") {
          data.video = 'storage/product/any/video/' + file.filename
        } else {
          // const input = "classifies[0][classify_values][1][image]";
          const regex = /\[(\d+)\]/g;
          const matches = [...file.fieldname.matchAll(regex)].map((match) => parseInt(match[1]));
          data.classifies[matches[0]].classify_values[matches[1]].image = 
            'storage/product/any/classifies/image/' + 
            file.filename
        }
      }
    
      const result = await ProductController.productService.store(data, req.authUser)
      res.status(201).json(responseSuccess(
        result,
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async index (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.index(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async show (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.show(
          req.params.productId
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update (req, res) {
    try {
      const data = req.body;
      data.images = [];

      for(let file of req.files) {
        if (file.fieldname === "images") {
          data.images.push('storage/product/any/images/' + file.filename)
        } else if (file.fieldname === "video") {
          data.video = 'storage/product/any/video/' + file.filename
        } else {
          const regex = /\[(\d+)\]/g;
          const matches = [...file.fieldname.matchAll(regex)].map((match) => parseInt(match[1]));
          data.classifies[matches[0]].classify_values[matches[1]].image = 
          'storage/product/any/classifies/image/' +
          file.filename
        }
      }
      console.log("data>>>>>", data);
      res.status(201).json(responseSuccess(
        await ProductController.productService.update(
          req.params.productId,
          data,
          req.authUser
        )
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async destroy (req, res) {
    try {
      res.status(201).json(responseSuccess(
        !!await ProductController.productService.destroy(
          req.params.productId
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
}

export default ProductController;