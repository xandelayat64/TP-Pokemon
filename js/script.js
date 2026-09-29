const API_URL = "https://tyradex.app/api/v1";

const select = document.getElementById("generation-select");
const list = document.getElementById("pokemon-list");

function createCard(pokemon) {
  const types = pokemon.types
    ? pokemon.types.map((type) => type.name).join(" / ")
    : "";

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_id}.png`;

  const card = document.createElement("article");
  card.innerHTML = `
    <figure>
      <picture>
        <img src="${image}" alt="Image ${pokemon.name.fr}" loading="lazy" />
      </picture>
      <figcaption>
        <span class="types">${types}</span>
        <h2>${pokemon.name.fr}</h2>
        <ol>
          <li>Points de vie : ${pokemon.stats.hp}</li>
          <li>Attaque : ${pokemon.stats.atk}</li>
          <li>Défense : ${pokemon.stats.def}</li>
          <li>Attaque spécial : ${pokemon.stats.spe_atk}</li>
          <li>Vitesse : ${pokemon.stats.vit}</li>
        </ol>
      </figcaption>
    </figure>
  `;
  return card;
}

async function loadData(generation) {
  try {
    const response = await fetch(`${API_URL}/gen/${generation}`);
    const data = await response.json();

    const pokemons = Array.isArray(data) ? data : data.pokemons;

    list.innerHTML = "";

    pokemons.forEach((pokemon) => {
      list.appendChild(createCard(pokemon));
    });
  } catch (error) {
    console.error("Impossible de charger les Pokémon :", error);
  }
}


loadData(1);

select.addEventListener("change", () => {
  console.log(select.value);
  loadData(select.value);
});