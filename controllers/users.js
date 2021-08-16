const createUserService = require('../service/user');

const createUser = async (request, response) => {
  try {
    const { service, error } = await createUserService(request.body);
    if (error) throw new Error('Create User Error');
    if (service) {
      const { id, name } = service;
      return response.status(200).json({
        id,
        name,
        status_code: 200,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: 'Internal server error.',
    });
  }
};
// const userExist =
module.exports = createUser;
