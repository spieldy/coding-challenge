const express = require("express");
const Joi = require("joi");
const path = require("path");
require("dotenv").config();
const ninja = require("./controllers/ninja");
const randommer = require("./controllers/randommer");
const data = require("./models/database");

const MongoClient = require("mongodb").MongoClient;

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

let db;

console.log(`Connecting to MongoDB: ${process.env.DB_URL}`);
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
  .then((client, err) => {
    if (err) return console.log(err);

    // Storing a reference to the database so you can use it later
    db = client.db(process.env.DB_NAME);

    console.log(`Connected MongoDB: ${process.env.DB_URL}`);
    console.log(`Database: ${process.env.DB_NAME}`);

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

      const buzz = { words: words };

      if (checkIfKonami(words)) {
        res.render("index", {
          ninjaName: "surprise",
          konami: true,
          error: null,
        });
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

        const ninjaName = ninja.ninjify(buzz.words, db);
        res.render("index", {
          ninjaName: ninjaName,
          konami: false,
          error: null,
        });
      }
    });

    // Use environement variable or assign one
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on ${port}...`));
  })
  .catch(console.error);

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
