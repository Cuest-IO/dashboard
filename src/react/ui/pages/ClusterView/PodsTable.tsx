import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from "react-i18next";
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";

interface Props {
  node: ClusterViewNode;
}

const PodsTable: React.FC<Props> = ({ node }) => {
  const { t } = useTranslation()
  const cellTableStyle = {
    padding: "0px 0px",
    width: '20%',
    bgcolor: 'transparent'
  };

  const cellTableHeaderStyle = {
    padding: "0px 0px",
    width: '20%',
    bgcolor: 'white'
  };

  return (
    <TableContainer
      sx={{
        width: '100%',
        alignContent: "start",
        display: "flex",
        flexWrap: "wrap",
        maxHeight: 'inherit'
      }}
    >
      <Table
        stickyHeader
        sx={{
          width: "100%",
          fontSize: '10px',
          borderCollapse: "separate",
          borderSpacing: "0px 0px",
          padding: "0px"
        }}
      >
        <TableHead
          sx={{
            minWidth: 480,
            borderCollapse: "separate",
            borderSpacing: "0px 0px",
            padding: "0px"
          }}
        >
          <TableRow
            sx={{
              minWidth: 480,
              borderCollapse: "separate",
              borderSpacing: "0px 0px",
              padding:"0px"
            }}
            >
              <TableCell sx={{...cellTableHeaderStyle, width: '70%'}} align="left">{t('cluster_view:image_name')}</TableCell>
              <TableCell sx={{...cellTableHeaderStyle}} align="left">{t('cluster_view:status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            overflowY: 'scroll',
          }}
        >
          {
            node.connected && node.workloads.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{...cellTableStyle, width: '70%'}} scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{...cellTableStyle}} >
                  {row.status}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PodsTable
