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

//display as a list
document.write('<ul>')
pokemonList.forEach(function(Pokemon) {
  let pokemonName = pokemonList.name
  let pokemonHeight = pokemonList.height
  let pokemonTypes = pokemonList.types
  document.write('<li>');
  document.write(pokemonName + " - Height: " + pokemonHeight);
 if (pokemonHeight > 1.7) document.write('  - Wow, thats tall!');
 document.write("</li>");
});
document.write("</ul>");
