const path = require("path");
module.exports = {
  projectId: process.env.CLOUD_PROJECT_ID,
  keyFilename: path.join(__dirname, './config/keys.json'),
  bucketName: process.env.CLOUD_BUCKET
}