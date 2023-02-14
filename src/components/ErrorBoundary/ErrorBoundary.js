import React from 'react';

class ErrorBoundary extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch( error, errorInfo ) {
    // Catch errors in any components below and re-render with error message
    this.setState( {
      error,
      errorInfo,
    } );
    console.log( error, errorInfo )
    // You can also log error messages to an error reporting service here
  }

  render() {
    const {error, errorInfo} = this.state;
    const {children} = this.props;

    if (errorInfo) {
      // Error path
      return (
        <div style={{
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#000',
        }}
        >
          <h1>Something went wrong.</h1>
          <h2>Please reload page.</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {error && error.toString()}
            <br/>
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
