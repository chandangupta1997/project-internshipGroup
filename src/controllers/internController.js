const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const { default: mongoose } = require("mongoose")

const isValid =function(value){
    if(typeof value ==='undefined'|| value===null) return false 
    if(typeof value ==='string' && value.trim().length===0) return false 
    return true;



}



const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
    
    
    
}

const isValidRequestBody=function(requestBody){
    return Object.keys(requestBody).length>0
}


const createIntern = async function (req, res) {
    try {
        const data = req.body

        // Validation Start
        if(!isValidRequestBody(data)){
            res.status(400).send({status:false,msg:"Invalid request parameters Please Provide Intern Details "})
            return
    
        }
        // i Extracted the params by destructuring it
        const{name,email,mobile,collegeId,isDeleted} = data
        // const id = req.body.collegeId 

        if(!isValid(name)){
            return res.status(400).send({status:false,msg:"Name is required"})
        }
        
        if(!isValid(email)){
            return res.status(400).send({status:false,msg:"Email is required"})
        }

        // validating the regex part
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return res.status(400).send({status:false,msg:"Email should be a valid email Id"})
        }

        // searching the email id in our database and matching it
        const isEmailAlreadyExist = await internModel.findOne({email});

        // if email id is matched that means emai id is already exist so we have to return false
        if(isEmailAlreadyExist){
           return res.status(400).send({status:false,msg:`${email} email Id is already exist`})
        }

        if(!isValid(mobile)){
            return res.status(400).send({status:false,msg:"Mobile is required"})
        }

        // validating the regex part
        if(!(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(mobile))){
            return res.status(400).send({status:false,msg:"Number should be a valid Number"})
        }

        // searching the Mobile number in our database and matching it
        const isNumberAlreadyExist = await internModel.findOne({mobile});

        // if Mobile number is matched that means Number is already exist so we have to return false
        // Good Work Bhai code is very clean  
        if(isNumberAlreadyExist){
            return res.status(400).send({status:false,msg:`${mobile} Mobile Number is already exist`})
        }

        if(!isValid(collegeId)){
            return res.status(400).send({status:false,msg:"collegeId is required"})
        }

        // I think this is not required here  // it is required buddy 
        if(!isValidObjectId(collegeId)){
            return res.status(400).send({status:false,msg:`${collegeId} is not a valid college Id`})
        }

        const college = await collegeModel.findById(collegeId);
        if(!college){
           return res.status(400).send({status:false,msg:"College does not exist"})
        }
        // Validation end
        
        const internData = {
            name,
            email,
            mobile,
            collegeId,
            isDeleted:isDeleted ? isDeleted:false 
        }//accessing it for intern Creation

        // if (!Object.keys(data).length > 0) return res.send({status:false,error: "Please enter data" })
        // chandan plz take a look at below codes and let me know do we need to keep these things or not
        const findCollege = await collegeModel.find({ _id: collegeId})  // college id ki jgh id tha corrected 

        if (!findCollege.length > 0) return res.status(400).send({status:false,msg:"error : college does not exist  please enter valid college id "})
        // till here


        const createdIntern = await internModel.create(internData)
        res.status(201).send({ status:"true",msg:"interne registered",Intern: createdIntern })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status:true,msg: err.message })
    }
}


// const getInternDetails = async function(req,res){
//     try{
//         let filters = req.query
//     }
//     catch(err){
//         res.status(500).send({status:false,msg:"Server Error",error:err.message});
//     }
// }










module.exports.createIntern = createIntern

//module.exports.getInternDetails = getInternDetails


