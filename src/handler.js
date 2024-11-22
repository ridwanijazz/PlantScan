const mlService = require('./app');

const identifyPlant = async (request, h) => {
    try {
        // Mengambil file gambar yang diupload
        const imageFile = request.payload.imagefile;
        
        // Menyimpan gambar di server
        const imagePath = './uploads/' + imageFile.hapi.filename;
        const fs = require('fs');
        const writeStream = fs.createWriteStream(imagePath);
        writeStream.write(imageFile._data);
        writeStream.end();

        // Memanggil service untuk memprediksi gambar
        const result = await mlService.predictImage(imagePath);

        // Mengembalikan hasil prediksi
        return h.response({ success: true, prediction: result }).code(200);
    } catch (error) {
        return h.response({ success: false, message: error.message }).code(500);
    }
};

module.exports = { identifyPlant };
