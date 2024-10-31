const EventModel = require("../models/event.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const { ObjectId } = require('mongoose').Types;

// controller d'affichage de tous les Events
module.exports.readEvent = async (req, res) => {
    try {
      const data = await EventModel.find().sort({ createdAt: -1 }); // tri des events par ordre de creation
      res.status(200).send(data); 
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err); 
      res.status(500).send({ message: "Erreur interne du serveur" }); 
    }
  };

// controller de creation de creation de creation des Events
module.exports.createEvent = async (req, res) => {
  console.log(req.body);
  const newEvent = new EventModel({
    AuthorId: req.body.AuthorId,
    message: req.body.message,
    picture: req.body.picture,
    nameEvent: req.body.nameEvent
  });

  try {
    const Event = await newEvent.save(); // enregistrement du nouvel event
    return res.status(201).json(Event);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//controller de la mise à jour d'un evenement
module.exports.updateEvent = async (req, res) => {
  // Vérification de la validité de l'ID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  const updatedRecord = {
    message: req.body.message,
    nameEvent: req.body.nameEvent,
    picture: req.body.picture,
    date: req.body.date,
  };

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord }, // mise à jour de l'evenénement
      { new: true } 
    );

    // Vérification si l'événement a été trouvé et mis à jour
    if (!updatedEvent) {
      return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
    }

    res.status(200).send(updatedEvent); 
  } catch (err) {
    console.error("Erreur de mise à jour :", err); 
    res.status(500).send({ message: "Erreur interne du serveur" }); 
  }
};


//controller de suppression de Events

module.exports.deleteEvent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("ID inconnu : " + req.params.id);
    }
  
    try {
      const deletedEvent = await EventModel.findByIdAndDelete(req.params.id); // suppression de l'evénément
  
      // Vérification si l'événement a été trouvé et supprimé
      if (!deletedEvent) {
        return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
      }
      res.status(200).send({ message: "Événement supprimé avec succès", data: deletedEvent }); 
    } catch (err) {
      console.error("Erreur de suppression :", err); 
      res.status(500).send({ message: "Erreur interne du serveur" }); 
    }
  };

// controller de like des Events

module.exports.likeEvent = async (req, res) => {
  // Vérification de la validité de l'ID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id }, // ajout de l'id du liker dans le tableau des likers
      },
      { new: true } 
    );

    // Vérification si l'événement a été trouvé et mis à jour
    if (!updatedEvent) {
      return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
    }

    res.status(200).send(updatedEvent); 
  } catch (err) {
    console.error("Erreur lors de l'ajout du like :", err); 
    res.status(500).send({ message: "Erreur interne du serveur" }); 
  }
};


// controller d'unlike des Events

module.exports.unlikeEvent = async (req, res) => {
  // Vérification de la validité de l'ID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu : " + req.params.id);
  }

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id }, // Retirait l'ID  du liker de la liste des likers
      },
      { new: true } // Retourner le document mis à jour
    );

    // Vérification si l'événement a été trouvé et mis à jour
    if (!updatedEvent) {
      return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
    }

    res.status(200).send(updatedEvent); 
  } catch (err) {
    console.error("Erreur lors du retrait du like :", err); 
    res.status(500).send({ message: "Erreur interne du serveur" }); 
  }
};

// Controller d'ajout de participants
module.exports.participantEvent = async (req, res) => {
    // Vérification de la validité de l'ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("ID inconnu : " + req.params.id);
    }
  
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { participants: req.body.id }, // Ajout d'un participant au tableau des participants
        },
        { new: true } 
      );
  
      // Vérification si l'événement a été trouvé et mis à jour
      if (!updatedEvent) {
        return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
      }
  
      res.status(200).send(updatedEvent); 
    } catch (err) {
      console.error("Erreur lors de l'ajout du like :", err); 
      res.status(500).send({ message: "Erreur interne du serveur" }); 
    }
  };

// Controller de suppression de participants
module.exports.removeParticipantEvent = async (req, res) => {
    // Vérification de la validité de l'ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("ID inconnu : " + req.params.id);
    }
  
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { participants: req.body.id }, // Retire l'ID de la liste du participant
        },
        { new: true } // Retourner le document mis à jour
      );
  
      // Vérification si l'événement a été trouvé et mis à jour
      if (!updatedEvent) {
        return res.status(404).send("Événement non trouvé avec l'ID : " + req.params.id);
      }
  
      res.status(200).send(updatedEvent); 
    } catch (err) {
      console.error("Erreur lors du retrait du participant :", err); 
      res.status(500).send({ message: "Erreur interne du serveur" }); 
    }
  };
  