import React, { Component } from "react";
import axiosHTTPInstance from "../../services/http/axios.http";
/**
 * @desc Controller, that wrappes requested component and catch all Errors.
 */
class ErrorBoundary extends Component {
  state = {
    isError: false,
    error: null,
  };

  componentDidCatch(error, info) {
    clearTimeout(this.timerOneAtTheTimeId);
    this.timerOneAtTheTimeId = setTimeout(() => {
      this.setState({ error: null, isError: false });
    }, 3000);
    this.setState({ error: error, isError: true });
  }

  componentDidMount() {
    this.reqIntercetor = axiosHTTPInstance.interceptors.request.use((req) => {
      clearTimeout(this.timerOneAtTheTimeId);
      this.setState({ error: null, isError: false });
      return req;
    });

    this.resIntercetor = axiosHTTPInstance.interceptors.response.use(
      null,
      (error) => {
        clearTimeout(this.timerOneAtTheTimeId);
        this.timerOneAtTheTimeId = setTimeout(() => {
          this.setState({ error: null, isError: false });
        }, 3000);
        this.setState({ error: error.response.data, isError: true });
      }
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timerOneAtTheTimeId);
    axiosHTTPInstance.interceptors.request.eject(this.reqIntercetor);
    axiosHTTPInstance.interceptors.response.eject(this.resIntercetor);
  }

  render() {
    if (this.state.hasError) {
      return <div>Oppsssss, something wrong here</div>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
