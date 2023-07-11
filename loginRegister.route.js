const express = require("express");
const loginRegisterExpressRoute = express.Router();
const cors = require("cors");
let UserSchema = require("../model/user.model");
// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};


// registerExpressRoute.route("/create-user").get(async (req, res, next) => {
//   //await UserSchema.findOne((res.email) , (err , user) => {
//     const user = UserSchema.find(res.email);
//     console.log(user);
//     if(user)
//     {
//       res.json({
//         message: "User Already registerd"
//       });
//     }
//     else
//     {
//       registerExpressRoute.route("/create-user").post(async (req, res, next) => {
//         await UserSchema.create(req.body)
//           .then((result) => {
//             console.log(result);
//             res.json({
//               data: result,
//               message: "Registered Successfully",
//               status: 200,
//             });
//           })
//           .catch((err) => {
//             return next(err);
//           });
//       });
//     }
//   //})
// })



// Register user
loginRegisterExpressRoute.route("/register").post(async (req, res, next) => {
  await UserSchema.create(req.body)
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        message: "Registered Successfully",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

//login user
loginRegisterExpressRoute.route("/login/:email").get(async (req, res, next) => {
  await UserSchema.find({ email: { $eq: req.email } }, req.body)
    .then((result) => {
      if(result.password = req.password)
      {
        res.json({
          message: "You are loged in"
        });
      }
      else
      {
        res.json({
          message: "password in correct"
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
})



module.exports = loginRegisterExpressRoute;
