const express = require('express');
const bodyParser = require('body-parser');
var sha1 = require('sha1');

const app = express();
const port = 3000;
const Ajv = require("ajv")
const ajv = new Ajv()

app.use(bodyParser.json());

// Sample data (replace with your own data storage mechanism)
let data = [
    { "user_id": 1, "username": "Item 1", "password": "sdkljfnsdl0" },
    { "user_id": 2, "username": "Item 2", "password": "wopeiruwoij" },
    { "user_id": 3, "username": "Item 3", "password": "9348o756gkl" }
];
let nextUderId = 4;
const schema = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: ["username"],
    additionalProperties: false
}

// GET
//curl -H "Authorization: example" http://localhost:3000/v1/user?user_id=2
app.get('/v1/user', (req, res) => {

    const userId = parseInt(req.query.user_id);
    const user = data.find((user) => user.user_id === userId);

    if (user) {
        res.json([{
            "user_id": user.user_id,
            "username": user.username,
            "password": sha1(user.username + user.password)
        }]);
    } else if (!userId) {
        res.json(data);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// POST new user
//curl -X POST -H "Content-Type: application/json, Authorization: example" -d '{"username": "New Item", "password": "sdfsdfsd"}' http://localhost:3000/v1/user
app.post('/v1/user', (req, res) => {
    const newUser = req.body;
    const valid = ajv.validate(schema, newUser)
    if (!valid) res.status(400).json("input format error")

    newUser.id = nextUderId++
    data.push(newUser);
    res.status(201).json(newUser);
});

// PUT
//curl -X PUT -H "Content-Type: application/json, Authorization: example" -d '{"username": "Updated Item"}' "http://localhost:3000/v1/user?user_id=3"
app.put('/v1/user', (req, res) => {
    const usernameId = parseInt(req.query.user_id);
    const updatedusername = req.body;
    const index = data.findIndex((username) => username.user_id === usernameId);
    const valid = ajv.validate(schema, newUser)
    if (!valid) res.status(400).json("input format error")

    if (index !== -1) {
        data[index] = { ...data[index], ...updatedusername };
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

// DELETE
//curl -X DELETE -H "Authorization: example" "http://localhost:3000/v1/user?user_id=2"
app.delete('/v1/user', (req, res) => {
    const usernameId = parseInt(req.query.user_id);
    const originalLength = data.length;
    data = data.filter((username) => username.user_id !== usernameId);

    if (data.length < originalLength) {
        res.json({ message: 'user deleted successfully' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Your access token is: FKwf1QPEDh0Nuaa`)
});
