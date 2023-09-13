import { useMemo } from "react";
import moment from "moment/moment";
import { MRT_ColumnDef } from "material-react-table";
import { NodeItemResponse } from "../../../engine/dto/nodes";
import { formatMBytes } from "../../../engine/helpers/utilities";
import { useNodes } from "../../../engine/state/nodes/useNodes";
import ReactQueryTable from "../../components/common/ReactQueryTable";

export type NodesColumns = (Omit<MRT_ColumnDef<NodeItemResponse>, 'id'> & { id: string; })[];

const Nodes = () => {
  const { data: nodes } = useNodes()

  const columns = useMemo<NodesColumns>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Node id' // TODO: translations support
      },
      {
        id: 'created_at',
        accessorKey: 'created_at',
        header: 'Since',
        Cell: ({ cell }) => moment(cell.getContext().getValue() as number).format('MM/DD/YYYY HH:mm')
      },
      {
        id: 'last_connected_at',
        accessorKey: 'last_connected_at',
        header: 'Last connected',
        Cell: ({ cell }) => moment(cell.getContext().getValue() as number).format('MM/DD/YYYY HH:mm')
      },
      {
        id: 'cpu',
        accessorKey: 'cpu',
        header: 'Cores',
      },
      {
        id: 'ram',
        accessorKey: 'ram',
        header: 'Memory',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
      },
      {
        id: 'disk',
        accessorKey: 'disk',
        header: 'Disk',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
      },
    ],
    [],
  );

  return (
      <ReactQueryTable
        // Data
        columns={columns}
        data={nodes}
      />
  );
}

export default Nodes
