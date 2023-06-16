import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table as TableDX,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { Loading } from './Loading';

export default function Table(props: {
  rows: object[],
  columns: { name: string, title: string }[],
  loading: boolean;
}) {
  const { loading, rows, columns } = props;
  const [totalCount] = useState(rows.length);
  const [pageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);

  const changePageSize = (value: number) => {
    const totalPages = Math.ceil(rows.length / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);
    console.log({
      value,
      updatedCurrentPage,
    })
  };

  return (
    <Paper sx={{ position: 'relative' }}>
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <TableDX />
        <TableHeaderRow showSortingControls={false} />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};
