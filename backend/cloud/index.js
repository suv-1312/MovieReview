const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'owlien', 
  api_key: '265258282816162',
  api_secret: 'W42hyjhZw_wOrEyCVDN5mY25dOQ',
  secure: true
});


module.exports = cloudinary;