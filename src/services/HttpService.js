import axios from "axios";

export default class HttpService {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    return error;
  };

  get = async (url) => {
    return await this.service
      .request({
        timeout: 25000,
        headers: null,
        url: url,
        responseType: "json",
        data: null
      })
      .then(response => {
        return response;
      });

  };
}

