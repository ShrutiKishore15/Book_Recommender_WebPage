const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// API route to fetch books data from FastAPI
app.get('/api/books', async (req, res) => {
    try {
        const response = await axios.get('https://book-recommender-api.onrender.com/books'); 
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from FastAPI:', error);
        res.status(500).json({ error: 'Failed to fetch data from FastAPI' });
    }
});
app.post('/get-books', async (req, res) => {
    try {
        const userInput = req.body.nameInput;

        const response = await axios.post('https://book-recommender-api.onrender.com/recommend_books',
            new URLSearchParams({ user_input: userInput }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });
        res.json(response.data);
         // Send the recommendations back to the client as JSON
    } catch (error) {
        console.error('Error fetching similar books:', error);
        res.status(500).send('An error occurred while fetching similar books.');
    }
});
//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
