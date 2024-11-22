const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const cors = require('cors');
const plantRoutes = require('./routes');

// Memuat variabel dari .env
dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
    });

    // Menggunakan CORS untuk memungkinkan akses dari domain lain
    server.ext('onRequest', (request, h) => {
        request.headers['Access-Control-Allow-Origin'] = '*';
        return h.continue;
    });

    // Menambahkan rute API
    server.route(plantRoutes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init();
