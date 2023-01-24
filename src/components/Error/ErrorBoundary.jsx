import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { hasError: false };
    this.state = { error: null, errorInfo: null };

  }

  static getDerivedStateFromError(state, error) {
    // Update state so the next render will show the fallback UI.
    // return { hasError: true };
    return {
      state,
      error

    }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      // You can render any custom fallback UI
      return <div>
        <h1>Something went wrong.</h1>;
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;