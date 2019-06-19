const {
  Storage
} = require('@google-cloud/storage');
const config = require('../../config');
var mimeTypes = require("mimetypes");
let bucketName = process.env.CLOUD_BUCKET;
const { errorName } = require("../errors");

const storage = new Storage({
  projectId: config.projectId,
  keyFilename: config.keyFilename
});

let uploadBaseImagesToStorage = async (images) => {
  try {
    let imgUrl = await Promise.all(images.map(async (e) => {
      return await uploadBaseImage("sample", e);
    }))
    return imgUrl;
  } catch (ex) {
    throw new Error(errorName.IMAGE_ERROR);
  }
}

let uploadBaseImage = async (name, image) => {
  let mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
    fileName = name + '-' + new Date().getTime() + "." + mimeTypes.detectExtension(mimeType),
    base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, ''),
    imageBuffer = new Buffer(base64EncodedImageString, 'base64');

  // Instantiate the GCP Storage instance
  bucket = storage.bucket(bucketName);

  // Upload the image to the bucket
  var file = bucket.file('items/' + fileName);
  var imageUrl = 'https://' + config.bucketName + '.storage.googleapis.com/items/' + fileName;

  try {
    let result = await file.save(imageBuffer, {
      metadata: { contentType: mimeType },
      public: true,
      validation: 'md5'
    });
    return imageUrl;
  }
  catch (ex) {
    throw new Error(errorName.IMAGE_ERROR);
  }
}

module.exports = { uploadBaseImagesToStorage };