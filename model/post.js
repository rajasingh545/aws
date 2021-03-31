const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    attachment: {
      type: String,
      require: false,
    },
    key: {
      type: String,
      require: false,
    },
    bucket: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, result) {
        result["id"] = result["_id"];
        delete result["_id"];
        delete result["__v"];
      },
    },
  }
);

module.exports = mongoose.model("Post", postSchema);
