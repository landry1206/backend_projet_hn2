const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// controller de tous les utisateurs
module.exports.getAllUsers = async (req, res) => {
  console.log('hello');
  
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// controller d'un seul utilisateur
module.exports.userInfo = async(req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const userInfo = await UserModel.findById(req.params.id);
    res.status(200).json({
        _id: userInfo._id,
        nom: userInfo.nom,
        email: userInfo.email,
        picture: userInfo.picture,
        bio: userInfo.bio,
    });
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};

// controller pour modifier une information
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    const updatedRecord = {
      picture: req.body.picture,
      bio : req.body.bio
    };
  
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else console.log("Update error : " + err);
      }
    );
  };

// controller pour supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// controller des followers
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // ajouter dans la liste des followers
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))
    ),
      // ajouter dans la liste des followings
      await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true }
          .catch((err) => res.status(500).send({ message: err }))
      );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))
    ),
      // Retirer de la liste des followers
      await userModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true }
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }))
      );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
