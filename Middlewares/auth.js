const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    var decoded = jwt.verify(token, "masai");
    if(decoded)
    next()
    else
    res.status(200).json({message:"Login before access or token invalid"});
  }
  catch(err){
    res.send(err.message);
  }
}

module.exports = auth;