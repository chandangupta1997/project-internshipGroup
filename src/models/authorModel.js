const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname: {
        type : String ,
        required : "first name is required" ,
        
    },
    lname: {
        type : String ,
        required :"last is required "
    },
    title : {
        type : String ,
        required :"title is required "  ,
        enum : [ "Mr" , "Mrs" , "Miss"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:"emaail is required ",
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        }
        //match: [/^8\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String ,
        required : true 
    }
 } , { timestamps: true });

module.exports = mongoose.model('author1', authorSchema) 
