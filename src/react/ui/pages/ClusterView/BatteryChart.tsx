import Battery20Icon from '@mui/icons-material/Battery20';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery80Icon from '@mui/icons-material/Battery80';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Tooltip from '@mui/material/Tooltip';
import { Battery } from "../../../engine/dto/clusterView";
import React, {useMemo} from "react";

interface Props {
  battery: Battery;
}

const BatteryChart: React.FC<Props> = ({ battery }) => {
  const showBattery = useMemo(() => {
    const sx= { fontSize: 29, alignItems: "center" };
    const color = battery.enough ? "success" : "error";

    if (battery.isCharging) {
      if (battery.current < 21) {
        return <BatteryCharging20Icon sx={sx} color={color}/>;
      } else if (battery.current < 51) {
        return <BatteryCharging50Icon sx={sx} color={color}/>;
      } else if (battery.current < 81) {
        return <BatteryCharging80Icon sx={sx} color={color}/>;
      } else {
        return <BatteryChargingFullIcon sx={sx} color={color}/>;
      }
    } else {
      if (battery.current < 21 ) {
        return <Battery20Icon sx={sx} color={color}/>;
      } else if (battery.current < 51) {
        return <Battery50Icon sx={sx} color={color}/>;
      } else if (battery.current < 81) {
        return <Battery80Icon sx={sx} color={color}/>;
      } else {
        return <BatteryFullIcon sx={sx} color={color}/>;
      }
    }
  }, [battery.isCharging, battery.current])

    return battery.current ? (
      <Tooltip title={(`${battery.current}%`)}>
        {showBattery}
      </Tooltip>
    ) : null
}

export default BatteryChart
