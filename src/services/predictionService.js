import tf from '@tensorflow/tfjs-node';
import InputError from '../exceptions/InputError.js';

async function classifyImage(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const prediction = model.predict(tensor);

    const scores = prediction.dataSync();
    const predictionScore = Math.max(...scores) * 100;

    const result = predictionScore > 50 ? 'Cancer' : 'Non-cancer';
    const suggestion =
      result === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    return { predictionScore, result, suggestion };
  } catch (error) {
    console.error('Prediction error:', error.message);
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

export { classifyImage };