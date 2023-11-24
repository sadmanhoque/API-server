const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample data (replace with your own data storage mechanism)
let data = [
    { "user_id": 1, "username": "Item 1" },
    { "user_id": 2, "username": "Item 2" },
    { "user_id": 3, "username": "Item 3" }
];
let nextUderId = 4;

// GET all
//curl http://localhost:3000/v1/user
app.get('/v1/user', (req, res) => {
    res.json(data);
});

// GET by id
//curl http://localhost:3000/v1/user?user_id=2
app.get('/v1/user', (req, res) => {
    const itemId = parseInt(req.query.user_id);
    const item = data.find((item) => item.user_id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST new user
//curl -X POST -H "Content-Type: application/json" -d '{"name": "New Item", "password": "sdfsdfsd"}' http://localhost:3000/v1/user
app.post('/v1/user', (req, res) => {
    const newUser = req.body;
    newUser.id = nextUderId++
    data.push(newUser);
    res.status(201).json(newUser);
});

// PUT
//curl -X PUT -H "Content-Type: application/json" -d '{"username": "Updated Item"}' "http://localhost:3000/v1/user?user_id=3"
app.put('/v1/user', (req, res) => {
    const usernameId = parseInt(req.query.user_id);
    const updatedusername = req.body;
    const index = data.findIndex((username) => username.user_id === usernameId);

    if (index !== -1) {
        data[index] = { ...data[index], ...updatedusername };
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'username not found' });
    }
});

// DELETE
//curl -X DELETE "http://localhost:3000/v1/user?user_id=2"
app.delete('/v1/user', (req, res) => {
    const usernameId = parseInt(req.query.user_id);
    const originalLength = data.length;
    data = data.filter((username) => username.user_id !== usernameId);

    if (data.length < originalLength) {
        res.json({ message: 'username deleted successfully' });
    } else {
        res.status(404).json({ message: 'username not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
