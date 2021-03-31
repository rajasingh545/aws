const Posts = require("../model/post");
exports.getPosts = (req, res) => {
  const sortBy = req.params.sortBy ? req.params.sortBy : "desc";
  const order = req.params.orderBy ? req.params.orderBy : "createdAt";
  Posts.find({})
    .sort([[order, sortBy]])
    .exec((err, posts) => {
      if (err)
        return res.status({
          message: "Something went wrong.",
        });
      return res.json(posts);
    });
};
