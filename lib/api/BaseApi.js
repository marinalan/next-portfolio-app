import axios from 'axios';

class BaseApi {

  constructor(accessToken, subPath) {
    this.config = {}

    if (accessToken) {
      this.config.headers = {
        authorization: `Bearer ${accessToken}`
      }
    }
    this.apiUrl = process.env.PORTFOLIO_API_URL + subPath;
  }

  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`)
  }

  create(data) {
    return axios.post(this.apiUrl, data, this.config); 
  }

  update(id, data) {
    return axios.patch(`${this.apiUrl}/${id}`, data, this.config); 
  }

  delete(id) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config); 
  }

	getByUser() {
    return axios.get(`${this.apiUrl}/me`, this.config);
	}
}

export default BaseApi;
