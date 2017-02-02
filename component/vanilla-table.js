import React from 'react';
import ReactDOM from 'react-dom';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when 
// built with @jupyterlabextension-builder 
import infer from 'jsontableschema/lib/infer';
// import { infer } from 'jsontableschema';
import './index.css';

function inferSchema(data) {
  const headers = data.reduce((result, row) => [...new Set([...result, ...Object.keys(row)])], []);
  const values = data.map(row => Object.values(row));
  return infer(headers, values);
}

export default class VanillaTable extends React.Component {

  render() {
    let { schema, data } = this.props;
    if (!schema) schema = inferSchema(data);
    return (
      <table className="dataframe">
        <thead>
          <tr className="header">
            {
              schema.fields.map((field, index) => (
                <th key={index}>{field.name}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.map((row, rowIndex) =>
              <tr key={rowIndex}>
                {
                  schema.fields.map((field, index) => (
                    <td key={index}>{row[field.name]}</td>
                  ))
                }
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }

}
