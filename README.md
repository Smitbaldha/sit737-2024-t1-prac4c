# Advanced Calculator Microservice
### Advanced Calculator is a microservice built with Express.js that provides basic arithmetic operations as well as some advanced operations.

### Features
- Supports addition, subtraction, multiplication, division, Exponential, Square-root, Modulo operations.
- Provides comprehensive error handling for invalid input and division by zero.
- Logs requests and errors for debugging purposes, enhancing troubleshooting capabilities.

### Prerequisites
- Ensure that you have Node.js installed on your machine.

### Installation
- To get started with Advanced Calculator Microservice, follow these steps:

1. Clone this repository. ``` git clone https://github.com/your-username/ASMD-microservice.git ```
2. Navigate to the project directory. ``` cd ASMD-microservice ```
3. Install dependencies. ``` npm install ```
4. Start the server. ``` npm start ```

## Usage
### Sending Requests
Send POST requests to the following endpoints:

- `/add` for addition operation (a+b)
- `/subtract` for subtraction operation (a-b)
- `/multiply` for multiplication operation (a*b)
- `/divide` for division operation (a/b)
- `/exponent` for exponentiation operation (a^b)
- `/sqrt` for square root operation (a^(1/2))
- `/modulo` for modulo operation (a%b)

Each request should include a JSON body with appropriate properties representing the numbers to perform the operation on. The required properties may vary depending on the operation selected.

#### Example request body:

- For addition, subtraction, multiplication, division, Exponent and modulo operations:
```json
{
  "num1": 5,
  "num2": 3
}
```
- For square root operation:
```json
{
  "num1": 25
}
```


### Response
The server will respond with a JSON object containing the result of the operation:

```json
{
  "result": 8
}
```
If an error occurs (e.g., invalid input or division by zero), the server will respond with an error message in the JSON format:

```json
{
  "error": "Invalid input. Please provide valid numbers."
}
```

### Logging
Advanced Calculator Microservice logs each request and error with accurate time to the console and log files located in the logs directory. This logging mechanism aids in debugging and monitoring the microservice's behavior.
