const { default: mongoose } = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel =require("../models/internModel")
const ObjectId = mongoose.Types.ObjectId

const isValid =function(value){
    if(typeof value ==='undefined'|| value===null) return false 
    if(typeof value==='string'&&value.trim.length===0) return false 



}



const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isvalid(objectId)
    
    
    
}

const isValidRequestBody=function(requestBody){
    return Object.keys(requestBody).length>0
}
















const createCollege = async function(req,res){



    try{

    // checking khali body 
    const requestBody=req.body
    if(!isValidRequestBody(requestBody)){
        res.status(400).send({status:false,msg:"Invalid request parameters Please Provide College Details "})
        return

    }

    //Exact params using  rest operators 
    const{name,fullName}=requestBody; // desrructuring request body in variables and then accesing it for validation 


    //validation Starts
    if(!isValid(name)){res.status(400).send("College nick name  Is ReQuired ")
           return }
    if(!isValid(fullName)){res.status(400).send("College Full name is REquired ")
           return }


    //validation ends 

    const collegeData={name,fullName} // accessing it for blog Creation

    const newCollege= await collegeModel.create(collegeData)
    res.status(200).send({status:true,message:"New College Created Successfully ",data:newCollege})

    }


    catch(error){
        res.status(500).send({status:"false",msg:error.message})
    }




}














module.exports.createCollege = createCollege