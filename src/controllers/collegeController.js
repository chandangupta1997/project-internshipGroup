const collegeModel = require("../models/collegeModel")
const internModel =require("../models/internModel")
const createCollege = async function(req,res){
    try{
        const data = req.body
        if(Object.keys(data).length>0){
            let savedData = await collegeModel.create(data)
            res.status(201).send({msg:savedData})
          }
          else
          res.status(400).send({status:false,msg:"BAD REQUEST"})
    }
    catch(err){
        res.status(500).send({status:false,msg:"Server Error",error:err.message})
    }
}






const getCollege =async function(req,res){

    let data =req.query
    if(!data)return res.send("please enter data in query")

    let collegeName = req.query.name
    if(!collegeName) res.status().send("please senter")
    let collegeDetails=await collegeModel.findOne({name:collegeName})

    // yha empty array aa rha hai isliye  phle find tha sirf 
    if (!Object.keys(collegeDetails).length > 0) return res.send({ error: "there is no such college " })

    if(!collegeDetails)return res.status(404).send({status:"false",msg:"no such College found check college id "})

    // res.status(200).send({status:"true",msg:collegeDetails})
    console.log(collegeDetails)
    let collegeId = collegeDetails.id  //.select({_id:1})
    console.log(collegeId)

    // //let collegeId =collegeDetails.name //or full name 
    // //phir 
    let collegeInterns= await internModel.find({_collegeid:collegeId})
    console.log(collegeInterns)

    res.status(200).send({status:"true",msg:collegeInterns})



    //let collegeInterns= collegeModel.find({name:collegeName}).populate("internDetails")
    //console.log("line49",collegeInterns)

    //res.send(collegeDetails)





    // let collegeInterns = req.query.interId

}





module.exports.getCollege=getCollege


module.exports.createCollege = createCollege