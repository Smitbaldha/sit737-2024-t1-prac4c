/**
   Express Application Configuration
  
   Configures an Express application for the Advance calculator (Add, Subtract, Multiply, Divide, Exponent, sqrt, Modulo) microservice.
 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger'); // importing logger from logger.js file
const math = require('mathjs'); // For tough operations like sqrt,exp etc.
const app = express();
const port = 1515; 

app.use(bodyParser.json());

// Middleware used for logging which saves the URL, request method, request body, and timestamp
app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `${new Date().toLocaleString()} - ${req.method} ${req.url} requested`,
        requestBody: req.body,
    });
    next();
});

//Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
}

// Routes

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home.html');
});

// Route to handle addition operation
app.post('/add', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for Addition: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 + num2;
    res.json({ result: result });
});

//Route to handle subtraction operation
app.post('/subtract', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for subtraction: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 - num2;
    res.json({ result: result });
});

//Route to handle multiplication operation
app.post('/multiply', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for multiplication: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 * num2;
    res.json({ result: result });
});

//Route to handle division operation
app.post('/divide', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for Division: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    if (num2 == 0) {
        logger.error(new Date().toLocaleString() +' - Division by zero is not possible');
        return res.status(400).json({ error: "Division by zero" });
    }

    const result = num1 / num2;
    res.json({ result: result });
});

// Route to handle exponentiation operation
app.post('/exponent', (req, res) => {
    try {    
        const { num1, num2 } = req.body;

        if (!isValidNumber(num1) || !isValidNumber(num2)) {
            logger.error(new Date().toLocaleString() +' - Invalid input for Exponentiation: num1=' + req.body.num1 + ', num2=' + req.body.num2);
            return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
        }

        const result = math.pow(parseFloat(num1), parseFloat(num2));
        res.json({ result });
    }
    catch (error) {
            res.status(400).json({ error: error.message });
        }
});

// Route to handle square root operation
app.post('/sqrt', (req, res) => {
    const { num1 } = req.body;

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for Square root: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = math.sqrt(parseFloat(num1));
    res.json({ result });
});

// Route to handle modulo operation
app.post('/modulo', (req, res) => {
    const { num1, num2 } = req.body;

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for modulo: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    if (num2 == 0) {
        logger.error(new Date().toLocaleString() +' - Division by zero is not possible');
        return res.status(400).json({ error: "modulo devisor is zero" });
    }

    const result = parseFloat(num1) % parseFloat(num2);
    res.json({ result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

