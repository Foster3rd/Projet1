let nameH1;
let climate;
let surface_water;
let diameter;
let terrain;
let rotation_period;
let gravity;
let orbital_period;
let population;
let filmsDiv;
let charUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;
///[{"id":1,"climate":"arid","surface_water":"1","name":"Tatooine","diameter":"10465","rotation_period":"23"
///,"terrain":"desert","gravity":"1 standard","orbital_period":"304","population":"200000"},

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');

    climate = document.querySelector('span#climate');
    surface_water = document.querySelector('span#surface_water');
    diameter = document.querySelector('span#diameter');
    terrain = document.querySelector('span#terrain');
    rotation_period = document.querySelector('span#rotation_period');
    gravity = document.querySelector('span#gravity');
    orbital_period = document.querySelector('span#orbital_period');
    population = document.querySelector('span#population');
    filmsUl = document.querySelector('#films>ul');
    charUl = document.querySelector("#characters>ul");

    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

  async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanets(id)
      planet.character = await fetchCharacters(planet)
      planet.films = await fetchFilms(planet) ///NOT DONE
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }
//   async function fetchCharacters(film) {
//     const url = `${baseUrl}/films/${film.id}/characters`;
//     const characters = await fetch(url).then((res) => res.json());
//     return characters;
//   }
  async function fetchCharacters(planet) {
    let planetUrl = `${baseUrl}/planets/${planet.id}/characters`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }
  
async function fetchPlanets(id) {
  let planetsUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetsUrl)
    .then(res => res.json())
}
async function fetchHomeworld(character) {
    const url = `${baseUrl}/planets/${character?.homeworld}`;
    const planet = await fetch(url)
      .then(res => res.json())
    return planet;
  }
  async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    return await fetch(url)
      .then(res => res.json())
  }
///[{"id":1,"climate":"arid","surface_water":"1","name":"Tatooine","diameter":"10465","rotation_period":"23"
///,"terrain":"desert","gravity":"1 standard","orbital_period":"304","population":"200000"},
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    surface_water.textContent = planet?.surface_water;
    climate.textContent = planet?.climate;
    
    diameter.textContent = planet?.diameter;
    rotation_period.textContent = planet?.rotation_period;
    terrain.textContent = planet?.terrain;
    gravity.textContent = planet?.gravity;
    orbital_period.textContent = planet?.orbital_period;
    population.textContent = planet?.population;
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");


    const charLis = planet?.character?.map(character =>
        `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`);
        charUl.innerHTML = charLis.join("");
//homeworldSpan.innerHTML = `<a href="/planet.html?id=${planet?.homeworld.id}">${planet?.homeworld.name}</a>`;
    //const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    //filmsUl.innerHTML = filmsLis.join("");
  }

