const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

/* Task 1.2: Add a GET /genres endpoint:
   This endpoint returns a sorted array of all the genres of the movies
   that are currently in the movie model.
*/
app.get('/genres', (req, res) => {
    // 1. Create a Set to store unique genres
    const genreSet = new Set();
    // Get the array of movie objects from the model
    const movies = Object.values(movieModel);

    // 2. Loop through each movie and its genre array
   movies.forEach(movie => {
        // Use 'Genres' with a capital G to match your transformMovieData function
        if (movie.Genres && Array.isArray(movie.Genres)) {
            movie.Genres.forEach(genre => genreSet.add(genre));
        }
    });

    const sortedGenres = Array.from(genreSet).sort((a, b) => a.localeCompare(b));
    res.json(sortedGenres);
});

/* Task 1.4: Extend the GET /movies endpoint:
   When a query parameter for a specific genre is given, 
   return only movies that have the given genre
 */

app.get('/movies', function (req, res) {
  let movies = Object.values(movieModel)

  /* Task 1.4. Add code here to filter the movies by genre if a query parameter is given */
  // Check if the 'genre' query parameter exists (e.g., /movies?genre=Action)
  const filterGenre = req.query.genre;

  if (filterGenre) {
    movies = movies.filter(movie => 
      // Ensure movie.Genres exists and is an array/string containing the genre
      movie.Genres && movie.Genres.includes(filterGenre)
    );
  }

  res.send(movies);
})
/*
IMPORTANT: Delete the second app.get('/movies', ...) block below 
that doesn't have the filtering logic, otherwise it might cause confusion!
app.get('/movies', function (req, res) {
  let movies = Object.values(movieModel)
  res.send(movies);
})
*/
// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID
  const exists = id in movieModel
 
  if (exists) {
    res.send(movieModel[id])
  } else {
    res.sendStatus(404)    
  }
})

app.put('/movies/:imdbID', function(req, res) {

  const id = req.params.imdbID
  const exists = id in movieModel

  movieModel[req.params.imdbID] = req.body;
  
  if (!exists) {
    res.status(201)
    res.send(req.body)
  } else {
    res.sendStatus(200)
  }
  
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")