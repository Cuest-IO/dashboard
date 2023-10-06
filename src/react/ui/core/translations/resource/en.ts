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
    report_a_problem: 'Report a problem'
  },
  clusters: {

  },
  nodes: {

  },
  cluster_view: {
    waiting_nodes: 'Waiting for nodes to connect',
    image_name: 'Image name',
    status: 'Status',
    read_time: 'Read Time',
    available: 'Available',
    in_use: 'In use',
    allocated: 'Allocated',
  }
};

export default resourceLanguage;
