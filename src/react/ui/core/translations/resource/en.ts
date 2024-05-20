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
    add: 'Add',
    edit: 'Edit',
    ok: 'OK',
    suspended_node_workloads_dialog_message: 'Currently running workloads will run until completed'
  },
  dashboard: {
    system: 'System',
    system_load: 'System load',
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
    workloads_executed: 'Workloads executed',
    system_capacity: 'System capacity'
  },
  clusters: {
    edit_cluster: 'Edit cluster'
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
  },
  account: {
    loadingStatus: 'Loading account status...',
    creationInProgress: 'Creating your account'
  },
  access_key: {
    connect_kubernetes_cluster: 'Connect Kubernetes cluster',
    add_nodes_to_cluster: 'Add Nodes to the cluster',
    security_key_and_secret: 'Security Key and Secret',
    download_minikube: 'https://storage.googleapis.com/minikube/releases/latest/minikube-installer.exe',
    helm_description: 'Copy and run the Helm command. Please note, the command is personalized for your account and contains security keys. Please keep privately. If you intend to run multiple clusters or wish to have more personalized cluster name, please replace the cluster name with a unique and meaningful name.'
  }
};

export default resourceLanguage;
