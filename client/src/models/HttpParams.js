export default class HttpParams {
  constructor() {
    this.headers = {};
    this.body = {};
    this.responseType = 'json';
  }

  constractor(params) {
    this.requestType = params.requestType;
    this.body = params.body;
    this.url = params.url;
    this.headers = params.headers;
    this.returnFullResponse = params.returnFullResponse;
    this.responseType = params.responseType;
  }
}
