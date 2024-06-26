const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload variable
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 }, // Limits to 1MB
    fileFilter: function(req, file, cb) {
        // console.log( req.body,file);
        checkFileType(file, cb);
    }
});
 
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|jfif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;
