import React from 'react';
import { Table, Column, SortDirection, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when
// built with @jupyterlabextension-builder
import infer from 'jsontableschema/lib/infer';
// import { infer } from 'jsontableschema';
import './index.css';

const ROW_HEIGHT = 34;

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

export default class VirtualizedTable extends React.Component {
  state = { sortBy: null, sortDirection: null };
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
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            // ref={ref => this.ref = ref}
            // disableHeader={disableHeader}
            // headerClassName={styles.headerColumn}
            headerHeight={ROW_HEIGHT}
            headerStyle={{
              fontWeight: 600,
              textAlign: 'right',
              // border: '1px solid #ddd',
              // padding: '6px 13px'
              textTransform: 'none',
              outline: 0
            }}
            height={
              (this.data.length + 1) * ROW_HEIGHT < 400
                ? (this.data.length + 1) * ROW_HEIGHT
                : 400
            }
            // noRowsRenderer={this._noRowsRenderer}
            // overscanRowCount={overscanRowCount}
            // rowClassName={this._rowClassName}
            rowHeight={ROW_HEIGHT}
            rowGetter={({ index }) => this.data[index]}
            rowCount={this.data.length}
            rowStyle={({ index }) => ({
              backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff',
              textAlign: 'right'
            })}
            // scrollToIndex={scrollToIndex}
            sort={this.sort}
            sortBy={this.state.sortBy}
            sortDirection={this.state.sortDirection}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontSize: 12,
              fontWeight: 'normal'
            }}
            // width={this.schema.fields.length * 150}
            width={width}
          >
            {this.schema.fields.map((field, fieldIndex) => (
              <Column
                key={fieldIndex}
                label={`${field.name}`}
                // cellDataGetter={({ columnData, dataKey, rowData }) =>
                //   rowData
                // }
                dataKey={field.name}
                // disableSort={!this._isSortEnabled()}
                width={150}
                flexGrow={1}
                flexShrink={1}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }

  sort = ({ sortBy, sortDirection }) => {
    if (this.state.sortDirection === SortDirection.DESC) {
      this.data = this.props.data;
      this.setState({ sortBy: null, sortDirection: null });
    } else {
      const { type } = this.schema.fields.find(field => field.name === sortBy);
      this.data = [...this.props.data].sort((a, b) => {
        if (type === 'date' || type === 'time' || type === 'datetime') {
          return sortDirection === SortDirection.ASC
            ? new Date(a[sortBy]) - new Date(b[sortBy])
            : new Date(b[sortBy]) - new Date(a[sortBy]);
        }
        return sortDirection === SortDirection.ASC
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      });
      this.setState({ sortBy, sortDirection });
    }
  };
}
