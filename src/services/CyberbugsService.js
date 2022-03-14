const { default: Axios } = require('axios');
const { DOMAIN_CYBERBUG } = require('../utils/constants/settingSystem');
export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: 'POST',
      data: userLogin,
    });
  },
  getAllProjectCategory: (projectCategory) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: 'GET',
    });
  },
};
