import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableBody';

import TableRow from '@mui/material/TableRow';
import { useState} from 'react';


export default function PodsTable(props) {
    const [workloads, setWorkloads] = useState(props.node.workloads);
    
    const cellTableStyle ={
        padding: "0px 0px",
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
                    <TableCell sx={{...cellTableStyle, width: '70%'}} align="left">Image name</TableCell>
                    <TableCell sx={{...cellTableStyle}} align="left">Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        workloads.map((row) => (
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