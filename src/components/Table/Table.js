import React, { useEffect } from 'react';
import './table.scss'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

function descendingComparator( a, b, orderBy ) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = ( order, orderBy ) => {
  return order === 'desc'
    ? ( a, b ) => descendingComparator( a, b, orderBy )
    : ( a, b ) => -descendingComparator( a, b, orderBy );
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = ( array, comparator ) => {
  const stabilizedThis = array.map( ( el, index ) => [el, index] );
  stabilizedThis.sort( ( a, b ) => {
    const order = comparator( a[0], b[0] );
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  } );
  return stabilizedThis.map( ( el ) => el[0] );
}

const EnhancedTableHead = ( {order, orderBy, onRequestSort, heads} ) => {

  const createSortHandler = ( property ) => ( event ) => {
    onRequestSort( event, property );
  };

  return (
    <TableHead>
      <TableRow>
        {heads.map( ( headCell ) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label ?
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler( headCell.id )}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel> : null}
          </TableCell>
        ) )}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ( {mainHead, setFilterParams, filterBy, filter} ) => {

  const handleChange = ( e ) => {

    const params = {
      fieldName: e.target.id,
      fieldValue: e.target.value
    }
    setFilterParams( ( prev ) => {
      const temp = [];
      if (prev) {
        prev.map( filter => {
          if (filter.fieldName != e.target.id) {
            temp.push( filter )
          }
        } )
      }
      temp.push( params )
      filter(temp)
      return temp
    } )
  }

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1}
      }}
      className={'container flex-column w-100 justify-content-end px-5 mb-2'}
    >
      <div className={'row'}>
        <Typography
          sx={{flex: '1 1 100%'}}
          variant={mainHead.variant}
          id={mainHead.id}
          component="div"
          style={{width: 'inherit'}}
          className={'link-primary text-center fw-bold my-4 container'}
        >
          {mainHead.label}
        </Typography>
      </div>
      <div className={'row align-self-end'}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">Filter by</span>
          </div>
          {filterBy.map( by => <input
            onChange={handleChange}
            key={`${by.fieldParameter}_filter_input`}
            id={by.fieldParameter}
            type={by.fieldType}
            className="form-control"
            placeholder={by.fieldPlaceHolder}
          /> )}
        </div>
      </div>

    </Toolbar>
  );
};

const EnhancedTable = ( {rowsValue, heads, hideMainHead, mainHead, hidePagination, filterBy} ) => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState( rowsValue );
  const [filterParams, setFilterParams] = React.useState( [] );
  const [order, setOrder] = React.useState( 'asc' );
  const [orderBy, setOrderBy] = React.useState( 'calories' );
  const [selected, setSelected] = React.useState( [] );
  const [page, setPage] = React.useState( 0 );
  const [rowsPerPage, setRowsPerPage] = React.useState( 5 );


  const filter = (parameters) => {
    const filteredValues = rowsValue.filter(item => {
      let isEquals = true;
      for(const filterItem of parameters) {
        if (item[filterItem.fieldName].trim().toLocaleLowerCase().indexOf(filterItem.fieldValue.trim().toLocaleLowerCase()) === -1) {
          isEquals = false;
          break;
        }
      }
      return isEquals;
    });
    setRows(filteredValues);
  }

  const handleRequestSort = ( event, property ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder( isAsc ? 'desc' : 'asc' );
    setOrderBy( property );
  };

  const handleChangePage = ( event, newPage ) => {
    setPage( newPage );
  };

  const handleChangeRowsPerPage = ( event ) => {
    setRowsPerPage( parseInt( event.target.value, 10 ) );
    setPage( 0 );
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max( 0, (1 + page) * rowsPerPage - rows.length ) : 0;

  return (
    <Box sx={{width: '100%'}} className={'overflow-auto'}>
      <Paper sx={{width: '100%', mb: 2}}>
        {hideMainHead ? null :
          <EnhancedTableToolbar numSelected={selected.length} mainHead={mainHead} setFilterParams={setFilterParams}
                                filterBy={filterBy} filter={filter}/>}
        <TableContainer
          className={'px-5'}>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              heads={heads}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort( rows, getComparator( order, orderBy ) )
                .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                .map( ( row, index ) => {
                  return (
                    <TableRow
                      hover
                      key={index}
                    >
                      {heads.map( ( head, index ) => {
                        if (head.enableHTML) {
                          return (<TableCell key={`func${head.id}__${index}`}
                                             align={head.numeric ? 'right' : 'left'}>{row[head.id]( row )}</TableCell>)
                        } else {
                          return (<TableCell key={`cell__${head.id}__${index}`}
                                             align={head.numeric ? 'right' : 'left'}>{row[head.id]}</TableCell>)
                        }
                      } )}
                    </TableRow>
                  );
                } )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
              {!rows.length && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}>No result found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {hidePagination ? null :
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
    </Box>
  );
}

export default EnhancedTable;