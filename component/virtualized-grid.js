import React from 'react';
import ReactDOM from 'react-dom';
import { MultiGrid, AutoSizer, CellMeasurer } from 'react-virtualized';
import 'react-virtualized/styles.css';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when
// built with @jupyterlabextension-builder
import infer from 'jsontableschema/lib/infer';
// import { infer } from 'jsontableschema';
import './index.css';

const ROW_HEIGHT = 42;
const GRID_MAX_HEIGHT = 336;

function inferSchema(data) {
  // Take a sampling of rows from data
  const range = Array.from({ length: 10 }, (v, i) =>
    Math.floor(Math.random() * data.length));
  // Separate headers and values
  const headers = range.reduce(
    (result, row) => [...new Set([...result, ...Object.keys(data[row])])],
    []
  );
  const values = range.map(row => Object.values(data[row]));
  // Infer column types and return schema for data
  return infer(headers, values);
}

export default class VirtualizedGrid extends React.Component {
  data = [];
  schema = { fields: [] };

  componentWillMount() {
    this.data = this.props.data;
    this.schema = this.props.schema || inferSchema(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data;
    this.schema = nextProps.schema || inferSchema(nextProps.data);
  }

  render() {
    const rowCount = this.data.length + 1
    const height = rowCount * ROW_HEIGHT;
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <CellMeasurer
            cellRenderer={this.cellRenderer}
            columnCount={this.schema.fields.length}
            height={ROW_HEIGHT}
            rowCount={rowCount}
          >
            {({ getColumnWidth }) => (
              <MultiGrid
                cellRenderer={this.cellRenderer}
                columnCount={this.schema.fields.length}
                columnWidth={index => getColumnWidth(index) + 10}
                fixedColumnCount={1}
                fixedRowCount={1}
                height={
                  height < GRID_MAX_HEIGHT
                    ? height
                    : GRID_MAX_HEIGHT
                }
                rowCount={rowCount}
                rowHeight={ROW_HEIGHT}
                width={width}
              />
            )}
          </CellMeasurer>
        )}
      </AutoSizer>
    );
  }

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div
        key={key}
        style={{
          ...style,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 12,
          fontWeight: rowIndex === 0 ? 600 : 'normal',
          backgroundColor: rowIndex % 2 === 0 && rowIndex !== 0
            ? '#f8f8f8'
            : '#fff',
          padding: '6px 13px',
          boxSizing: 'border-box'
        }}
      >
        {
          [
            this.schema.fields.reduce(
              (result, field) => ({ ...result, [field.name]: field.name }),
              {}
            ),
            ...this.data
          ][rowIndex][this.schema.fields[columnIndex].name]
        }
      </div>
    );
  };
}
