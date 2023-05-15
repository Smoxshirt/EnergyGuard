import { writeUserData, isLoggedIn, getEmail, readUserDataModel, listenToUserData, readUserDataOnce } from "./firebaseModel.js";
import { getCurrentPrice } from "./priceSource.js";
import { resolvePromise } from "./resolvePromise.js";

class EnergyModel{

    constructor(){
        this.observers = [];
        /* this.devices = [
        {id: 1, name: 'Lamp', isTurnedOn: false, expanded: false, consumption: [[8, 10002],[8, 10003],[9, 10004],[7, 10005],[10, 10006],[6, 10007],[8, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0},
        {id: 2, name: 'Fan', isTurnedOn: false, expanded: false, consumption: [[15, 10002],[15, 10003],[21, 10004],[22, 10005],[20, 10006],[15, 10007],[15, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0},
        {id: 3, name: 'TV', isTurnedOn: false, expanded: false, consumption: [[0, 10002],[0, 10003],[0, 10004],[43, 10005],[44, 10006],[44, 10007],[43, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0},
        {id: 4, name: 'Fridge', isTurnedOn: false, expanded: false, consumption: [[30, 10002],[29, 10003],[31, 10004],[24, 10005],[23, 10006],[24, 10007],[17, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0},
        {id: 5, name: 'Computer', isTurnedOn: false, expanded: false, consumption: [[20, 10002],[5, 10003],[4, 10004],[8, 10005],[7, 10006],[6, 10007],[6, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0}];
        */
        // this.devices = [{id: 1, name: 'Lamp', isTurnedOn: false, expanded: false, consumption: [], 
        // periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: [], timer: false, timerEndDate: 0}];
        this.devices = null;
        this.isSignedIn = false;
        this.testText = "Text from model";
        this.emailAddress = "";
        this.startTime = Date.now() - 604800000;
        this.endTime = Date.now();
        this.updatePeriodConsumption();
        this.pricePromiseState = {};
        this.waitingForUserData = true;
        this.statusSnapshot = [];
        this.statusReady = false;
        this.consumptionSnapshot = [];
        this.consumptionReady = false;
        this.hasDevices = false;
        this.reBuildInProgress = false;
        this.isListening = false;
        this.setIntervalID = 0;
        this.priceZone="SE3";
    }

    activateTimerCountdown(){
        for(let i = 0; i < this.devices.length; i++){
            if(this.devices[i].timer){
                let diff = this.devices[i].timerEndDate - Date.now();
                diff = Math.floor(diff/1000);
                this.devices[i].timerCountdownValue = diff;
                let days = Math.floor(diff/86400);
                let hours = Math.floor((diff % 86400)/3600);
                let minutes = Math.floor((diff % 3600)/60);
                let seconds = Math.floor((diff % 60));
                var countdownString;
                if(days !== 0){
                    countdownString = days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
                }else if(hours !== 0){
                    countdownString = hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
                }else if(minutes !== 0){
                    countdownString = minutes + " minutes, " + seconds + " seconds";
                }else if(seconds !== 0){
                    countdownString = seconds + " seconds";
                }else{
                    countdownString = "0 seconds";
                }
                this.devices[i].timerCountdown = countdownString;
            }
        }
        this.setIntervalID = setInterval(this.updateTimerCountdown.bind(this), 1000);
    }

    updateTimerCountdown(){
        for(let i = 0; i < this.devices.length; i++){
            if(this.devices[i].timer){
                this.devices[i].timerCountdownValue--;
                let days = Math.floor(this.devices[i].timerCountdownValue/86400);
                let hours = Math.floor((this.devices[i].timerCountdownValue % 86400)/3600);
                let minutes = Math.floor((this.devices[i].timerCountdownValue % 3600)/60);
                let seconds = Math.floor((this.devices[i].timerCountdownValue % 60));
                var countdownString;
                if(days !== 0){
                    countdownString = days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
                }else if(hours !== 0){
                    countdownString = hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
                }else if(minutes !== 0){
                    countdownString = minutes + " minutes, " + seconds + " seconds";
                }else if(seconds !== 0){
                    countdownString = seconds + " seconds";
                }else{
                    countdownString = "0 seconds";
                }
                this.devices[i].timerCountdown = countdownString;
            }
         }
        }

    cancelTimer(){
        clearInterval(this.setIntervalID);
    }

    updateDeviceStatus(status){
        this.statusSnapshot = status;
        this.statusReady = true;
        this.updateDeviceList();
    }

    updateDeviceConsumption(consumption){
        this.consumptionSnapshot = consumption;
        this.consumptionReady = true;
        this.updateDeviceList();
    }

    updateDeviceList(){
        if(this.statusSnapshot === null || this.consumptionSnapshot === null){
            this.hasDevices = false;
            return;
        }

        if(this.statusReady && this.consumptionReady){
            this.devices = [];
            let deviceIndex = 0;
            var statusLength = 0;
            if(this.statusSnapshot !== null){
                statusLength = this.statusSnapshot.length;
            }
            for (let i = 0; i < statusLength; i++){
                if(this.statusSnapshot[i].isActive){
                    const device = {
                        id: this.statusSnapshot[i].id,
                        macAddr: this.statusSnapshot[i].macAddr,
                        name: this.statusSnapshot[i].name,
                        isTurnedOn: this.statusSnapshot[i].isTurnedOn,
                        expanded: false,
                        periodConsumption: [],
                        periodTotal: 0,
                        graphData: [],
                        graphLabels: [],
                        timer: this.statusSnapshot[i].timer,
                        timerEndDate: this.statusSnapshot[i].timerEndDate,
                        index: i,
                        intIndex: deviceIndex,
                        consumption: this.consumptionSnapshot[i].values,
                        timerCountdown: "0 seconds",
                        timerCountdownValue: 0,
                    };
                    this.devices = [...this.devices, device];
                    deviceIndex++;
                }
            }
            if(this.devices.length === 0){
                this.hasDevices = false;
            }else{
                this.hasDevices = true;
            }
            this.updatePeriodConsumption();
            if(!this.isListening){
                listenToUserData("consumption", this.updateConsumption.bind(this));
                listenToUserData("status", this.updateStatus.bind(this));
                this.isListening = true;
            }

            this.reBuildInProgress = false;
        }
    }

    oneTimeConsumptionCallback(snapshot){
        this.updateDeviceConsumption(snapshot.val());
    }

    oneTimeStatusCallback(snapshot){
        this.updateDeviceStatus(snapshot.val())
    }

    updateStatus(snapshot){
        console.log("Status callback");
        var snapVal = snapshot.val();
        console.log(snapVal);

        var deviceCount = 0;
        for(let i = 0; i < snapVal.length; i++){
            if(snapVal[i].isActive === true){
                deviceCount++;
            }
        }
        
        if(this.hasDevices){
            
            if(deviceCount === this.devices.length){
                for(let i = 0; i < this.devices.length; i++){
                    this.devices[i].isTurnedOn = snapVal[this.devices[i].index].isTurnedOn;
                    this.devices[i].name = snapVal[this.devices[i].index].name;
                    this.devices[i].timer = snapVal[this.devices[i].index].timer;
                    this.devices[i].timerEndDate = snapVal[this.devices[i].index].timerEndDate;
                }
            }else{
                if(!this.reBuildInProgress){
                    this.reBuildInProgress = true;
                    readUserDataOnce("consumption", this.oneTimeConsumptionCallback.bind(this));
                    readUserDataOnce("status", this.oneTimeStatusCallback.bind(this));
                }
            }


        }else{
            if(deviceCount > 0){
                readUserDataOnce("consumption", this.oneTimeConsumptionCallback.bind(this));
                readUserDataOnce("status", this.oneTimeStatusCallback.bind(this));
            }
        }
    }

    updateConsumption(snapshot){
        console.log("Listen callback");
        console.log(snapshot.val());
        if(this.hasDevices){
            for(let i = 0; i < this.devices.length; i++){
                this.devices[i].consumption = snapshot.val()[this.devices[i].index].values;
            }
        }
    }


    updateUserStatus(){
        this.isSignedIn = isLoggedIn();
        this.emailAddress = getEmail();
        console.log(this.isSignedIn);
        console.log(this.emailAddress);
    }

    addDeviceListToDatabase(){
        writeUserData("devicelist", this.devices)
    }

    setEmail(mail){
        this.emailAddress = mail;
    }

    periodCheck(update){
        // return (update[1] === this.startTime || (update[1] > this.startTime && update[1] < this.endTime) || update[1] === this.endTime);
        return (update[1] <= this.endTime && update[1] >= this.startTime);
    }

    updatePeriodConsumption(){
        if(this.devices === null){
            return;
        }
        for (let i = 0; i < this.devices.length; i++){
            console.log(this.devices[i].id)
            this.devices[i].periodConsumption = this.devices[i].consumption.filter(this.periodCheck.bind(this));
            // this.devices[i].periodTotal = this.devices[i].periodConsumption.map()
            let holder = 0;
            for (let j = 0; j < this.devices[i].periodConsumption.length; j++){
                holder = holder + this.devices[i].periodConsumption[j][0];
            }
            this.devices[i].periodTotal = holder;
            this.generateGraphArrays(i);
        }
    }

    generateGraphArrays(deviceIndex){
        const listLength = this.devices[deviceIndex].periodConsumption.length;

        if(listLength > 10){
            const chunkSize = Math.floor(listLength/10);
            this.devices[deviceIndex].graphData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.devices[deviceIndex].graphLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let counter = 0;
            let smallIndex = 0;
            for (let i = 0; i < listLength; i++){
                counter++;
                this.devices[deviceIndex].graphData[smallIndex] = this.devices[deviceIndex].graphData[smallIndex] + this.devices[deviceIndex].periodConsumption[i][0];
                if(counter === chunkSize && smallIndex !== 9){
                    this.devices[deviceIndex].graphLabels[smallIndex] = this.devices[deviceIndex].periodConsumption[i][1];
                    this.devices[deviceIndex].graphData[smallIndex] = this.devices[deviceIndex].graphData[smallIndex] / counter;
                    counter = 0;
                    smallIndex++;
                }else if(i === (listLength - 1)){
                    this.devices[deviceIndex].graphLabels[smallIndex] = this.devices[deviceIndex].periodConsumption[i][1];
                    this.devices[deviceIndex].graphData[smallIndex] = this.devices[deviceIndex].graphData[smallIndex] / counter;
                    counter = 0;
                }
            }
        }else{
            this.devices[deviceIndex].graphData = new Array(listLength);
            this.devices[deviceIndex].graphLabels = new Array(listLength);
            for (let i = 0; i < listLength; i++){
                this.devices[deviceIndex].graphData[i] = this.devices[deviceIndex].periodConsumption[i][0];
                this.devices[deviceIndex].graphLabels[i] = this.devices[deviceIndex].periodConsumption[i][1];
            }
        }

        /* this.devices[deviceIndex].graphData = new Array(this.devices[deviceIndex].periodConsumption.length);
        this.devices[deviceIndex].graphLabels = new Array(this.devices[deviceIndex].periodConsumption.length);
        for (let i = 0; i < this.devices[deviceIndex].periodConsumption.length; i++){
            this.devices[deviceIndex].graphData[i] = this.devices[deviceIndex].periodConsumption[i][0];
            this.devices[deviceIndex].graphLabels[i] = this.devices[deviceIndex].periodConsumption[i][1];
        } */
    }

    setPeriod(start, end){
        this.startTime = start;
        this.endTime = end;
    }

    getCurrentEnergyPrice(){
        resolvePromise(getCurrentPrice(), this.pricePromiseState)
    }

    addDevice(){

    }

    removeDevice(){

    }

    updateZone(payload){

    }

    returnZone(){
        return this.priceZone;
    }

    notifyObservers(payload){
        function invokeObserverCB(obs){
            try{obs(payload);}
            catch(err){console.log(err);}
        }
        this.observers.forEach(invokeObserverCB);
    }

    addObserver(addObserverACB){
        this.observers = [...this.observers, addObserverACB];
    }

    removeObserver(removeObserverACB){
        function removeObsCB(obs){
            return obs!==removeObserverACB;
        }
        this.observers = this.observers.filter(removeObsCB);
    }
}

export default EnergyModel;