db = new Mongo().getDB('fakedata');

db.createCollection('fakedatas', { capped: false });

db.fakedatas.insert([
    { name: 'leonardo', password: '12345' },
    { name: 'pepe', password: '67890' },
]);
