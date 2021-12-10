//IIFE assigned to new variable
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Mankey',
      height: 0.5,
      types: ['flying', 'grass']
    },
    {
      name: 'Abra',
      height: 0.9,
      types: ['ghost', 'fighting']
    },
    {
      name:'Meel',
      height: 1.1,
      types: ['electric', 'water']
    },
    {
      name: 'Mew',
      height: 0.4,
      types: ['dragon', 'psychic']
    }
  ];

  //returning pokemon list
  function getAll() {
    return pokemonList;
  }

  // addiing new pokemnon (item) to array
  function add(pokemon) {
    pokemonList.push(pokemon)
  }

  return {
    getAll : getAll,
    add: add
  };
})();
//end of iife


//display as a list
document.write('<ul>')
//adding getAll to forEach loop
pokemonRepository.getAll().forEach(function(pokemon){
  let pokemonName = pokemon.name
  let pokemonHeight = pokemon.height
  let pokemonTypes = pokemon.types
  //print pkemon list
  document.write('<li>');
  document.write(pokemonName + " - Height: " + pokemonHeight);
  //adding conditional
  if (pokemonHeight > 1) document.write("  - Wow, thats tall!");
  document.write("</li>");
});
document.write("</ul>");
