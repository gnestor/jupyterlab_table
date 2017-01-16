import React from 'react';
import {
  Table, 
  Column, 
  Cell
} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import { infer } from 'jsontableschema';
import './index.css';

const ROW_HEIGHT = 34;

function inferSchema(data) {
  const headers = data.reduce((result, row) => [...new Set([...result, ...Object.keys(row)])], []);
  const values = data.map(row => Object.values(row));
  return infer(headers, values);
}

export default class JSONTable extends React.Component {
    
  state = {
    columnWidths: {}
  }

  render() {
    let { resources: [ { schema, data, ...options }] } = this.props;
    if (!schema) schema = inferSchema(data);
    return (
      <Table
        rowHeight={ROW_HEIGHT}
        headerHeight={ROW_HEIGHT}
        rowsCount={data.length}
        width={3000}
        height={ROW_HEIGHT * (data.length + 1)}
        onColumnResizeEndCallback={(columnWidth, columnKey) => {
          this.setState(({columnWidths}) => ({
            columnWidths: {
              ...columnWidths,
              [columnKey]: columnWidth,
            }
          }));
        }}
        {...options}
      >
        {
          schema.fields.map((field, fieldIndex) =>
            <Column
              key={fieldIndex}
              columnKey={field.name}
              header={(props) =>
                <Cell>{field.name}</Cell>
              }
              cell={(props) =>
                <Cell>{data[props.rowIndex][field.name]}</Cell>
              }
              width={this.state.columnWidths[field.name] || 300}
              fixed={false}
              isResizable={true}
            />
          )
        }
      </Table>
    );
  }

}
