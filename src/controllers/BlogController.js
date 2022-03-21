const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const { default: mongoose } = require("mongoose")








const createBlog = async function (req, res) {
    try {
        const data = req.body
        const id = req.body.authorId

        if (!Object.keys(data).length > 0) return res.send({ error: "Please enter data" })

        const findAuthor = await authorModel.find({ _id: id })

        if (!findAuthor.length > 0) return res.status(400).send("error : Please enter valid authorId")

        const createdBlog = await blogModel.create(data)
        res.status(201).send({ Blog: createdBlog })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}











module.exports.createBlog = createBlog


