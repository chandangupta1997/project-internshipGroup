const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema( {
    name : {
        type : String ,
        required : "Name is required "
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:"email is required ",
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        }
        //match: [/^8\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile:{
        type : Number,
        required : "Mobile number is required",//true
        unique:true,
        validate: {
            validator: function (mobile) {
                return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(mobile)
            }, message: 'Please fill a valid email address', isAsync: false
        }

    },
    collegeId : {
        type : ObjectId ,
        ref : "collegeDetails" ,
        required : "college id is must " 
    } ,
    isDeleted : {
        type : Boolean ,
        default : false
    }
 } , { timestamps: true });

module.exports = mongoose.model('internDetails', internSchema) 
