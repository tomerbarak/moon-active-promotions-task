/**
 * Http convenience methods. This codebase should be pure and not dependent on the other app's modules
 */
export default class HttpUtilsService {
  static getHttpData(url, method, headers, body) {
    return {
      url,
      method,
      headers,
      data: body
    };
  }
}
