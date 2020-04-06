const Product = require("../model/Product");

// @desc    Get all Products
// @route   GET /api/v2/products
// @access  public
exports.getProducts = async (req, res, next) => {
   try {
      const products = await Product.find();
      res.status(200).json({
         success: true,
         count: products.length,
         data: products
      });
   } catch (error) {
      res.status(400).json({ success: false, error });
   }
};

// @desc    Get a Product
// @route   GET /api/v2/products/:id
// @access  public
exports.getProduct = async (req, res, next) => {
   try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({ success: true, data: product });
   } catch (error) {
      res.status(400).json({ success: false, error });
   }
};

// @desc    Create Product
// @route   POST /api/v2/products
// @access  private
exports.addProduct = async (req, res, next) => {
   try {
      const product = await Product.create(req.body);
      const products = await Product.find();
      res.status(201).json({ success: true, count: products.length, data: products });
   } catch (error) {
      res.status(400).json({ success: false, error });
   }
};

// @desc    Update Product
// @route   PUT /api/v2/products/:id
// @access  private
exports.updateProduct = async (req, res, next) => {
   try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true
      });
      const products = await Product.find();

      res.status(200).json({ success: true, count: products.length, data: products });
   } catch (error) {
      res.status(400).json({ success: false, error });
   }
};

// @desc    Delete Product
// @route   DELETE /api/v2/products/:id
// @access  private
exports.deleteProduct = async (req, res, next) => {
   try {
      const product = await Product.findByIdAndDelete(req.params.id);
      const products = await Product.find();

      res.status(200).json({ success: true, count: products.length, data: products });
   } catch (error) {
      res.status(400).json({ success: false, error });
   }
};
