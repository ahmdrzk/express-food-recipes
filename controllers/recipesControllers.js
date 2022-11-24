const Recipe = require("../models/recipeModel");
const OperationalError = require("../helpers/operationalError");

/* #1 */
exports.createOneRecipe = async (req, res, next) => {
  const reqData = req.body;

  reqData.ingredients = reqData.ingredients.split(",");
  reqData.steps = reqData.steps.split(",");

  try {
    const recipe = (await Recipe.create([reqData]))[0];

    res.status(201).json({
      results: 1,
      status: "success",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

/* #2 */
exports.requestAllRecipes = async (req, res, next) => {
  const { skip, limit } = req.query;

  try {
    const recipes = await Recipe.find()
      .skip(Number(skip))
      .limit(Number(limit) || 10);

    const recipesEntities = {};
    recipes.forEach((recipe) => (recipesEntities[recipe.id] = recipe));

    res.status(200).json({
      results: recipes.length,
      status: "success",
      data: recipesEntities,
    });
  } catch (error) {
    next(error);
  }
};

/* #3 */
exports.requestOneRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  try {
    const recipe = await Recipe.findOne({ _id: recipeId });

    if (!recipeId)
      return next(
        new OperationalError(404, `No recipe found with this id '${recipeId}'.`)
      );

    res.status(200).json({
      results: 1,
      status: "success",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

/* #4 */
exports.updateOneRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  const reqData = req.body;

  if (reqData.image === "undefined") delete reqData.image;

  if (reqData.ingredients) reqData.ingredients = reqData.ingredients.split(",");
  if (reqData.steps) reqData.steps = reqData.steps.split(",");

  try {
    const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, reqData, {
      new: true,
      runValidators: true,
    });

    if (!recipe)
      return next(
        new OperationalError(404, `No recipe found with this id '${recipeId}'.`)
      );

    res.status(200).json({
      results: 1,
      status: "success",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

/* #5 */
exports.deleteOneRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  try {
    const recipe = await Recipe.findOneAndDelete({ _id: recipeId });

    if (!recipe) {
      return next(
        new OperationalError(404, `No recipe found with this id '${recipeId}'.`)
      );
    }

    res.status(204).json({
      results: 0,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

/* #6 */
exports.requestFavoriteRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ isFavorited: true });

    const recipesEntities = {};
    recipes.forEach((recipe) => (recipesEntities[recipe.id] = recipe));

    res.status(200).json({
      results: recipes.length,
      status: "success",
      data: recipesEntities,
    });
  } catch (error) {
    next(error);
  }
};
