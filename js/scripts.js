//IIFE assigned to new variable
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.querySelector('#pokedex');
  const typeColors = {
    bug: '#737d00',
    flying: '#835fdb',
    fire: '#ba5d00',
    psychic: '#eb0065',
    normal: '#797b00',
    water: '#2d73e2',
    grass: '#418600',
    electric: '#8e01fd',
    ice: '#008485',
    fighting: '#c13128',
    poison: '#9f409f',
    ground: '#654320',
    rock: '#6f5848',
    ghost: '#705898',
    dark: '#6f5848',
    dragon: '#7138f8',
    steel: '#73739a',
    fairy: '#bb5667'
  };

  //returning pokemon list
  function getAll() {
    return pokemonList;
  }

  // addiing new pokemnon (item) to array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // new function for adding class, ul and li items
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');

    button.setAttribute('data-target', '#pokedex');
    button.setAttribute('data-toggle', 'modal');

    button.innerText = pokemon.name;
    button.classList.add('button-class');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //eventlistener on the button - logs the name of the pokemon to the console
    button.addEventListener('click', function() {
      showDetails(pokemon, modal);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map(function(t) {
          return t.type.name;
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //new function called on the eventlistener below (logs details from loadDetails fucntion)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalBody.innerHTML = '';
    modalTitle.innerHTML = '';

    let titleElement = document.createElement('h1');
    titleElement.classList.add('text-capitalize');
    titleElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = 'the pokemon image on a lightblue background';

    let heightElement = document.createElement('button');
    heightElement.classList.add('btn-primary');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('button');
    weightElement.classList.add('btn-secondary');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let typesElement = document.createElement('div');
    typesElement.classList.add('typesElementContainer');

    pokemon.types.forEach(function(t) {
      let typesButtonElement = document.createElement('button');
      typesButtonElement.classList.add('btn-info');
      typesButtonElement.style.backgroundColor = typeColors[t];
      typesButtonElement.innerText = 'Type: ' + t;

      typesElement.appendChild(typesButtonElement);
    });

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  // adding search to page
  $(document).ready(function() {
    $('#search-pokemon').on('input', function() {
      var value = $(this)
        .val()
        .toLowerCase();
      $('.group-list-item').filter(function() {
        $(this).toggle(
          $(this)
            .text()
            .toLowerCase()
            .indexOf(value) > -1
        );
      });
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

// IIFE ends here

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
