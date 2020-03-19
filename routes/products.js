const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const products = require("../model/Products");

router.get("/", (req, res) =>
   res.status(200).json({ success: true, data: products })
);

router.get("/:id", (req, res) =>
   res.status(200).json({
      success: true,
      data: products.filter(product => product._id === parseInt(req.params.id))
   })
);

router.post("/", (req, res) => {
   const newProduct = {
      _id: uuid.v4(),
      price: req.body.price,
      color: req.body.color,
      type: req.body.type,
      gender: req.body.gender,
      title: req.body.title,
      company: req.body.company,
      about: req.body.about
   };

   products.push(newProduct);
   res.status(201).json({ success: true, data: products });
});

router.put("/:id", (req, res) => {
   const updatedProperties = req.body;

   products.forEach(product => {
       if (product._id === parseInt(req.params.id)) {
           product.price = updatedProperties.price ? updatedProperties.price : product.price;
           product.color = updatedProperties.color ? updatedProperties.color : product.color;
           product.type = updatedProperties.type ? updatedProperties.type : product.type;
           product.gender = updatedProperties.gender ? updatedProperties.gender : product.gender;
           product.title = updatedProperties.title ? updatedProperties.title : product.title;
           product.company = updatedProperties.company ? updatedProperties.company : product.company;
           product.about = updatedProperties.about ? updatedProperties.about : product.about;

           res.status(200).json({
            success: true,
            data: product
         })
       }
   });
});

router.delete("/:id", (req, res) =>
   res.status(200).json({
      success: true,
      data: products.filter(product => product._id !== parseInt(req.params.id))
   })
);

module.exports = router;
