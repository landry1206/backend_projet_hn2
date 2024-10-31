const router = require('express').Router();
const eventController = require('../controllers/event.controller');


//routes pour les posts
router.get('/', eventController.readEvent);
router.post('/', eventController.createEvent);
//route pour modifier un message
router.put('/:id', eventController.updateEvent);
//route pour supprimer un message
router.delete('/:id', eventController.deleteEvent);
//route pour ajouter un like
router.patch('/like-post/:id', eventController.likeEvent);
//route pour retirer un like
router.patch('/unlike-post/:id', eventController.unlikeEvent);
// route d'ajout de participant
router.patch('/add-participant/:id', eventController.participantEvent);
// route de suppression d'un participant
router.patch('/remove-participant/:id', eventController.removeParticipantEvent);





module.exports = router;