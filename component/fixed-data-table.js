import React from 'react';
import {
  Table, 
  Column, 
  Cell
} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when 
// built with @jupyterlabextension-builder 
import infer from 'jsontableschema/lib/infer';
// import { infer } from 'jsontableschema';
import './index.css';

const ROW_HEIGHT = 34;

function inferSchema(data) {
  const headers = data.reduce((result, row) => [...new Set([...result, ...Object.keys(row)])], []);
  const values = data.map(row => Object.values(row));
  return infer(headers, values);
}

export default class FixedDataTable extends React.Component {
    
  state = {
    columnWidths: {}
  }

  render() {
    let { schema, data } = this.props;
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
      >
        {
          schema.fields.map((field, fieldIndex) =>
            <Column
              key={fieldIndex}
              columnKey={field.name}
              width={this.state.columnWidths[field.name] || 300}
              header={props =>
                <Cell>{field.name}</Cell>
              }
              cell={props =>
                <Cell>{data[props.rowIndex][field.name]}</Cell>
              }
              fixed={false}
              isResizable={true}
            />
          )
        }
      </Table>
    );
  }

}
