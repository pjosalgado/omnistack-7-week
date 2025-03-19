const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({  // saves the image into the 'uploads' folder
        destination: path.resolve(__dirname, '..', '..', 'uploads'), 
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    })
};
