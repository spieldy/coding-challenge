const Joi = require('joi');

const express = require('express');
const app = express();

const ninja = require('./ninja');
const data = require('./model/database');



app.use(express.json());

// ROUTES
// Home 
app.get('/', (req, res) => {
    res.send('Ninjify home');
});

// Ninjify route
app.get('/ninjify', (req, res) => {
    if (!req.query.buzz) return res.status(400).send('At least one buzzword is required');
    
    // Array of the different buzzwords
    const buzz = { words: req.query.buzz.split(',') }

    // Input validation
    const result = validateBuzz(buzz);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const ninjaName = ninja.ninjify(buzz.words);
    console.log('final ninja name');
    console.log(ninjaName);
    res.send(result);
});

function validateBuzz(buzz) {
    const schema = Joi.object({
        words: Joi.array().items(Joi.string().alphanum())
    });

    return schema.validate(buzz);
}



// Use environement variable or assign one
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on ${port}...`));