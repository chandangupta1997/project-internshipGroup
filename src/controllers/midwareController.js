const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const loginAuthor = async function (req, res, next) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let author = await authorModel.findOne({
      email: email,
      password: password,
    });
    if (!author)
      res
        .status(404)
        .send({ msg: "username or passowrd is incorrect or author not found" });

    let token = jwt.sign(
      {
        authorid: author._id.toString(), //payload
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "Chandan-Key"
    ); //signature

    res.setHeader("x-auth-key", token);

    res.send({ status: true, data: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const Authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-key"];
    //if (!token) token = req.headers["x-Auth-Key"];
    if (!token) res.status(400).send("token must be present ");

    let decodedToken = jwt.verify(token, "Chandan-Key");

    if (!decodedToken) {
      return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    console.log(decodedToken);

    req.user = decodedToken.authorid; 





    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const autherAuth = async (req, res, next) => {
  try {
      const token = req.header('x-api-key')
      if(!token) {
          res.status(403).send({status: false, message: `Missing authentication token in request`})
          return;
      }

      const decoded = await jwt.verify(token, "Chandan-Key")

      if(!decoded) {
          res.status(403).send({status: false, message: `Invalid authentication token in request`})
          return;
      }

    

      req.authorId = decoded.authorId;

      next()
  } catch (error) {
      console.error(`Error! ${error.message}`)
      res.status(500).send({status: false, message: error.message})
  }
}




// const Authorisation = async function (req, res, next) {
//   try {


//     let token = req.headers["x-api-key"];
//         // console.log(token)
//         let blogId = req.params.blogId;

//         // console.log(blogId)
        
//         let blogDetails = await blogModel.findById(blogId)
//         // console.log(blogDetails)
//         let authorId = blogDetails.authorId
//         // console.log(authorId)
//         let decodedToken = jwt.verify(token, "Chandan-Key");
//         if (!decodedToken)
//             return res.status(402).send({ status: false, msg: "token is invalid" });
//             // console.log(decodedToken)
//         let decoded = decodedToken.authorid
//         if (authorId != decoded) return res.status(403).send({ status: false, msg: "anthentication denied" })
//         next()

//     } catch (error){
//         console.log(error)
//         res.status(500).send({msg:error.message})
//     }

    // let token = req.headers["x-auth-key"];
    // if (!token) token = req.headers["x-Auth-Key"];
    // if (!token) res.status(400).send("token must be present ");

    // let decodedToken = jwt.verify(token, "Chandan-Key");

    // if (!decodedToken)
    //   return res.send({ status: false, msg: "token is invalid" });
    // console.log(decodedToken);

    // let blogId = req.params.blogId;
    // let blogDetails = await blogModel.find({ _id: blogId }); //find by id//use find one
    // if (!blogDetails) return res.send("check param no such blog ");

    // let authorDetails = await blogModel.find({ _id: blogId }).select({ authorId: 1, _id: 0 })
    // if (!authorDetails) res.send("no author for this blog ");

    // if (!authorDetails == decodedToken.authorid)
    // res.status(400).send("your are not authorised to do that ")
    

      

  
//}



module.exports.autherAuth = autherAuth
module.exports.loginAuthor = loginAuthor;
// module.exports.Authentication = Authentication;
// module.exports.Authorisation = Authorisation;
