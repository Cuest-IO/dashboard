// Core
import { useEffect } from "react";
// PArts
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "../../components/Table";
// Engine
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectors } from "../../../engine/core/clusters/slice";
import { clustersAsyncActions } from "../../../engine/core/clusters/saga/asyncActions";

export default function Clusters() {
  const dispatch = useAppDispatch()
  const selectListLoading = useAppSelector(selectors.selectListLoading);
  const selectListItems = useAppSelector(selectors.selectListItems);
  const selectListColumns = useAppSelector(selectors.selectListColumns);

  useEffect(() => {
    dispatch(clustersAsyncActions.getClustersAsync())
  }, [dispatch]);

  return (
    <Box className="mainPage">
      {selectListItems.length === 0 && <Typography>Please connect your first Kubernetes Cluster</Typography>}
      <Table loading={selectListLoading} rows={selectListItems} columns={selectListColumns} />
    </Box>
  );
}
