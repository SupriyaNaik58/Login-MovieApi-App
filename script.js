const API_KEY = "5a7b5b1f";  // 🔑 Replace with your OMDb API key
const BASE_URL = "https://www.omdbapi.com/?apikey=" + API_KEY + "&s=";

// Login function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  try {
    const res = await fetch("users.json");
    const users = await res.json();

    const userFound = users.find(
      (u) => u.email === email && u.password === password
    );

    if (userFound) {
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("moviePage").style.display = "block";

      searchMovie(); // load default movies
    } else {
      errorMsg.textContent = "Invalid email or password!";
    }
  } catch (err) {
    console.error("Error:", err);
    errorMsg.textContent = "Error loading user data!";
  }
}

// Fetch movies from OMDb
async function searchMovie() {
  const query = document.getElementById("searchBox").value.trim(); 
  const list = document.getElementById("movieList");
  list.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(BASE_URL + encodeURIComponent(query));
    const data = await res.json();

    list.innerHTML = "";

    if (data.Search) {
      data.Search.forEach((movie) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
          <h4>${movie.Title}</h4>
          <p>${movie.Year}</p>
        `;
        list.appendChild(li);
      });
    } else {
      list.innerHTML = "";
    }
  } catch (err) {
    console.error("Error fetching movies:", err);
    list.innerHTML = "<p>Error fetching movies</p>";
  }
}
// Search
function search(){
    document.getElementById("moviePage").style.display = "flex";
}

// Logout
function logout() {
  document.getElementById("moviePage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
}