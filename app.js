const Joi = require("joi");

const express = require("express");
const app = express();

const ninja = require("./controller/ninja");
const randommer = require("./controller/randommer");
const data = require("./model/database");

app.use(express.json());

// A DEPLACER DANS HOME QUAND IL Y AURA LA VUE + TEST DE REUSSITE
const init = randommer.initSurnames();

// ROUTES
// Home
app.get("/", (req, res) => {
  res.send("Ninjify home");
  const init = randommer.initSurnames();
});

// Ninjify route
app.get("/ninjify", (req, res) => {
  if (!req.query.buzz)
    return res.status(400).send("At least one buzzword is required");

  // Array of the different buzzwords all lowercase
  var words = req.query.buzz.split(",").map(function (v) {
    return v.toLowerCase();
  });
  const buzz = { words: words };

  // Input validation
  const result = validateBuzz(buzz);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const ninjaName = ninja.ninjify(buzz.words);
  console.log("final ninja name");
  console.log(ninjaName);
  res.send(result);
});

function validateBuzz(buzz) {
  const schema = Joi.object({
    words: Joi.array().items(Joi.string().alphanum()),
  });

  return schema.validate(buzz);
}

// Use environement variable or assign one
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
