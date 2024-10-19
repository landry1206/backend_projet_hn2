const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");



// routes lors de la'enregistrement la connexion et la deconnexion
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// routes pour les informations
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

// routes pour modifier , supprimer et ajouter des informations
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);



module.exports = router;
