const collegeModel = require("../models/collegeModel")

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
    let collegeDetails=await collegeModel.find({name:collegeName})

    // yha empty array aa rha hai isliye 
    if (!Object.keys(collegeDetails).length > 0) return res.send({ error: "Please enter data" })

    if(!collegeDetails)return res.status(404).send({status:"false",msg:"no such College found check college id "})

    res.status(200).send({status:"true",msg:collegeDetails})


    // let collegeInterns = req.query.interId

}





module.exports.getCollege=getCollege


module.exports.createCollege = createCollege