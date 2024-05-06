let nameH1;
let releaseDateSpan;
let prodSpan;
let dirSpan;
let charUl;
let planetUl;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#film");
  releaseDateSpan = document.querySelector("span#date");
  prodSpan = document.querySelector("span#producer");
  dirSpan = document.querySelector("span#director");
  planetUl = document.querySelector("#planets>ul");
  charUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
    let film = await fetchFilm(id);
  try {
    film.characters = await fetchCharacters(film);
    film.planets = await fetchPlanets(film);
    r
  } catch (err) {
    console.log(`Error reading film ${id} data.`, err.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  const filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

//workign this out
async function fetchHomeworld(film) {
  const url = `${baseUrl}/films/${film.id}/homeworld`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  releaseDateSpan.textContent = film?.release_date;
  prodSpan.textContent = film?.producer;
  dirSpan.textContent = film?.director;

  const charLis = film?.characters?.map(character =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`);
      charUl.innerHTML = charLis.join("");
      
  
};