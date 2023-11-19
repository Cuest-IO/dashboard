import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  toggleDialog: Dispatch<SetStateAction<boolean>>;
}

const NodeSuspendDialog: React.FC<Props> = ({ isOpen, toggleDialog }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false)
    toggleDialog(false)
  };

  useEffect(() => {
    if (isOpen) {
      setOpen(true)
    }
  }, [isOpen])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('common:suspended_node_workloads_dialog_message')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('common:ok')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NodeSuspendDialog;
