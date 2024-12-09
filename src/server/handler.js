import { classifyImage } from '../services/predictionService.js';
import { savePrediction, getPredictionHistory } from '../services/dataService.js';
import crypto from 'crypto';

async function handlePrediction(request, h) {
  const { image, modelName } = request.payload;  // modelName ditambahkan di payload
  const { models } = request.server.app;

  if (!models[modelName]) {
    return h.response({
      status: 'fail',
      message: `Model dengan nama ${modelName} tidak ditemukan`,
    }).code(404);
  }

  const model = models[modelName];

  // Convert stream to buffer
  const imageBuffer = await new Promise((resolve, reject) => {
    const chunks = [];
    image.on('data', (chunk) => chunks.push(chunk));
    image.on('end', () => resolve(Buffer.concat(chunks)));
    image.on('error', (err) => reject(err));
  });

  const { result, suggestion } = await classifyImage(model, imageBuffer);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = { id, result, suggestion, createdAt };

  await savePrediction(id, data);
  return h.response({
    status: 'success',
    message: 'Prediksi model berhasil',
    data,
  }).code(201);
}


async function getPredictionHistoryHandler(request, h) {
  const history = await getPredictionHistory();
  return h.response({
    status: 'success',
    data: history,
  }).code(200);
}

export default { handlePrediction, getPredictionHistory: getPredictionHistoryHandler };
