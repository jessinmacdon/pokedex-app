//IIFE assigned to new variable
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
      item.types = details.types;
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
    titleElement.innerText = pokemon.name;

    //diplay height and image
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
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
