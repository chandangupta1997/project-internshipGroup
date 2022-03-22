const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
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
    // logoLink : { 
    //     required:"logo link is required ",
    //     validate: {
    //         validator: function (URL) {
    //             return /?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)/.test(URL)
    //         }, message: 'Please fill a valid email address', isAsync: false
    //     }

        

    // },

    isDeleted : {
        type : Boolean ,
        default : false
    },


    // internId:{type : ObjectId ,
    //     ref : "internDetails" ,
    //     required : "intern id is must " 

    // }
 } , { timestamps: true });

module.exports = mongoose.model('collegeDetails', collegeSchema) 
