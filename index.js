const apiKey = "cb59c03e9331d561c08052d8d68ac7d8";
const resultsContainer = document.getElementById("results");
const loader = document.getElementById("loader");

function searchMovie() {
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;

  resultsContainer.innerHTML = "";
  loader.classList.remove("hidden");

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      loader.classList.add("hidden");

      if (!data.results || data.results.length === 0) {
        resultsContainer.innerHTML = "<p>No movies found.</p>";
        return;
      }

      data.results.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image";

        card.innerHTML = `
          <img src="${poster}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
        `;
        resultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      loader.classList.add("hidden");
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Failed to fetch data.</p>";
    });
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};
// Fetch Trending
function fetchTrendingMovies() {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const trendingSection = document.getElementById("trending-section");
      data.results.slice(0, 8).forEach(movie => {
        trendingSection.innerHTML += renderCard(movie);
      });
    });
}

// Fetch Upcoming
function fetchUpcomingMovies() {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const upcomingSection = document.getElementById("upcoming-section");
      data.results.slice(0, 8).forEach(movie => {
        upcomingSection.innerHTML += renderCard(movie);
      });
    });
}

// Render movie card
function renderCard(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return `
    <div class="movie-card">
      <img src="${poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    </div>
  `;
}

// Call on load
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  fetchTrendingMovies();
  fetchUpcomingMovies();
};
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
