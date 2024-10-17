/**
 * Midterm API Project - COMP229 Winter 2024
 * 
 * Challenge: Implement the API logic for managing a collection of books!
 * 
 * Endpoints:
 * 1. GET /api/items       - Retrieve the full list of books.
 * 2. GET /api/items/search?title=[partial title name] - Retrieve books by a partial title match.
 * 3. GET /api/items/:id   - Retrieve a book by its index.
 * 4. POST /api/items      - Add a new book to the collection.
 * 5. PUT /api/items/:id   - Update a book by its index.
 * 6. DELETE /api/items/:id - Remove a book from the collection by its index.
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// GET /api/items
// Description: Get all items (books)
app.get('/api/items', (req, res) => {
  res.json(books);
});

// GET /api/items/search?title=[partial title name]
// Description: Search for books by partial title match
app.get('/api/items/search', (req, res) => {
  const title = req.query.title.toLowerCase();
  const filteredBooks = books.filter(book => book.toLowerCase().includes(title));
  res.json(filteredBooks);
});

// GET /api/items/:id
// Description: Get a specific item by ID (index in array)
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    res.json(books[id]);
  } else {
    res.status(404).send('Book not found');
  }
});

// POST /api/items
// Description: Add a new item (book) to the collection
app.post('/api/items', (req, res) => {
  const newBook = req.body.title;  // Extracting the title from the request body
  if (newBook) {
    books.push(newBook);  // Add the new book to the array
    res.status(201).json(newBook);  // Respond with the newly added book
  } else {
    res.status(400).send('Title red');  // Error handling for missing title
  }
});

// PUT /api/items/:id
// Description: Update an item (book) by ID (index in array)
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body.title;
  
  if (id >= 0 && id < books.length) {
    if (updatedBook) {
      books[id] = updatedBook;  // Update only if a new title is provided
    }
    res.json(books[id]);  // Respond with the updated or unchanged book
  } else {
    res.status(404).send('Book not found');
  }
});
app.get('/api/items/search', (req, res) => {
  const title = req.query.title.toLowerCase();
  const filteredBooks = books.filter(book => book.toLowerCase().includes(title));
  res.json(filteredBooks);
});
// DELETE /api/items/:id
// Description: Remove an item (book) by ID (index in array)
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    books.splice(id, 1);  // Remove the book from the array
    res.status(204).send();  // Respond with no content (204)
  } else {
    res.status(404).send('Book not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
