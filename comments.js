// Create web server for comments
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const comments = [];


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Create a new comment
app.post('/comments', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).send('Author and text are required');
  }
  const comment = { author, text };
  comments.push(comment);
  res.status(201).send(comment);
});
// Get all comments
app.get('/comments', (req, res) => {
  res.status(200).send(comments);
});
// Get a comment by author
app.get('/comments/:author', (req, res) => {
  const { author } = req.params;
  const comment = comments.find((c) => c.author === author);
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  res.status(200).send(comment);
});
// Update a comment by author
app.put('/comments/:author', (req, res) => {
  const { author } = req.params;
  const { text } = req.body;
  const comment = comments.find((c) => c.author === author);
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  comment.text = text;
  res.status(200).send(comment);
});
// Delete a comment by author
app.delete('/comments/:author', (req, res) => {
  const { author } = req.params;
  const index = comments.findIndex((c) => c.author === author);
  if (index === -1) {
    return res.status(404).send('Comment not found');
  }
  comments.splice(index, 1);
  res.status(204).send();
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Export the app for testing
module.exports = app;
// Export the comments for testing
module.exports = comments;
// Export the app for testing

