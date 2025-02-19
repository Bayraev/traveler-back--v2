const createHttpError = require('http-errors');
const sharp = require('sharp');

const validateImageDimensions = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = createHttpError(400, 'Изображение обязательно');
      return next(error);
    }

    const metadata = await sharp(req.file.path).metadata();
    if (metadata.width !== metadata.height) {
      require('fs').unlinkSync(req.file.path);
      return next(createHttpError(400, 'Изображение должно быть квадратным (1:1)'));
    }

    next();
  } catch (error) {
    next(createHttpError(400, error.message)); // Ensuring it's passed to errorHandler
  }
};

module.exports = validateImageDimensions;
