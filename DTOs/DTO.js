const DTO = (data = null, error = null) => {
  const dto = {
    data: data,
    error: error,
  };

  return dto;
};

module.exports = DTO;
