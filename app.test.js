const { filterAnimals } = require('./app');

// Mocked data for testing
const mockData = [
    {
        name: 'Country1',
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
        name: 'Country2',
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
    test('is case insensitive when filtering animals', () => {
        const result = filterAnimals('ry', mockData);
        expect(result).toHaveLength(expectedLength); // Adjust based on your mockData
    });
});
