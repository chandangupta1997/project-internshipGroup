const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema( {
    name: {
        type : String ,
        required : "College name is required",
        unique : true
        
    },
    fullName:{
        type: String,
        required : "full name is Required"
    },
    logoLink : {

    },
    isDeleted : {
        type : Boolean ,
        default : false
    }
 } , { timestamps: true });

module.exports = mongoose.model('collegeDetails', collegeSchema) 
