const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add a Name"],
    unique: true,
    trim: true,
    maxlength: [15, "The name cannot be more than 15 characters!"],
  },
  weight: {
    type: Number,
    required: [true, "Please add the Weight."],
    maxlength: [2, "Do not go above 2!"],
  },
  length: {
    type: Number,
    required: [true, "Please add the Length."],
    maxlength: [2, "Do not go above 2!"],
  },
  location: {
    type: String,
    required: [true, "Please add the Location."],
    maxlength: [15, "The name cannot be more than 15 characters!"],
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.models.Cards || mongoose.model("Cards", CardsSchema);
