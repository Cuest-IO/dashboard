import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}
const MessagePanel: React.FC<Props> = ({ message }: Props) => {
  return(
    <Typography
      variant='h5'
      fontWeight={700}
      color={(theme) => theme.palette.secondary.main}
    >
      {message}
    </Typography>
  )
}

export default MessagePanel;
