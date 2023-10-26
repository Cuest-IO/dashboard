import { FC } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Card from "../../components/common/Card";
import { Grid } from "@mui/material";
import { CostOverTime, LoadMeasure, TimerClock } from "../../components/common/icons";
import BillingCardColumn from "./BillingCardColumn";

interface Props {
  title: string;
}

const BillingCard: FC<Props> = ({ title }) => {
  const { t } = useTranslation()

  const data = {
    avoidedCost: '$120k',
    cpuRuntime: '800h',
    workloadsExecuted: '300'
  }

  return (
    <Card
      header={
        <Typography
          variant='h5'
          fontWeight={700}
          color='secondary'
          display='inline-block'
        >
          {title}
        </Typography>
      }
      sx={{
        minWidth: '528px',
        maxWidth: '528px',
        p: 6,
      }}
    >
      <Grid
        container
        gap={15.5}
      >
        <Grid item>
          <BillingCardColumn
            icon={<CostOverTime />}
            iconBg='teritrary.blue'
            description={t('dashboard:aws_avoided_cost')}
            value={data.avoidedCost}
            compare={{
              oldVal: 56,
              newVal: 78
            }}
          />
        </Grid>
        <Grid item>
          <BillingCardColumn
            icon={<TimerClock />}
            iconBg='teritrary.red'
            description={t('dashboard:cpu_runtime')}
            value={data.cpuRuntime}
            compare={{
              oldVal: 56,
              newVal: 48
            }}
          />
        </Grid>
        <Grid item>
          <BillingCardColumn
            icon={<LoadMeasure />}
            iconBg='teritrary.green'
            description={t('dashboard:workloads_executed')}
            value={data.workloadsExecuted}
            compare={{
              oldVal: 30,
              newVal: 40
            }}
          />
        </Grid>
      </Grid>

    </Card>
  );
}
export default BillingCard;
