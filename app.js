const datas = require('./data.js');

const filterAnimals = (filterPattern, data) => {
    return data
        .map(country => ({
            ...country,
            people: country.people
                .map(person => ({
                    ...person,
                    animals: person.animals.filter(animal => animal.name.includes(filterPattern))
                }))
                .filter(person => person.animals.length > 0)
        }))
        .filter(country => country.people.length > 0);
}

const countItems = async (data) => {
    return data
        .map(country => ({
            name: `${country.name} [${country.people.length}]`,
            people: country.people.map(person => ({
                name: `${person.name} [${person.animals.length}]`,
                animals: person.animals
            }))
        }));
}

const parseArguments = () => {
    const args = process.argv.slice(2);
    const argsMap = {};
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        argsMap[key.replace('--', '')] = value;
    });
    return argsMap;
}

const main = async () => {
    const args = parseArguments();
    const data = datas.data;

    if ('filter' in args) {
        const filteredData = await filterAnimals(args.filter, data);
        console.log(JSON.stringify(filteredData, null, 2));
    } else if ('count' in args) {
        const countedData = await countItems();
        console.log(JSON.stringify(countedData, null, 2));
    } else {
        console.log('Please provide a valid command (--filter=pattern or --count).');
    }
}

if (require.main === module) {
    main();
}
module.exports = { filterAnimals, countItems };
