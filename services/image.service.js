const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class ImageService {
  /**
   * Uploads single image to ImgBB
   * @param {File} file - Image file from multer
   * @returns {Promise<string>} Uploaded image URL
   */
  async uploadSingleImage(file) {
    try {
      const formData = new FormData();
      formData.append('key', process.env.IMGBB_API_KEY);
      formData.append('image', file.buffer.toString('base64'));

      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: { ...formData.getHeaders() },
      });

      if (!response.data.success) {
        throw new Error('Image upload failed');
      }

      return response.data.data.url;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

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
