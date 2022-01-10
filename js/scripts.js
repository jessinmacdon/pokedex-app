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
      console.log(details);
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
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

  function showModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-img" src="">');
    imageElement.attr("src", pokemon.imageUrl);

    let heightElement = $('<button class="heightbtn btn-primary">' + "Height: " + pokemon.height + "</button>");
    let weightElement = $('<button class="weightbtn btn-primary">' + "Weight: " + pokemon.weight + "</button>");
    let typesElement = $('<button class="typesbtnelement btn-primary">' + "Types: " + pokemon.types + "</button>");
    /*let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');*/

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);


    $('#pokedex').modal();
  }

  $(document).ready(function(){
    $(".search-pokemon").on("input", function() {
      var value = $(this).val().toLowerCase();
      $(".button-class").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
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
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
