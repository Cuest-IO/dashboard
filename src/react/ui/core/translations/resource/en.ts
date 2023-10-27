import { ResourceLanguage } from 'i18next';

const resourceLanguage: ResourceLanguage = {
  language: {
    name: 'English',
  },
  core: {
    cuest: 'Cuest',
    dashboard: 'Dashboard',
    cluster: 'Cluster',
    clusters: 'Clusters',
    node: 'Node',
    nodes: 'Nodes'
  },
  common: {
    search: 'Search',
    active: 'Active',
    cancel: 'Cancel',
    delete: 'Delete',
    save: 'Save',
    add: 'Add'
  },
  dashboard: {
    system: 'System',
    view_clusters: 'View clusters',
    view_nodes: 'View nodes',
    cluster_name: 'Cluster Name',
    num_of_nodes: '# of Nodes',
    report_a_problem: 'Report a problem',
    last: 'Last',
    current: 'Current',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    aws_avoided_cost: 'AWS avoided cost',
    cpu_runtime: 'CPU runtime',
    workloads_executed: 'Workloads executed'
  },
  clusters: {

  },
  nodes: {
    suspend: 'Suspend',
    block: 'Block',
    enable: 'Enable'
  },
  cluster_view: {
    waiting_for_nodes: 'Waiting for nodes to connect',
    image_name: 'Image name',
    status: 'Status',
    read_time: 'Read Time',
    available: 'Available',
    in_use: 'In use',
    allocated: 'Allocated',
    suspend: 'Suspend',
    block: 'Block',
    enable: 'Enable'
  }
};

export default resourceLanguage;