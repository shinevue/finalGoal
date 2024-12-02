const mongoose = require("mongoose");

const Category = require("../../models/adminModel/categoryModel");

// make a controller for create a category
exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then(() => {
      res.status(201).json({ msg: "create category successfully." });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't do action article" });
    });
};

// make a controller for update a category
exports.updateCategory = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Category.findByIdAndUpdate(id, data)
    .then(() => {
      res.status(201).json({ msg: "Updated successfully." });
    })
    .catch(() => {
      res.status(500).json({ msg: "Can't do action article" });
    });
};

// make a controller for deletea category
exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  Category.findById(id)
    .then((category) => {
      category.delected = new Date();
      category
        .save()
        .then(() => {
          res.status(201).json({ msg: "Category deleted successfully" });
        })
        .catch(() => {
          res.status(400).json({ msg: "Invalide category." });
        });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Invalide category." });
    });
};

// make a controller for get all category
exports.getAllCategory = (req, res) => {
  const { sortIndex, searchVal } = req.query;
  const query = {
    delected: null,
    // title: { $regex: new RegExp(searchVal, "i") },
  };
  Category.find(query)
    .sort({ [sortIndex]: -1 })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};
