import { useMemo, FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ClustersResponse } from "../../../engine/dto/clusters";
import { NodesResponse } from "../../../engine/dto/nodes";
import Card from "../../components/common/Card";

interface Props {
  clusters: ClustersResponse;
  nodes: NodesResponse;
}

const ClusterCard: FC<Props> = ({ clusters, nodes }) => {
  const { t } = useTranslation()
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
          fontWeight={700}
          color='secondary'
          display='inline-block'
        >
          {t('core:clusters')}
        </Typography>
      }
      sx={{
        minWidth: '344px',
        maxWidth: '344px',
        p: 6,
      }}
    >
      <Box>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => navigate('/clusters')}
          sx={{
            borderRadius: 5,
          }}
        >
          {t('dashboard:view_clusters')}
        </Button>
      </Box>

      <Box
        className='charts'
        sx={{
          fontSize: '14px',
          pt: 2,
        }}
      >
        <ClusterTable data={data}/>
      </Box>
    </Card>
  ) ;
}
export default ClusterCard;


const ClusterTable: FC<{ data: { id: string, status: boolean, count: number }[] }> = ({ data }) => {
  const { t } = useTranslation()
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
            <TableCell sx={{...cellTableStyle, width: '70%'}} align="left">{t('dashboard:cluster_name')}</TableCell>
            <TableCell sx={{...cellTableStyle, width: '30%'}} align="left">{t('dashboard:num_of_nodes')}</TableCell>
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
