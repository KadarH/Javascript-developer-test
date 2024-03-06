const { filterAnimals, parseArguments } = require('./app');

// Mocked data for testing
const mockData = [
    {
        name: 'CountryX',
        people: [
            {
                name: 'Person1',
                animals: [
                    { name: 'Lionry' },
                    { name: 'Tigerry' }
                ]
            },
            {
                name: 'Person2',
                animals: [
                    { name: 'Elephant' },
                    { name: 'Rabbit' }
                ]
            }
        ]
    },
    {
        name: 'CountryY',
        people: [
            {
                name: 'Person3',
                animals: [
                    { name: 'Zebry' },
                    { name: 'Dog' }
                ]
            }
        ]
    }
];

describe('filterAnimals', () => {
    const originalArgv = process.argv;

    afterEach(() => {
        process.argv = originalArgv; // Reset argv after each test
    });
    
    // Test de recherche si on saisi des valeur en Majiscule / Miniscule
    test('is case insensitive when filtering animals', () => {
        const result = filterAnimals('RY', mockData);
        expect(result).toHaveLength(2); // Adjust based on your mockData
    });

    // Test de recherche si on saisi des valeur en Majiscule / Miniscule
    test('filters animals by the given pattern "ry", matching multiple animals', () => {
        const result = filterAnimals('ry', mockData);
        expect(result).toHaveLength(2);
        expect(result[0].people[0].animals).toHaveLength(2);
        expect(result[1].people[0].animals).toHaveLength(1);
    });

    // Test de recherche qui doit renvoyer un tableau vide
    test('returns an empty array when no animals match the pattern', () => {
        const result = filterAnimals('xyz', mockData);
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    // Test de recherche qui doit renvoyer l'element choisi
    test('filters animals by the given pattern "ry"', () => {
        const result = filterAnimals('ry', mockData);
        expect(result[0].people[0].animals[0].name).toEqual('Lionry');
    });

    // Tester les caractère speciales
    test('handles special characters in pattern correctly', () => {
        const specialCharacterData = [{
            name: 'SpecialCountry',
            people: [
                {
                    name: 'SpecialPerson',
                    animals: [
                        { name: 'Lionry*' },
                        { name: 'Tiger?ry' }
                    ]
                }
            ]
        }];
        const result = filterAnimals('*', specialCharacterData);
        expect(result[0].people[0].animals).toHaveLength(1);
        const result2 = filterAnimals('?', specialCharacterData);
        expect(result2[0].people[0].animals).toHaveLength(1);
    });

    // Tester la presence de l'argument et sa valeur
    test('return the message when parses --filter argument correctly', () => {
        const result = filterAnimals('ry', mockData);
        process.argv = ['node', 'app.js', '--filter=ry'];
        const args = parseArguments();

        expect(args).toHaveProperty('filter', 'ry');
    });

    // Tester la presence de l'argument count
    test('parses --count argument correctly', () => {
        process.argv = ['node', 'app.js', '--count'];
        const args = parseArguments();
        expect(args).toHaveProperty('count', '');
    });

    // Tester la presence de l'argument et sa valeur filter et count
    test('handles multiple arguments correctly', () => {
        process.argv = ['node', 'app.js', '--filter=ry', '--count'];
        const args = parseArguments();
        expect(args).toHaveProperty('filter', 'ry');
        expect(args).toHaveProperty('count', '');
    });

});
