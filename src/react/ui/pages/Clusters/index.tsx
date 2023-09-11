
import Box from "@mui/material/Box";
import { useClusters } from "../../../engine/state/clusters/useClusters";

export default function Clusters() {
  const clusters = useClusters()

  console.log(clusters)

  return (
    <Box className="mainPage">
      {/*{selectListItems.length === 0 && <Typography>Please connect your first Kubernetes Cluster</Typography>}*/}
      {/*<Table loading={selectListLoading} rows={selectListItems} columns={selectListColumns} />*/}
    </Box>
  );
}
