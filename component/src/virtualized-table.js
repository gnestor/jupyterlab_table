/* @flow */
import React from 'react';
import { Table, Column, SortDirection, AutoSizer } from 'react-virtualized';
// hack: `stream.Transform` (stream-browserify) is undefined in `csv-parse` when
// built with @jupyterlabextension-builder
import infer from 'jsontableschema/lib/infer';
// import { infer } from 'jsontableschema';
import '../index.css';

const ROW_HEIGHT = 36;
const TABLE_MAX_HEIGHT = ROW_HEIGHT * 10;

type Props = {
  data: Array<Object>,
  schema: { fields: Array<Object> },
  theme: string
};

type State = {
  data: Array<Object>,
  schema: { fields: Array<Object> },
  sortBy: string,
  sortDirection: string
};

function getSampleRows(data: Array<Object>, sampleSize: number): Array<Object> {
  return Array.from({ length: sampleSize }, () => {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  });
}

function inferSchema(data: Array<Object>): { fields: Array<Object> } {
  // Take a sampling of rows from data
  const range = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * data.length));
  // Separate headers and values
  const headers = Array.from(
    range.reduce(
      (result, row) => new Set([...result, ...Object.keys(data[row])]),
      new Set()
    )
  );
  const values = range.map(row => Object.values(data[row]));
  // Infer column types and return schema for data
  return infer(headers, values);
}

function getState(props: Props) {
  const data = props.data;
  const schema = props.schema || inferSchema(data);
  return {
    data,
    schema
  };
}

export default class VirtualizedTable extends React.Component {
  props: Props;
  state: State = {
    data: [],
    schema: { fields: [] },
    sortBy: '',
    sortDirection: SortDirection.ASC
  };

  componentWillMount() {
    const state = getState(this.props);
    this.setState(state);
  }

  componentWillReceiveProps(nextProps: Props) {
    const state = getState(nextProps);
    this.setState(state);
  }

  render() {
    const rowCount = this.state.data.length + 1;
    const height = rowCount * ROW_HEIGHT;
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            // ref={ref => this.ref = ref}
            className="table"
            // disableHeader={disableHeader}
            // headerClassName="th"
            headerHeight={ROW_HEIGHT}
            headerStyle={styles.header}
            height={
              this.props.height || height < TABLE_MAX_HEIGHT
                ? height
                : TABLE_MAX_HEIGHT
            }
            // noRowsRenderer={this._noRowsRenderer}
            // overscanRowCount={overscanRowCount}
            rowClassName={({ index }) => index === -1 ? 'th' : 'tr'}
            rowHeight={ROW_HEIGHT}
            rowGetter={({ index }) => this.state.data[index]}
            rowCount={rowCount}
            rowStyle={styles.row}
            // scrollToIndex={scrollToIndex}
            sort={this.sort}
            sortBy={this.state.sortBy}
            sortDirection={this.state.sortDirection}
            style={styles.table}
            width={this.props.width || width}
          >
            {this.state.schema.fields.map((field, fieldIndex) => (
              <Column
                // cellRenderer={({ cellData, columnData, dataKey, isScrolling, rowData, rowIndex }) => (
                //
                // )}
                // // cellDataGetter={({ columnData, dataKey, rowData }) =>
                //   rowData
                // }
                // disableSort={!this._isSortEnabled()}
                dataKey={field.name}
                key={fieldIndex}
                flexGrow={1}
                flexShrink={1}
                label={`${field.name}`}
                style={styles.column({ type: field.type, index: fieldIndex })}
                width={150}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }

  sort = ({ sortBy, sortDirection }) => {
    if (this.state.sortDirection === SortDirection.DESC) {
      this.setState({
        data: this.props.data,
        sortBy: null,
        sortDirection: null
      });
    } else {
      const { type } = this.state.schema.fields.find(
        field => field.name === sortBy
      );
      const data = [...this.props.data].sort((a, b) => {
        if (type === 'date' || type === 'time' || type === 'datetime') {
          return sortDirection === SortDirection.ASC
            ? new Date(a[sortBy]) - new Date(b[sortBy])
            : new Date(b[sortBy]) - new Date(a[sortBy]);
        }
        if (type === 'number' || type === 'integer') {
          return sortDirection === SortDirection.ASC
            ? parseInt(a[sortBy]) - parseInt(b[sortBy])
            : parseInt(b[sortBy]) - parseInt(a[sortBy]);
        }
        if (type === 'string') {
          return sortDirection === SortDirection.ASC
            ? a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
            : b[sortBy].toLowerCase() > a[sortBy].toLowerCase() ? 1 : -1;
        }
      });
      this.setState({ data, sortBy, sortDirection });
    }
  };
}

const styles = {
  table: {
    boxSizing: 'border-box'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'right',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '0.5em 1em',
    border: '1px solid #ddd'
  },
  row: ({ index }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: index % 2 === 0 || index === -1
      ? 'transparent'
      : 'rgba(0, 0, 0, 0.03)'
  }),
  column: ({ type, index }) => ({
    textAlign: type === 'number' || type === 'integer' ? 'right' : 'left',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '0.5em 1em',
    borderRight: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    borderLeft: index === 0 ? '1px solid #ddd' : 'none'
  })
};
