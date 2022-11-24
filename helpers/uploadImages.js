const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const OperationalError = require("./operationalError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new OperationalError(400, "Image files are only allowed for upload"), false);
  }
};

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "express-food-recipes/recipes/",
  },
});

const multerImage = multer({
  storage: imageStorage,
  fileFilter: multerFileFilter,
});

exports.uploadImage = multerImage.single("image");

exports.processImage = (req, res, next) => {
  if (!req.file) return next();

  req.body.image = req.file.path;

  next();
};

exports.deleteImage = function (publicId) {
  cloudinary.uploader.destroy(publicId);
};
