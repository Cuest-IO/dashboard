import React, { useState } from "react";
import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}
const MessagePanel: React.FC<Props> = ({ message }: Props) => {
  return(
    <Typography
      variant='h5'
      fontFamily='Product Sans'
      fontWeight={700}
      color='#575757'
    >
      {message}
    </Typography>
  )
}

export default MessagePanel;
