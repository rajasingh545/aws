const { s3 } = require("../config/s3Bucket");
const Post = require("../model/post");

exports.download = (req, res) => {
  var fileStream = s3.getObject(req.options).createReadStream();
  fileStream.pipe(res);
};

exports.postById = (req, res, next, id) => {
  Post.findById({ _id: id }).exec((err, post) => {
    if (!err && post) {
      req.options = {
        Bucket: post.bucket,
        Key: post.key,
      };
      res.attachment(post.key);
    } else {
      return res.status(400).json({
        message: "Something went wrong.",
      });
    }
    next();
  });
};
