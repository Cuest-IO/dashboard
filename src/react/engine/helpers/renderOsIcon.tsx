import { ReactElement } from "react";
import { Windows as WindowsIcon, Apple as AppleIcon, Linux as LinuxIcon } from "../../ui/components/common/icons";

export default (os: string): ReactElement | null => {
  if (os === 'windows') return <WindowsIcon />
  if (os === 'linux') return <LinuxIcon />
  if (os === 'darwin') return <AppleIcon />
  return null
}
