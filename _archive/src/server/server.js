const server = require('http').createServer();
const os = require('os-utils');
const moment = require('moment');


const io= require('socket.io')(server,{
    transports: ['websocket', 'polling']
});


streamNode ("4992597671ce7fabadeff733d29da45f");
streamNode ("4992597671ce7fabadeff733d29daffs");
// streamNode ("333");
// streamNode ("444");
// streamNode ("555");


function streamNode(nodeName){
    let  nextMsg = false;
    io.on('connection', client=>{
    setInterval(()=>{
        const totalMemory= formatBytes(os.totalmem(), 1);
        const availMemory= formatBytes(os.freemem(), 1 );
        const usedMemory= totalMemory - availMemory;
        //const usedCPU = Math.round(100 * (resolve => os.cpuUsage(resolve)));
          const usedCPU = Math.floor(Math.random() * 100)
        const availCPU = 100-usedCPU;
          //const availCPU = resolve => os.cpuFree(resolve);
        //   console.log("node:"+nodeName+" msg type: "+nextMsg);
        if(nextMsg){
            const device ={

                device: nodeName,
                "time":moment().utc().valueOf(),
                info:{
                    connectivity:true,
                    state: {
                        "battery": {
                            "isCharging": false,
                            "current": 25,
                            "min": 20,
                            "enough": true
                        },
                        "device": {
                            "load": {
                                "cpu": Math.floor(Math.random() * 100)/100,
                                "disk": Math.floor(Math.random() * 100000),
                                "ram": 1-os.freememPercentage(),                            },
                            "system": {
                                "cpu": 8,
                                "disk": 476802,
                                "ram": os.totalmem()
                            }
                        },
                        "vm": {
                            "load": {
                                "cpu": Math.floor(Math.random() * 70)/100,
                                "disk": 0,
                                "ram": os.totalmem() - os.freemem(),
                            },
                            "system": {
                                "cpu": 2,
                                "disk": 20480,
                                "ram": 2200
                            }
                        }
                    },
                }
            }
            client.emit('nodeStat', JSON.stringify(device));
        }else{

            const device ={
                device: nodeName,
                "time":moment().utc().valueOf(),
                k8s:{
                    name: "cuest-echo-pod"+Math.floor(Math.random() * 5),
                    status: "Running",
                    event: "created"
                }
            }

            client.emit('nodeStat', JSON.stringify(device));
        }
        nextMsg =!nextMsg;

    }, 5000);

}
)
};


const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;


    return parseFloat((bytes / k).toFixed(dm));
    //const i = Math.floor(Math.log(bytes) / Math.log(k));
    //return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));// + ' ' + sizes[i];
  }

//   console.log(formatBytes(1024))
//   console.log(formatBytes(1024 * 1024))


server.listen(3000);
