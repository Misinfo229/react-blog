const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Initialize app
console.log("Node app launched");

// Connect to the database
connection();

// Create Node server
const app = express();
const port = 3900;

// Configure cors
app.use(cors());

// Convert body to JS Object
// Receive data with content-type app/json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create routes (req es la petición y res la respuesta)
const post_routes = require("./routes/post");

// ** Load routes **
app.use("/api", post_routes);


// Hardcored routes
app.get("/", (req, res) => {
    return res.status(200).send(
        "<div><h1>Testing</h1></div>"
    );
});
app.get("/testing", (req, res) => {
    console.log("Endpoint testing has been executed");
    return res.status(200).send({
        course: "Master React",
        autor: "MC"
    });
});

// Create server and listen http requests
app.listen(port, () => {
    console.log("Server running on port " + port);
});