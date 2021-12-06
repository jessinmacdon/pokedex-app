let pokemonList = [
  {name: 'Mankey', height: 0.5, types: ['flying', 'grass']},
  {name: 'Abra', height: 0.9, types: ['ghost', 'fighting']},
  {name:'Meel', height: 1.1, types: ['electric', 'water']},
  {name: 'Mew', height: 0.4, types: ['dragon', 'psychic']}
];

//display as a list
document.write('<ul>')
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<li>')
  //display all array items .names and heights on DOM (using for loop)
  document.write(pokemonList[i].name + " - Height: " + pokemonList[i].height);
  // for the highest value for height display a string (using conditionals)
  if (pokemonList[i].height > 1.0) document.write("  - Wow, thats tall!");
  document.write("</li>");
}
document.write("</ul>");
