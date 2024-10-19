const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const { json } = require("express");
//controller lors de la connexion
const maxAge = 3 * 24 * 60 * 60 * 1000;
// fonction pour créer un token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { nom,email , password } = req.body;

  try {
 const user = await UserModel.create({ nom, email, password });
 const token = createToken(user._id);
    
    res.status(201).json({ token: token,
      user: user._id
     });
  } catch (err) {
    console.log(err)
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body);
  console.log('ok');
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge});
    console.log(token);
    
    res.status(200).json({ token: token})
  } catch (err){
    const errors = signInErrors(err);
    res.status(400).send({ errors });
  }
}
;

module.exports.logout = (req, res) => {
  res.cookie("jwt", " ", { maxAge: 1 });
  res.redirect("/");
};
