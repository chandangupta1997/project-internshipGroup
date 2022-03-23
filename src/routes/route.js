const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")
// const midwareController=require("../controllers/midwareController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// Phase - 1

// create College
router.post("/createCollege", collegeController.createCollege)

//  create Intern
router.post("/createIntern", internController.createIntern)

router.get("/getCollege",collegeController.getCollege)










module.exports = router;