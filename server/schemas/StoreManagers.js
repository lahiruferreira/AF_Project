const mongoose = require('mongoose');

let SMSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
       type:String,
       required:true
   },
   password: {
      type: String,
      required: true
   }
});


module.exports = mongoose.model('store_managers',SMSchema);