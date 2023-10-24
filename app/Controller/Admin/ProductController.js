import { responseError, responseSuccess} from '../../Common/helpers.js';
import ProductService from '../../Service/ProductService.js';

class ProductController {
  static productService = new ProductService();

  async store (req, res) {
    try {
      // const data = req.body;
      // data.images = req.files.filter(
      //   fileImage => {
      //     return fileImage.fieldname === "images";
      //   }
      // );

      // data.video = req.files.find(
      //   fileVideo => {
      //     return fileVideo.fieldname === "video";
      //   }
      // );

      // data.classifies.map(
      //   (classify, classify_index) => {
      //     classify.classify_values.map(
      //       (classify_value, index) => {
      //         const key = `classifies[${classify_index}][classify_values][${index}][image]`
      //         const image = req.files.find(
      //           fileImage => {
      //             return fileImage.fieldname === key;
      //           }
      //         )
      //         classify_value.image = image
      //       }
      //     )
      //   }
      // )


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
          console.log([...file.fieldname.matchAll(regex)]);
          const matches = [...file.fieldname.matchAll(regex)].map((match) => parseInt(match[1]));
          data.classifies[matches[0]].classify_values[matches[1]].image = 'storage/product/any/classifies/image/' + file.filename
          console.log(matches);
        }
      }

      res.status(201).json(responseSuccess(
        await ProductController.productService.store(data, req.authUser)
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async index (req, res) {
    try {
      
    } catch (e) {
      
    }
  };

  async show (req, res) {
    try {
      
    } catch (e) {
      
    }
  };

  async update (req, res) {
    try {
      
    } catch (e) {
      
    }
  };

  async destroy (req, res) {
    try {
      
    } catch (e) {
      
    }
  }
}

export default ProductController;