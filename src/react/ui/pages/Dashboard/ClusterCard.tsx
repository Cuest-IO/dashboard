import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { ClustersResponse } from "../../../engine/dto/clusters";
import { NodesResponse } from "../../../engine/dto/nodes";
import Card from "../../components/common/Card";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

interface Props {
  clusters: ClustersResponse;
  nodes: NodesResponse;
}

const ClusterCard: React.FC<Props> = ({ clusters, nodes }) =>{
  const navigate = useNavigate()
  const id = (clusters && clusters[0]) ? clusters[0].id : "";
  const status = (clusters && clusters[0]) ? clusters[0].is_connected : false;

  const connectedNodes = useMemo(() => {
    if (id) {
      return nodes.reduce((acc, node) => {
        if (node.is_connected) {
          return acc + 1
        }
        return acc
      }, 0)
    }
    return 0
  }, [nodes, id])

  const data = useMemo(() => {
    return [
      { id: id, status: status, count: connectedNodes },
    ]
  }, [id, status, connectedNodes]);

  return (
    <Card
      header={
        <Typography
          variant='h5'
          fontFamily='Product Sans'
          fontWeight={700}
          color='#575757'
          display='inline-block'
        >
          Clusters
        </Typography>
      }
      sx={{
        minWidth: '320px',
        maxWidth: '320px',
        '& .MuiCardHeader-root': {
          p: '12px 0px'
        }
      }}
    >
      <Box
        mb='12px'
      >
        <Button
          variant='outlined'
          onClick={() => navigate('/clusters')}
          sx={{
            borderRadius: '20px',
            color: '#78caf4',
            borderColor: '#78caf4'
          }}
        >
          View clusters
        </Button>
      </Box>

      <div className='charts' style={{fontSize:"14px"}}>
        <ClusterTable data={data}/>
      </div>
    </Card>
  ) ;
}
export default ClusterCard;


const ClusterTable: React.FC<{ data: { id: string, status: boolean, count: number }[] }> = ({ data }) => {

  const cellTableStyle = {
    padding: '0px',
    width: '20%'
  };

  return (
    <TableContainer
      sx={{
        width:'100%',
        alignContent:"start",
        display:"flex",
        flexWrap: "wrap"
      }}
    >
      <Table
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
            <TableCell sx={{...cellTableStyle, width: '70%'}} align="left">Cluster Name</TableCell>
            <TableCell sx={{...cellTableStyle, width: '30%'}} align="left"># of Nodes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ ...cellTableStyle, width: '70%' }} scope="row">
                  <Box
                    component='span'
                    display='inline-block'
                    borderRadius='50%'
                    height='10px'
                    marginRight='4px'
                    width='10px'
                    bgcolor={row.status ? '#B6ED8B' : '#E2E2E2'}
                  />
                  {row.id}
                </TableCell>
                <TableCell sx={{...cellTableStyle, width: '30%'}} >
                  {row.count}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>

  );
}