const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const url = require('mongoose-type-url')

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
    logoLink :{
        type : url ,
        required : "Please enter logo Link" ,
        trim : true ,
        unique : true ,
        lowercase : true },

  

    isDeleted : {
        type : Boolean ,
        default : false
    },


    
 } , { timestamps: true });

module.exports = mongoose.model('collegeDetails', collegeSchema) 
