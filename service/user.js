const model = require('../db/models');

const createUserService = async (payload) => {
  const { name } = payload;
  try {
    const createUser = await model.User.create({
      name,
    });
    return { service: createUser };
  } catch (error) {
    return { error };
  }
};

module.exports = createUserService;
