const fs = require("fs");
const fomidable = require("formidable");
const { v4: uuidv4 } = require("uuid");

const { s3 } = require("../config/s3Bucket");
const Post = require("../model/post");

exports.fileUpload = (req, res) => {
  const form = new fomidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(4).json({
        message: "Image not found.",
      });
    }

    // Check all fields.
    const { title, description } = fields;
    if (!description || !title) {
      return res.status(400).json({
        message: "Title and Description field's are required.",
      });
    }
    let post = new Post(fields);
    const isFile = checkFileSize(files);
    if (isFile) {
      upload(files.attachment.path, files.attachment.name, (err, response) => {
        if (err) {
          return res.status(400).json({
            message: "Something went wrong on fileupload.",
          });
        }
        post.attachment = response.Location;
        post.key = response.Key;
        post.bucket = response.Bucket;
        post.save((err, result) => {
          if (err) {
            return res.status(400).json({
              message: "Something went wrong.",
            });
          }
          return res.json(result);
        });
      });
    } else {
      return res.status(400).json({
        message: "Please upload the file size below 1MB.",
      });
    }
  });
};

const checkFileSize = (file) => {
  if (file && file.attachment && file.attachment.size < 1000000) {
    return true;
  }
  return false;
};

const upload = async (path, name, fn) => {
  fs.readFile(path, (err, data) => {
    if (err) fn(err, null);
    const params = {
      Bucket: "rajasinghbucket", // pass your bucket name
      Key: `${uuidv4()}-${name}`, // file will be saved as testBucket/contacts.csv
      Body: data,
    };
    return s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      fn(null, data);
    });
  });
};
