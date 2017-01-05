import React from 'react';

export default class JSONTable extends React.Component {

  render() {
      return (
        <div>
          {JSON.stringify(this.props.data)}
        </div>
      );
  }

}
