/* Task 1.1. Add your movie data here 
   and export it so it's available in server.js 
const theThing = {
    imdbID: "tt0084787",
    Title: "The Thing",
    Released: "1982-06-25",
    Runtime: 109,
    Genres: ["Horror", "Mystery", "Sci-Fi"],
    Directors: ["John Carpenter"],
    Writers: ["Bill Lancaster", "John W. Campbell Jr."],
    Actors: ["Kurt Russell", "Wilford Brimley", "Keith David"],
    Plot: "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    Metascore: 57,
    imdbRating: 8.2
  };
const lordOfTheRings = {
  imdbID: "tt0120737",
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Released: "2001-12-19",
    Runtime: 178,
    Genres: ["Action", "Adventure", "Drama"],
    Directors: ["Peter Jackson"],
    Writers: ["J.R.R. Tolkien", "Fran Walsh", "Philippa Boyens"],
    Actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    Metascore: 92,
    imdbRating: 8.8  
  };
const meaningOfLife = {
  imdbID: "tt0085959",
    Title: "The Meaning of Life",
    Released: "1983-03-31",
    Runtime: 107,
    Genres: ["Comedy", "Musical"],
    Directors: ["Terry Jones", "Terry Gilliam"],
    Writers: ["Graham Chapman", "John Cleese", "Terry Gilliam"],
    Actors: ["John Cleese", "Terry Gilliam", "Eric Idle"],
    Plot: "The comedy team takes a look at life in all of its stages in their own uniquely silly way.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZWJkNGY5MDAtYmVkMy00NzdiLTk5MzctMzA0MjMxMDY2NGYwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Metascore: 72,
    imdbRating: 7.5
  };
  */
const lifeIsBeatutiful = {
   "imdbID": "tt0036502",
  "Title": "Life Is Beautiful",
  "Released": "20 Dec 1997",
  "Runtime": "116 min",
  "Genre": "Comedy, Drama, Romance",
  "Director": "Roberto Benigni",
  "Writer": "Vincenzo Cerami, Roberto Benigni",
  "Actors": "Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini",
  "Plot": "When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor and imagination to protect his son from the dangers around their camp.",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZTBhOGYzZjQtYzE0Mi00MGIwLWE0MWYtNzMxNTM2OTFkM2NjXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore": "58",
  "imdbRating": "8.6"  
};
const avatar = {
   "imdbID":"tt0499549",
  "Title":"Avatar",
  "Released":"18 Dec 2009",
  "Runtime":"162 min",
  "Genre":"Action, Adventure, Fantasy",
  "Director":"James Cameron",
  "Writer":"James Cameron",
  "Actors":"Sam Worthington, Zoe Saldaña, Sigourney Weaver",
  "Plot":"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  "Poster":"https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore":"83",
  "imdbRating":"7.9"  
}
const theThirdMan = {
  "imdbID":"tt0041959",
  "Title":"The Third Man",
  "Released":"01 Feb 1950",
  "Runtime":"104 min",
  "Genre":"Drama, Film-Noir, Mystery",
  "Director":"Carol Reed",
  "Writer":"Graham Greene, Alexander Korda, Carol Reed",
  "Actors":"Orson Welles, Joseph Cotten, Alida Valli",
  "Plot":"Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.",
  "Poster":"https://m.media-amazon.com/images/M/MV5BNGVjMTMxZTQtMmVlNy00YmI0LWJjMDUtYTgyZWU1Njg5ZGRiXkEyXkFqcGc@._V1_SX300.jpg",
  "Metascore":"97",
  "imdbRating":"8.1"
}

const rawMovies = [lifeIsBeatutiful, avatar, theThirdMan, ];

function transformMovieData(data) {
  // 1. Convert the "Released" date (e.g., "20 Dec 1997")
  // This creates a date object and turns it into "1997-12-20T..."
  let fullDate = new Date(data.Released).toISOString();
  // We only want the first 10 characters (the date part)
  let shortDate = fullDate.substring(0, 10);

  // 2. Convert "116 min" into just the number 116
  let minutes = parseInt(data.Runtime);

  // 3. Turn strings with commas into Lists (Arrays)
  let genreArray = data.Genre.split(", ");
  let directorArray = data.Director.split(", ");
  let writerArray = data.Writer.split(", ");
  let actorArray = data.Actors.split(", ");

  // 4. Convert scores from text "58" to actual number 58
  let score = parseInt(data.Metascore);
  let rating = parseFloat(data.imdbRating);

  // 5. Build the final clean version
  let result = {
    imdbID: data.imdbID, // Add the imdbID back into the clean object
    Title: data.Title,
    Released: shortDate,
    Runtime: minutes,
    Genres: genreArray,
    Directors: directorArray,
    Writers: writerArray,
    Actors: actorArray,
    Plot: data.Plot,
    Poster: data.Poster,
    Metascore: score,
    imdbRating: rating
  };

  return result;
}

// 1. Create an empty object (not an array) to store the collection
const movieModel = {};

for (let i = 0; i < rawMovies.length; i++) {
  let rawMovie = rawMovies[i];
  let cleanMovie = transformMovieData(rawMovie);
  
  // Store the movie in the object using the imdbID as the key
  // Syntax: objectName[key] = value;
  movieModel[rawMovie.imdbID] = cleanMovie;
}

module.exports = movieModel; // Export the movie model so it's available in server.js  
