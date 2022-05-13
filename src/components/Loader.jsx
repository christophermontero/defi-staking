import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: '2rem' }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loader;
