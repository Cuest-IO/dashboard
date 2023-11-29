import React, {FC, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import {DrawerProps, FormControlLabel, Grid, Switch, TextField} from "@mui/material";
import Drawer from "../../components/common/Drawer";
import {ClusterBody, ClusterResponse} from "../../../engine/dto/clusters";
import {useMutateCluster} from "../../../engine/state/clusters/useUpdateCluster";
import TextInput from "../../components/common/TextInput";
import Switcher from "../../components/common/Switcher";

interface Props extends DrawerProps {
  record: ClusterResponse | null
}
const EditClusterDrawer: FC<Props> = ({ open, onClose, record }) => {
  const { t } = useTranslation()
  const { mutate } = useMutateCluster()
  const formik = useFormik<Partial<ClusterResponse>>({
    initialValues: {
      is_connected: !!record?.is_connected,
      id: record?.id
    },
    onSubmit: (cluster) => mutate({ id: record?.id || '', ...cluster }),
    enableReinitialize: true
  });

  useEffect(() => {
    // formik.handleChange()
  }, [record?.id])

  return (
    <Drawer
      header={
        <Typography
          variant='h5'
          fontWeight={700}
          color='secondary'
        >
          {t('clusters:edit_cluster')}
        </Typography>
      }
      open={open}
      onClose={onClose}
      content={
        <form onSubmit={formik.handleSubmit}>
          <Grid container gap={5} p={0}>
            <TextInput
              label="ID"
              id='id'
              name='id'
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
            />
            <Switcher
              id='is_connected'
              name='is_connected'
              value={formik.values.is_connected}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Is connected"
            />
          </Grid>
        </form>
      }
    />
  );
};

export default EditClusterDrawer;
