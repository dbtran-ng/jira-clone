const { default: Axios } = require('axios');
const { DOMAIN_CYBERBUG, TOKEN } = require('../utils/constants/settingSystem');
export class BaseService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: 'PUT',
      data: model,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) }, //JWT token
    });
  };
  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: 'POST',
      data: model,
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) }, //JWT token
    });
  };
  get = (url) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) }, //JWT token
    });
  };
  delete = (url) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) }, //JWT token
    });
  };
}
