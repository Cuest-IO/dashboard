import { ReactElement } from "react";
import { Windows as WindowsIcon, Apple as AppleIcon, Linux as LinuxIcon } from "../../ui/components/common/icons";

export default (os: string): ReactElement | null => {
  if (os === 'windows') return <span><WindowsIcon /></span>;
  if (os === 'linux') return <span><LinuxIcon /></span>;
  if (os === 'darwin') return <span><AppleIcon /></span>;
  return null
}
