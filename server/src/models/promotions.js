const mongoose = require("mongoose");
const { promotionsType } = require('../utils/promotions');
const Schema = mongoose.Schema;

const promotionsSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: { type: String, required: true, min: 2, max: 65 },
  type: { type: String, required: true, enum: promotionsType },
  start_date: { type: Date, required: true, default: Date.now },
  end_date: { type: Date, required: true, default: Date.now },
  user_group_name: { type: String, required: true },
  update_date: { type: Date, required: true, default: Date.now },
  archive: { type: Boolean, required: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, required: false },
});

module.exports = mongoose.model("Promotions", promotionsSchema);
