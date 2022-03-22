const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const { default: mongoose } = require("mongoose")








const createIntern = async function (req, res) {
    try {
        const data = req.body
        const id = req.body.collegeId

        if (!Object.keys(data).length > 0) return res.send({status:false,error: "Please enter data" })

        const findCollege = await collegeModel.find({ _id: id })

        if (!findCollege.length > 0) return res.status(400).send({status:false,msg:"error : Please enter valid collegeId"})

        const createdIntern = await internModel.create(data)
        res.status(201).send({ Blog: createdIntern })
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


