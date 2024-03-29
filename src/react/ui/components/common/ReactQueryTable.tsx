import React from 'react';
import MaterialReactTable, { MRT_ColumnDef, MaterialReactTableProps } from "material-react-table";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";

interface Props<TData extends Record<string, any>> extends MaterialReactTableProps<TData> {
  data: TData[];
  columns: (Omit<MRT_ColumnDef<TData>, 'id'> & { id: string; })[];
  isLoading: boolean;
}

const ReactQueryTable = <TData extends Record<string, any>>({ data, columns, isLoading, ...rest }: Props<TData>) => {
  if (isLoading) {
    return (
      <Grid
        container
        gap={3}
        direction='column'
      >
        {Array.from(Array(3).keys()).map(() => (
          <Grid item xs={12}>
            <Skeleton
              variant="rectangular"
              height={50}
              sx={{
                borderRadius: 2
              }}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
  return (
    <MaterialReactTable
      // Data
      columns={columns}
      data={data}
      positionPagination="bottom"
      rowCount={data.length}
      muiTablePaginationProps={{
        rowsPerPageOptions: [
          10,
          20,
          40,
          80,
          100,
        ],
        showFirstButton: false,
        showLastButton: false,
      }}
      localization={MRT_Localization_EN}
      enableTopToolbar={false}
      enableColumnActions={false}
      // Styling
      muiTablePaperProps={{
        sx: {
          '&.MuiPaper-root': {
            boxShadow: 'none',
            backgroundColor: 'inherit'
          },
          'table': {
            borderCollapse: 'separate',
            borderSpacing: '0 16px',
            padding: '0 8px'
          },
          'thead': {
            '& tr': {
              background: 'inherit',
              boxShadow: 'none',
              '& th': {
                border: 'none'
              }
            }
          },
          'tbody': {
            '& tr td:first-child': {
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px'
            },
            '& tr td:last-child': {
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px'
            }
          },
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr': {
            height: '52px',
            boxShadow: '0px 0px 14px 0px #0000000A',
          },
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          boxShadow: 'none'
        }
      }}
      {...rest}
    />
  );
};

export default ReactQueryTable;
