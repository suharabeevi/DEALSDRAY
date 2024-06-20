const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../constants");

// configuration
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DealsDry",
    allowedFormats: ["jpg", "png"],
    public_id: (req, file) => {
      console.log(req.file);
      // remove the file extension from the file name
      const fileName = file.originalname.split(".").slice(0, -1).join(".");
      return fileName + new Date();
    },
  },
});
const IMGupload = multer({ storage: storage }).single("f_Image");
module.exports = IMGupload;
