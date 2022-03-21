const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema( {
    title : {
        type : String ,
        required : "Title is required "
    },
    body : {
        type : String ,
        required : "Body Is Required " 
    },
    authorId : {
        type : ObjectId ,
        ref : "author" ,
        required : "author id is must " 
    } ,
    tags :  [ String ] ,
    category : {
        type : String ,
        required : "category is also required " 
    }, 
    subcategory : [ String ] ,
    isDeleted : {
        type : Boolean ,
        default : false
    } ,
    deletedAt:{type:Date,
    default:Date.now()},


    isPublished : { 
        type : Boolean ,
        default : false
    } ,
    publishedAt:{type:Date,
    default:Date.now()}

    
 } , { timestamps: true });

module.exports = mongoose.model('blog1', blogSchema) 
