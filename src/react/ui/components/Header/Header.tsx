// Parts
import Stack from '@mui/material/Stack';
/// Parts
import { Button } from "../Button";
// Engine
import { routersLinks } from '../../../engine/config/routes';
// Helpers
import { HeaderWrapper } from "./HeaderStyles";

export function Header() {
  return (
    <HeaderWrapper component="header" sx={{ margin: '10px' }}>
      Header
      <Stack spacing={2} direction="row">
        <Button to={routersLinks.main}>main</Button>
        <Button to={routersLinks.signIn}>signIn</Button>
        <Button to={routersLinks.counter}>counter</Button>
      </Stack>
    </HeaderWrapper>
  )
}
