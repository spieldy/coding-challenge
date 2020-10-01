const express = require("express");

const ninja = require("./controllers/ninja");
const randommer = require("./controllers/randommer");
const data = require("./models/database");

const app = express();
app.use(express.json());

app.set("view engine", "ejs");

// Create the first pool of requested name on the server
const init = randommer.initSurnames();

data.checkBuzz("php");

// ROUTES
// Home
app.get("/", (req, res) => {
  const init = randommer.initSurnames();
  res.render("index");
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
  const buzz = { words: words };

  // Input validation
  const result = validateBuzz(buzz);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const ninjaName = ninja.ninjify(buzz.words);
  console.log("final ninja name");
  console.log(ninjaName);

  res.render("index", { ninjaName: ninjaName });
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
