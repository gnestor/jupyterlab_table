import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
import './index.css';

function getRows(data) {
  let map = Object.entries(data).reduce((result, [column, rows]) => {
    Object.entries(rows).forEach(([key, value]) => {
      result[key] = {
        ...result[key],
        [column]: value
      };
    });
    return result;
  }, {});
  return Object.values(map);
}

function getColumns(data) {
  return Object.keys(data).map(key => ({
    key,
    name: key,
    width: 100,
    resizable: true,
    sortable: true
  }));
}

export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: getRows(props.data), 
      // filters: {}
    };
  }
  
  render() {
    // const columns = Object.values(this.props.data.reduce((result, item) => {
    //   Object.keys(item).forEach(key => {
    //     result[key] = {
    //       key,
    //       name: key,
    //       resizable: true,
    //       sortable : true,
    //       // filterable: true
    //     };
    //   })
    //   return result;
    //   // return [...result, {
    //   //   key: 'complete',
    //   //   name: '% Complete',
    //   //   sortable : true,
    //   //   filterable: true
    //   // }]
    // }, {}));
    const columns = getColumns(this.props.data);
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={(index) => this.state.rows[index]}
        rowsCount={this.state.rows.length}
        minHeight={500}
        // toolbar={<Toolbar enableFilter={true}/>}
        onGridSort={this.handleSort}
        // onRowUpdated={this.handleRowUpdated}
        // onAddFilter={this.handleFilterChange}
        // onClearFilters={this.onClearFilters} 
      />
    );
  }
    
  handleSort = (sortColumn, sortDirection) => {
    let rows = sortDirection === 'NONE' ? this.state.rows : this.state.rows.sort((a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
    this.setState({rows});
    // this.setState({
    //   sortColumn: sortColumn, 
    //   sortDirection: sortDirection
    // });
  }
  
  // handleFilterChange = (filter) => {
  //   
  // }
  // 
  // onClearFilters = () => {
  //   
  // }

}
