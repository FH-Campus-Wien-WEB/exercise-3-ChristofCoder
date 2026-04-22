import { ElementBuilder, ParentChildBuilder } from "./builders.js";

class ParagraphBuilder extends ParentChildBuilder {
  constructor() {
    super("p", "span");
  }
}

class ListBuilder extends ParentChildBuilder {
  constructor() {
    super("ul", "li");
  }
}

function formatRuntime(runtime) {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime % 60;
  return hours + "h " + minutes + "m";
}

function appendMovie(movie, element) {
  new ElementBuilder("article").id(movie.imdbID)
          .append(new ElementBuilder("img").with("src", movie.Poster))
          .append(new ElementBuilder("h1").text(movie.Title))
          .append(new ElementBuilder("p")
              .append(new ElementBuilder("button").text("Edit")
                    .listener("click", () => location.href = "edit.html?imdbID=" + movie.imdbID)))
          .append(new ParagraphBuilder().items(
              "Runtime " + formatRuntime(movie.Runtime),
              "\u2022",
              "Released on " +
                new Date(movie.Released).toLocaleDateString("en-US")))
          .append(new ParagraphBuilder().childClass("rating").items(
              "IMDb " + movie.imdbRating,
              "Metascore " + movie.Metascore))
          .append(new ParagraphBuilder().childClass("genre").items(movie.Genres))
          .append(new ElementBuilder("p").text(movie.Plot))
          .append(new ElementBuilder("h2").pluralizedText("Director", movie.Directors))
          .append(new ListBuilder().items(movie.Directors))
          .append(new ElementBuilder("h2").pluralizedText("Writer", movie.Writers))
          .append(new ListBuilder().items(movie.Writers))
          .append(new ElementBuilder("h2").pluralizedText("Actor", movie.Actors))
          .append(new ListBuilder().items(movie.Actors))
          .appendTo(element);
}

function loadMovies(genre) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const mainElement = document.querySelector("main");

    while (mainElement.childElementCount > 0) {
      mainElement.firstChild.remove()
    }

    if (xhr.status === 200) {
      const movies = JSON.parse(xhr.responseText)
      for (const movie of movies) {
        appendMovie(movie, mainElement)
      }
    } else {
      mainElement.append(`Daten konnten nicht geladen werden, Status ${xhr.status} - ${xhr.statusText}`);
    }
  }

  const url = new URL("/movies", location.href)
  /* Task 1.4. Add query parameter to the url if a genre is given */
  if (genre) {
    // This adds "?genre=Drama" to the URL. If genre==null, this if statement is not executed
    //  and no query parameter is added, so the server will return all movies.
    url.searchParams.set('genre', genre);
    /*
    Using url.searchParams.set() is much safer than manual string concatenation 
    (like url + "?genre=" + genre). It automatically handles URL encoding 
    so if your genre is "Sci-Fi" or "Romance & Drama", the spaces and special 
    characters are converted into a format the browser and server can understand 
    perfectly (e.g., Sci-Fi becomes Sci-Fi but & becomes %26).
    */ 
  }
  xhr.open("GET", url)
  xhr.send()
}





window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const listElement = document.querySelector("nav>ul");

    if (xhr.status === 200) {
      /* Task 1.3. Add the genre buttons to the listElement and 
         initialize them with a click handler that calls the 
         loadMovies(...) function above. */

      const genres = JSON.parse(xhr.responseText);

      // 1. Clear the list first (optional but good practice)
      listElement.innerHTML = '';

      // 2. Helper to create a list item with a button
      const addGenreItem = (label, value) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = label;
        
        btn.addEventListener("click", () => {
          // Clear current movies and load new selection
          document.querySelector("main").innerHTML = "";
          loadMovies(value);
        });
        
        li.appendChild(btn);
        listElement.appendChild(li);
      };

      // 3. Add the "All" button at the beginning
      addGenreItem("All", null);

      // 4. Add each genre returned from the server
      genres.forEach(genre => {
        addGenreItem(genre, genre);
      });

      /* When a first button exists, we click it to load all movies. */
      const firstButton = document.querySelector("nav button");
      if (firstButton) {
        firstButton.click();
      }
    } else {
      document.querySelector("body").append(`Daten konnten nicht geladen werden, Status ${xhr.status} - ${xhr.statusText}`);
    }
  };
  xhr.open("GET", "/genres");
  xhr.send();
};
