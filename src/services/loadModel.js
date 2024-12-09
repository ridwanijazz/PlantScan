import tf from '@tensorflow/tfjs-node';
import dotenv from 'dotenv';

dotenv.config();

// Fungsi untuk memuat model berdasarkan nama atau ID
async function loadModels() {
  const modelUrls = {
    model1: process.env.MODEL_URL_1 || '',  // URL model pertama
    model2: process.env.MODEL_URL_2 || '',  // URL model kedua
    model3: process.env.MODEL_URL_3 || '',  // URL model ketiga
  };

  const models = {};

  for (const [key, modelUrl] of Object.entries(modelUrls)) {
    try {
      models[key] = await tf.loadGraphModel(modelUrl);
      console.log(`Model ${key} loaded successfully.`);
    } catch (error) {
      console.error(`Error loading model ${key}:`, error);
      throw new Error(`Failed to load the TensorFlow model ${key}. Check the MODEL_URL or network connectivity.`);
    }
  }

  return models;
}

export { loadModels };
