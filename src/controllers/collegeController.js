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



// const createCollege = async function( req , res ) {
//     try {
//         const data = req.body

//         // check : if request body is empty
//         if ( !Object.keys(data) > 0)  return res.status(400).send({status : false ,message : "Please enter data"})

//         // check : if any data field has no value or it is empty
//         if( !isValid(data.name) )    return res.status(400).send({ status : false, message: 'please provide short name'})
//         if( !isValid(data.fullname) )    return res.status(400).send({ status : false, message: 'please provide fullname'})
//         if( !isValid(data.logoLink) )    return res.status(400).send({ status : false, message: 'please provide logoLink'})

//         // Create :  Intern 
//         const createdIntern = await collegeModel.create(data)
//         return res.status(201).send({ status : true , data : createdIntern})
//     }
//     catch ( error ) {
//         console.log(error.message)
//         return res.status(500).send({ status : false,message : error.message})
//     }
// }














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

    // if( !isValid(data.logoLink) )   
    // return res.status(400).send({ status : false, message: 'please provide logoLink'})


    //validation ends 

    const collegeData={name,fullName} // accessing it for blog Creation

    const newCollege= await collegeModel.create(collegeData)
    res.status(200).send({status:true,message:"New College Created Successfully ",data:newCollege})

    }


    catch(error){
        res.status(500).send({status:"false",msg:error.message})
    }




}


const getCollege =async function(req,res){



    try{

        

    let data =req.query
    if(!isValidRequestBody(data)){
        res.status(400).send({status:false,msg:"Invalid request parameters Please Provide query to search "})
        return

    }
    

    let collegeName = req.query.name
    //if( !isValid(collegeName) )    return res.status(400).send({ status : false, message: 'please provide college Name'})
    //if(!collegeName) res.status().send("please senter")


    let collegeDetails=await collegeModel.findOne({name:collegeName})

    // yha empty array aa rha hai isliye  phle find tha sirf  
    if (!Object.keys(collegeDetails).length > 0) return res.send({ error: "there is no such college " })

    if(!collegeDetails)return res.status(404).send({status:"false",msg:"no such College found check college id "})

   // res.status(200).send({status:"true",msg:collegeDetails})


    const collegeId = await collegeModel.find({ name : collegeName , isDeleted : false }).select({ _id : 1})
    if( !Object.keys(collegeId).length > 0)  return res.status(404).send({ status : false, message: 'No data found'})

    // let collegeId = collegeDetails.id  //.select({_id:1})
    // console.log(collegeId)

    // //let collegeId =collegeDetails.name //or full name 
    // //phir 




    let colleges = await collegeModel.findById(collegeId).select({ name:1 , fullname:1 , logoLink:1 , _id:0})


    let collegeInterns= await internModel.find({_collegeid:collegeId})
    console.log(collegeInterns)

    let obj = {name : colleges.name ,
        fullname : colleges.fullname ,
        logoLink : colleges.logoLink , 
        interests : collegeInterns}

//  send : response
      res.status(200).send({status : true ,data : obj })


    }



    catch(error){

        res.status(500).send(error.message)

    }

}













module.exports.createCollege = createCollege
module.exports.getCollege=getCollege