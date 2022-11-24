const express = require("express");

const recipesControllers = require("../controllers/recipesControllers");
const { processImage, uploadImage } = require("../helpers/uploadImages");

const router = express.Router();

router.post("/", uploadImage, processImage, recipesControllers.createOneRecipe);
router.get("/", recipesControllers.requestAllRecipes);
router.get("/favorites", recipesControllers.requestFavoriteRecipes);
router.get("/:recipeId", recipesControllers.requestOneRecipe);
router.patch(
  "/:recipeId",
  uploadImage,
  processImage,
  recipesControllers.updateOneRecipe
);
router.delete("/:recipeId", recipesControllers.deleteOneRecipe);

module.exports = router;
