const plantController = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/api/plants/identify',
        handler: plantController.identifyPlant,
        options: {
            description: 'Mendeteksi tanaman berdasarkan gambar',
            notes: 'Mengirimkan gambar dalam format base64 untuk identifikasi tanaman.',
            tags: ['api', 'plants'],
        },
    }
];

module.exports = routes;
