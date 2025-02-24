const sharp = require('sharp');
const errorHandler = require('./errorHandler');

const validateImageDimensions = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, 'Изображение обязательно'));
    }

    // const metadata = await sharp(req.file.path).metadata();
    // if (metadata.width !== metadata.height) {
    //   require('fs').unlinkSync(req.file.path);
    //   return next(errorHandler(400, 'Изображение должно быть квадратным (1:1)'));
    // }

    next();
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

module.exports = validateImageDimensions;
