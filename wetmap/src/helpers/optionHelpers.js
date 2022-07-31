export default function filterCreatures(newParams, array) {
    let newArr = [];

    array.forEach((animal) => {
      if ((animal.Animal.toLowerCase()).includes(newParams)) {
        newArr.push(animal);
      }
    });
    return newArr;
  }
