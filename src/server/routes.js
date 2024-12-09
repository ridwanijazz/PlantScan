import Joi from 'joi';
import handler from './handler.js';

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: handler.handlePrediction,
    options: {
      validate: {
        headers: Joi.object({
          'content-type': Joi.string()
            .required()
            .pattern(/multipart\/form-data/, 'multipart/form-data'),
        }).unknown(),
        payload: Joi.object({
          modelName: Joi.string().valid('model1', 'model2', 'model3').required(),  // Model yang bisa dipilih
        }),
      },
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1 * 1024 * 1024,
        output: 'stream',
        parse: true,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: handler.getPredictionHistory,
  },
];

export default routes;