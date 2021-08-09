db = new Mongo().getDB('fakedata');

db.createCollection('fakedatas', { capped: false });

db.fakedatas.insert([
    { username: 'leonardo', password: '12345' },
    { username: 'pepe', password: '67890' },
]);
