const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    /* #1 */
    title: {
      type: String,
      required: [true, "Title field is required."],
      minlength: [
        2,
        "Title field has to be more than or equal to 2 characters.",
      ],
      maxlength: [
        50,
        "Title field has to be less than or equal to 50 characters.",
      ],
      trim: true,
    },
    /* #2 */
    category: {
      type: String,
      required: [true, "Category field is required."],
      enum: [
        "breakfast",
        "lunch",
        "dinner",
        "appetizer",
        "salad",
        "main-course",
        "side-dish",
        "baked-goods",
        "dessert",
        "snack",
        "soup",
        "holiday",
        "vegetarian",
      ],
    },
    /* #3 */
    ingredients: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [
            2,
            "Ingredient field has to be more than or equal to 2 characters.",
          ],
          maxlength: [
            500,
            "Ingredient field has to be less than or equal to 500 characters.",
          ],
        },
      ],
      required: [true, "Ingredients list is required."],
      validate: [
        {
          validator: (val) => val.length >= 1,
          message: "Ingredients list must include at least 1 ingredient.",
        },
        {
          validator: (val) => val.length <= 100,
          message: "Ingredients list must include at most 100 ingredients.",
        },
      ],
    },
    /* #4 */
    steps: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [
            2,
            "Step field has to be more than or equal to 2 characters.",
          ],
          maxlength: [
            500,
            "Step field has to be less than or equal to 500 characters.",
          ],
        },
      ],
      required: [true, "Steps list is required."],
      minlength: [
        2,
        "Step field has to be more than or equal to 2 characters.",
      ],
      maxlength: [
        1000,
        "Step field has to be less than or equal to 1000 characters.",
      ],
      trim: true,
      validate: [
        {
          validator: (val) => val.length >= 1,
          message: "Steps list must include at least 1 step.",
        },
        {
          validator: (val) => val.length <= 100,
          message: "Steps list must include at most 100 steps.",
        },
      ],
    },
    /* #5 */
    image: {
      type: String,
      default: process.env.DEFAULT_IMAGE_URL,
    },
    /* #6 */
    prepTime: {
      type: String,
      minlength: [
        1,
        "PrepTime field has to be more than or equal to 1 characters.",
      ],
      maxlength: [
        15,
        "PrepTime field has to be less than or equal to 15 characters.",
      ],
      trim: true,
    },
    /* #7 */
    cookTime: {
      type: String,
      minlength: [
        1,
        "CookTime field has to be more than or equal to 1 characters.",
      ],
      maxlength: [
        15,
        "CookTime field has to be less than or equal to 15 characters.",
      ],
      trim: true,
    },
    /* #8 */
    serves: {
      type: Number,
      min: [1, "Serves field has to be more than or equal to 1."],
      max: [50, "Serves field has to be less than or equal to 50."],
    },
    /* #9 */
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    /* #10 */
    isFavorited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
