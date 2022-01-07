//IIFE assigned to new variable
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  const typeColors = {
    'bug': '#a9b720', 'flying': '#a890f0', 'fire': '#f08030',
    'psychic': '#f95887', 'normal': '#a7a877', 'water': '#6790f0', 'grass': '#78c84f',
    'electric': '#f9cf30', 'ice': '#99d7d8', 'fighting': '#c13128',
    'poison': '#9f409f', 'ground': '#e1bf68', 'rock': '#6f5848',
    'ghost': '#705898', 'dark': '#6f5848', 'dragon': '#7138f8',
    'steel': '#b8b8d0', 'fairy': '#efb5bc',
  }

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
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-class");

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //eventlistener on the button - logs the name of the pokemon to the console
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }


  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function(t) { return t.type.name })
    }).catch(function (e) {
      console.error(e);
    });
  }

  //new function called on the eventlistener below (logs details from loadDetails fucntion)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    //clearing existing content
    modalContainer.innerHTML = '';

    //modal structure
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'close';
    closeButtonElement.addEventListener('click', hideModal);

    //content title - display pokemon name
    let titleElement = document.createElement('h2');
    titleElement.classList.add('modaltitle');
    titleElement.innerText = pokemon.name;

    //diplay height and image
    let heightButtonElement = document.createElement('button');
    heightButtonElement.classList.add('heightbtn');
    heightButtonElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightButtonElement);


    // here types is an array eg: ['fire', 'land']
    pokemon.types.forEach(function(t) {
      let typesElement = document.createElement('div');
      typesElement.classList.add('typescontainer');

      let typesButtonElement = document.createElement('button');
      typesButtonElement.classList.add('typebtn')
      typesButtonElement.style.backgroundColor = typeColors[t];
      typesButtonElement.innerText = t;

      typesElement.appendChild(typesButtonElement);
      modal.appendChild(typesElement);
    });

    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //close modal with esc key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //close modal bx clicking outside the modalContainer
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();
//end of iife


//adding getAll to forEach loop - display pokemon on document with name.
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
