import React from 'react';
import './index.css';

export default class JSONTableComponent extends React.Component {

  render() {
      return (
        <div className="JSONTable">
          {JSON.stringify(this.props.data)}
        </div>
      );
  }

}
