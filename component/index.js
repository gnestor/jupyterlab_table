import React from 'react';
import ReactDOM from 'react-dom';

export default class Component extends React.Component {

  render() {
      return (
        <div>
          {JSON.stringify(this.props.data)}
        </div>
      );
  }

}
