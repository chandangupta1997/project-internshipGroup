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

module.exports.createCollege = createCollege