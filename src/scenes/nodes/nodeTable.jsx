import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

// import { rows } from "../../data/mockData";
import { getComparator, stableSort, EnhancedTableHead, EnhancedTableToolbar} from "../../components/tableComp.jsx";


const headCells = [
  {
    id: 'nodeId',
    numeric: false,
    disablePadding: true,
    label: 'Node Id',
  },
  {
    id: 'activeSince',
    numeric: false,
    disablePadding: false,
    label: 'Active Since',
  },
  {
    id: 'group',
    numeric: false,
    disablePadding: false,
    label: 'Group',
  },
  {
    id: 'cores',
    numeric: false,
    disablePadding: false,
    label: 'Cores',
  },
  {
    id: 'memory',
    numeric: false,
    disablePadding: false,
    label: 'Memory',
  },
  {
    id: 'coresUsed',
    numeric: false,
    disablePadding: false,
    label: 'Cores Used',
  },
  {
    id: 'memoryUsed',
    numeric: false,
    disablePadding: false,
    label: 'Memory Used',
  },
  {
    id: 'runtimeHours',
    numeric: false,
    disablePadding: false,
    label: 'Runtime Hours',
  },
];



export default function NodesTable(props) {
  
    const [rows, setRows] = React.useState(props.nodes);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('nodeId');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.nodeId);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
    
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
      
    return (
    <Box sx={{ width: '100%', marginTop: "24px", 
    marginLeft: "24px" }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ width: 1080 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.nodeId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nodeId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nodeId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.nodeId}
                      </TableCell>
                      <TableCell align="left">{row.activeSince}</TableCell>
                      <TableCell align="left">{row.group}</TableCell>
                      <TableCell align="left">{row.cores}</TableCell>
                      <TableCell align="left">{row.memory}</TableCell>
                      <TableCell align="left">{row.coresUsed}</TableCell>
                      <TableCell align="left">{row.memoryUsed}</TableCell>
                      <TableCell align="left">{row.runtimeHours}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}