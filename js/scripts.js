//IIFE assigned to new variable
let pokemonRepository = (function () {
  let repository = [
    {
      name: 'Mankey',
      height: 0.5,
      types: ['flying', 'grass'],
    },
    {
      name: 'Abra',
      height: 0.9,
      types: ['ghost', 'fighting'],
    },
    {
      name:'Meel',
      height: 1.1,
      types: ['electric', 'water'],
    },
    {
      name: 'Mew',
      height: 0.4,
      types: ['dragon', 'psychic'],
    }
  ];

  //returning pokemon list
  function getAll() {
    return repository;
  }

  // addiing new pokemnon (item) to array
  function add(pokemon) {
    repository.push(pokemon);
  }

  //new function called on the eventlistener below (logs pokemon.name to console)
  function showDetails(pokemon) {
    console.log(pokemon.name);
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
    button.addEventListener("click", function () {
        showDetails(pokemon);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
//end of iife


//adding getAll to forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
