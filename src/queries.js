import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
// { humanId: 2, fname: 'Jane', lname: 'Doe', email: 'jdoe@gmail.com' }
export const query1 = await Human.findByPk(2);
console.log(query1)

// Get the first animal whose species is "fish"
// {
//     animalId: 5,
//     name: 'Bubbles',
//     species: 'fish',
//     birthYear: null,
//     humanId: 4
//   }
export const query2 = await Animal.findOne({
    where: 
        { species: 'fish'}
});
console.log(query2)

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
    where:
    { human_id: '5'}
})
console.log(query3)

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
    where: 
    { birthYear: { [Op.gt]: 2015 }}
});
console.log(query4)

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
    where: 
    { fname: { [Op.like]: 'J%' }}
});
console.log(query5)

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
    where: 
    { birthYear: { [Op.is]: null }}
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
    where: {
        [Op.or]: [
            { species: 'fish' },
            { species: 'rabbit' }
        ]
    }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
    where: {
    email: { [Op.notLike]: '%gmail%'}
    }    
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
// export async function printHumansAndAnimals() {
//     const humans = await Human.findAll({ include: Animal })

// }
export async function printHumansAndAnimals() {
    try {
      const humans = await Human.findAll({ include: Animal });
      console.log(humans)
      let list = []
  
      humans.forEach((human) => {
        list.push(`${human.fname}`);
        human.Animals.forEach((animal) => {
            if (human.human_id === animal.human_id) {
                list.push(`${animal.name}`);
            }
        });
        console.log(list)
        return list;
      });
    } catch (error) {
      console.error('Error fetching humans and animals:', error);
    }
  }

// export async function printHumansAndAnimals() {
//       const humans = await Human.findAll({ include: Animal });
//       console.log(humans)
//       let list = []
  
//       humans.forEach((human) => {
//         list.push(`${human.fname}`);
//         human.Animals.forEach((animal) => {
//           list.push(`${animal.name}`);
//         });
//       });
//       return list;
//   }

printHumansAndAnimals();

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {}
