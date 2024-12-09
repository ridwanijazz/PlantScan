import 'dotenv/config.js';
import Hapi from '@hapi/hapi';
import routes from './routes.js';
import { loadModel } from '../services/loadModel.js';
import InputError from '../exceptions/InputError.js';

const init = async () => {
    const server = Hapi.server({
      port: process.env.PORT || 8080,
      host: '0.0.0.0',
      routes: {
        cors: {
          origin: ['*'],
        },
        payload: {
          maxBytes: 1000000,
        },
      },
    });
  
    try {
      const models = await loadModels(); // Memuat semua model
      server.app.models = models;  // Menyimpan semua model di dalam server.app.models
      console.log('All models loaded successfully.');
    } catch (error) {
      console.error('Error loading models:', error.message);
      process.exit(1);
    }
  
    server.route(routes);
  
    server.ext('onRequest', (request, h) => {
      console.log(`[${new Date().toISOString()}] Incoming request: ${request.method.toUpperCase()} ${request.path}`);
      return h.continue;
    });
  
    server.ext('onPreResponse', (request, h) => {
      const { response } = request;
  
      if (response instanceof InputError) {
        return h.response({
          status: 'fail',
          message: response.message,
        }).code(response.statusCode || 400);
      }
  
      if (response.isBoom) {
        const statusCode = response.output.statusCode;
  
        if (statusCode === 404) {
          return h.response({
            status: 'fail',
            message: 'Endpoint tidak ditemukan',
          }).code(404);
        }
  
        if (statusCode === 413) {
          return h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
          }).code(413);
        }
  
        return h.response({
          status: 'fail',
          message: response.message || 'Terjadi kesalahan pada server',
        }).code(statusCode);
      }
  
      return h.continue;
    });
  
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};
  
init();