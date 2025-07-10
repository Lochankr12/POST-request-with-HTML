const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 3000;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors()); 
// This is the key middleware to parse incoming JSON from POST requests
app.use(express.json()); 
// Serve static files (like index.html) from the 'public' directory
app.use(express.static('public')); 

// --- In-Memory "Database" ---
// Let's start with some sample data
let products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Keyboard', price: 75 }
];
let currentId = 3;

// --- API Routes ---

/**
 * @api {get} /api/products
 * @description Get all products
 */
app.get('/api/products', (req, res) => {
    console.log('GET request received for all products.');
    res.json(products);
});

/**
 * @api {post} /api/products
 * @description Add a new product
 * This is the core of the deliverable.
 */
app.post('/api/products', (req, res) => {
    // 1. Get the new product data from the request body
    const newProductData = req.body;
    
    // DELIVERABLE: console.log the data on the server
    console.log('POST request received. Data:', newProductData);

    // Basic validation
    if (!newProductData.name || !newProductData.price) {
        return res.status(400).json({ message: 'Product name and price are required.' });
    }

    // 2. Create a new product object with an ID
    const newProduct = {
        id: currentId++,
        name: newProductData.name,
        price: parseFloat(newProductData.price) // Ensure price is a number
    };

    // 3. "Save" the new product to our database array
    products.push(newProduct);

    // DELIVERABLE: Return the user-added product as a response
    // 201 status code means "Created"
    res.status(201).json(newProduct);
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});