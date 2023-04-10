import * as moment from 'moment';

export const userProfile = {
        id: 111,
        firstName: "William",
        lastName: "Jersey",
        email: "william@gmail.com",
        phone: "(665)121-5454",
        access: "owner",
        account: "TechMonster LTD",
        accountId: 1111111
    }

function createNodeData(nodeId, activeSince, group, cores, memory, coresUsed, memoryUsed, runtimeHours) {
    return { nodeId, activeSince, group, cores, memory, coresUsed, memoryUsed, runtimeHours };
    }
    
function createClusterData(id,  group,  running,  completed,  interrupted,  totalTime) {
    return { id, group, running, completed, interrupted, totalTime };
}
  
function populateNodes () {
  let content = [];
  for (let i = 0; i < 20; i++) {
    content.push(createNodeData(i, "Feb 1", "Default", 8, "8GB", 2, "2GB", 10));
  }
  return content;
}

function populateClusters () {
  return [createClusterData("Default", "Default", 3, 10, 2, 40)];
  // let content = [];
  // for (let i = 0; i < 5; i++) {
  //   content.push(createClusterData("Cluster"+i, "Default", 3, 10, 2, 40));
  // }
  // return content;
}

export const rows = populateNodes () ;
export const clusterRows = populateClusters () ;

export const clusterDataView = [
  {
    nodeId: 111,
    data:[
/*      { timestamp:moment().utc().subtract(300, 'S').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "12", usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(280, 'S').valueOf(),  totalCPU: "6", availCPU: "4", totalMemory: 32, availMemory: "11", usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(260, 's').valueOf(),  totalCPU: "6", availCPU: "5", totalMemory: 32, availMemory: "10", usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(240, 's').valueOf(),  totalCPU: "6", availCPU: "6", totalMemory: 32, availMemory: "4",  usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(220, 's').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "1",  usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(200, 's').valueOf(),  totalCPU: "6", availCPU: "1", totalMemory: 32, availMemory: "1",  usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(180, 's').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "2",  usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(160, 's').valueOf(),  totalCPU: "6", availCPU: "2", totalMemory: 32, availMemory: "2",  usedCPU: "2", usedMemory: "4" },
  
      { timestamp:moment().utc().subtract(140, 's').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "3",  usedCPU: "2", usedMemory: "4" },
      */
       { timestamp:moment().utc().subtract(120, 's').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "18",  usedCPU: "7", usedMemory: 6 },
      { timestamp:moment().utc().subtract(100, 's').valueOf(),  totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "9",  usedCPU: "2", usedMemory: 4 },
      { timestamp:moment().utc().subtract(80,  's').valueOf(),   totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "6",  usedCPU: "5", usedMemory: 2},
      { timestamp:moment().utc().subtract(60,  's').valueOf(),   totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "14",  usedCPU: "2", usedMemory: 7},
      { timestamp:moment().utc().subtract(40,  's').valueOf(),   totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "10",  usedCPU: "3", usedMemory: 7},
      { timestamp:moment().utc().subtract(20,  's').valueOf(),   totalCPU: "6", availCPU: "3", totalMemory: 32, availMemory: "8",  usedCPU: "3", usedMemory: 6}
    ]
  },
  {
    nodeId: 222,
    data:[
      { timestamp:moment().utc().subtract(120, 's').valueOf(),  totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "8",  usedCPU: "5", usedMemory: "4" },
      { timestamp:moment().utc().subtract(100, 's').valueOf(),  totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "9",  usedCPU: "2", usedMemory: "4" },
      { timestamp:moment().utc().subtract(80,  's').valueOf(),   totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "10",  usedCPU: "4", usedMemory: "6"},
      { timestamp:moment().utc().subtract(60,  's').valueOf(),   totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "6",  usedCPU: "3", usedMemory: "5"},
      { timestamp:moment().utc().subtract(40,  's').valueOf(),   totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "5",  usedCPU: "2", usedMemory: "1"},
      { timestamp:moment().utc().subtract(20,  's').valueOf(),   totalCPU: "4", availCPU: "3", totalMemory: 12, availMemory: "7",  usedCPU: "1", usedMemory: "3"}
    ]
  }
]



