import React, { FC } from 'react';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {AccountStatuses} from "../../engine/dto/account";

interface Props {
  accountStatus: AccountStatuses;
  isLoading: boolean;
}

export const AccountCreateInProgress: FC<Props> = ({ accountStatus, isLoading }) => {
  const { t } = useTranslation()

  return (
    <Typography
      variant='h5'
      fontWeight={700}
      color={(theme) => theme.palette.secondary.main}
    >
      {(!accountStatus && isLoading) && t('account:loadingStatus')}
      {accountStatus !== AccountStatuses.Completed && t('account:creationInProgress')}
    </Typography>
  );
};
