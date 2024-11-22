const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

// Fungsi untuk memuat model dan memprediksi gambar
const predictImage = async (imagePath) => {
    try {
        // Memuat model MobileNet
        const model = await mobilenet.load();

        // Membaca gambar
        const image = tf.node.decodeImage(require('fs').readFileSync(imagePath));

        // Melakukan prediksi pada gambar
        const predictions = await model.classify(image);

        // Menampilkan hasil prediksi
        return predictions[0]; // Mengembalikan prediksi pertama
    } catch (error) {
        throw new Error('Error during prediction: ' + error.message);
    }
};

module.exports = { predictImage };
