const EndPoint = require("express").Router();
const Item = require("../models/items");

const Validator = require("../middleware/validator");
const { validationResult } = require("express-validator");

EndPoint.route("")
  .put(Validator("UPDATE_ITEM"), async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(442).json({ status: "error" });
        res.end();
      }

      // Selecting only the selected fields
      const keys = ["id", "name", "description", "quantity"];

      let initData = {};
      keys.forEach(value => {
        initData[value] = req.body[value];
      });

      Object.keys(initData).forEach(
        value => initData[value] === undefined && delete initData[value]
      );
      const itemId = initData["id"];
      delete initData["id"];
      const updateData = await Item.findOneAndUpdate(
        { _id: itemId },
        initData,
        { new: true }
      );

      res.status(200).json({ status: "success", data: updateData });
    } catch (error) {
      res.status(500).json({ status: "success", data: "Something went wrong" });
    }
  })
  .post(Validator("CREATE_ITEM"), async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(442).json({ status: "error" });
        res.end();
      }

      const { name, description, quantity } = req.body;
      let newItem = new Item({ name, description, quantity });
      const finalItem = await newItem.save();

      res.status(201).json({ status: "success", data: finalItem });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    }
  })

  .delete(Validator("DELETE_ITEM"), async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(442).json({ status: "error" });
        res.end();
      }
      const { id } = req.body;
      await Item.findOneAndRemove({ _id: id });
      res.status(200).json({ status: "success", data: "Delete success." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error" });
    }
  })
  .get(async (req, res) => {
    try {
      const allItems = await Item.find({});
      res.status(200).json(allItems);
    } catch (error) {
      res.status(500).json({ status: "success", data: "Something went wrong" });
    }
  });

module.exports = EndPoint;
