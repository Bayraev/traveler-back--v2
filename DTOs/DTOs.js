const DTO = (data = null, error = null) => {
  const dto = {
    data: data,
    error: error,
  };

  return dto;
};

const friendDTO = (user) => {
  const dto = {
    id: user._id,
    username: user.username,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };

  return dto;
};

module.exports = { DTO, friendDTO };
