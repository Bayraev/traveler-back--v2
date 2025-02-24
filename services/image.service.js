const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class ImageService {
  async uploadMultipleImages(files) {
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('key', process.env.IMGBB_API_KEY); // Replace with your ImgBB API key
          formData.append('image', file.buffer.toString('base64')); // Convert buffer to base64

          const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: { ...formData.getHeaders() },
          });

          console.log('response in quest.controller.js', response);

          return response.data.data.url; // Return the uploaded image URL
        }),
      );

      return uploadedImages;
    } catch (error) {
      throw new Error(`Не удалось загрузить изображения: ${error.message}`);
    }
  }
}

module.exports = new ImageService();
