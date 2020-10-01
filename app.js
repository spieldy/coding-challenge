const express = require("express");
const Joi = require("joi");
const path = require("path");
require("dotenv").config();
const ninja = require("./controllers/ninja");
const randommer = require("./controllers/randommer");
const data = require("./models/database");

const app = express();

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

// Create the first pool of requested name on the server
randommer.initSurnames();
const konami = process.env.KONAMI;

data.checkBuzz("php");

// ROUTES
// Home
app.get("/", (req, res) => {
  randommer.initSurnames();
  res.render("index", { ninjaName: "", konami: false, error: null });
});

// Ninjify route
app.get("/ninjify", (req, res) => {
  if (!req.query.buzz)
    return res.status(400).send("At least one buzzword is required");

  // Array of the different buzzwords all lowercase
  var words = req.query.buzz.split(",").map(function (v) {
    // Remove space to normalize
    v = v.replace(/\s+/g, "");
    return v.toLowerCase();
  });

  if (checkIfKonami(words)) {
    res.render("index", { ninjaName: "surprise", konami: true, error: null });
  } else {
    const buzz = { words: words };

    // Input validation
    const result = validateBuzz(buzz);
    if (result.error)
      return res.status(400).render("index", {
        ninjaName: "",
        konami: false,
        error: result.error.details[0].message,
      });

    const ninjaName = ninja.ninjify(buzz.words);
    res.render("index", { ninjaName: ninjaName, konami: false, error: null });
  }
});

function validateBuzz(buzz) {
  const schema = Joi.object({
    words: Joi.array().items(
      Joi.string().alphanum().messages({
        "string.empty": "Aucun Buzzword ne peut être vide",
        "string.alphanum":
          "Buzzword doit être constitué de lettres et de chiffres uniquement",
      })
    ),
  });

  return schema.validate(buzz);
}

function checkIfKonami(words) {
  var test = "";
  words.forEach((element) => {
    test = test.concat(element);
    test = test.concat(",");
  });
  return test === konami;
}

// Use environement variable or assign one
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
