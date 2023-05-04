import { writeUserData } from "./firebaseModel.js"

class EnergyModel{

    constructor(){
        this.devices = [
        {id: 1, name: 'Lamp', isTurnedOn: false, expanded: false, consumption: [[8, 10002],[8, 10003],[9, 10004],[7, 10005],[10, 10006],[6, 10007],[8, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: []},
        {id: 2, name: 'Fan', isTurnedOn: false, expanded: false, consumption: [[15, 10002],[15, 10003],[21, 10004],[22, 10005],[20, 10006],[15, 10007],[15, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: []},
        {id: 3, name: 'TV', isTurnedOn: false, expanded: false, consumption: [[0, 10002],[0, 10003],[0, 10004],[43, 10005],[44, 10006],[44, 10007],[43, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: []},
        {id: 4, name: 'Fridge', isTurnedOn: false, expanded: false, consumption: [[30, 10002],[29, 10003],[31, 10004],[24, 10005],[23, 10006],[24, 10007],[17, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: []},
        {id: 5, name: 'Computer', isTurnedOn: false, expanded: false, consumption: [[20, 10002],[5, 10003],[4, 10004],[8, 10005],[7, 10006],[6, 10007],[6, 10008]], periodConsumption: [], periodTotal: 0, graphData: [], graphLabels: []}];
        this.isSignedIn = false;
        this.testText = "Text from model";
        this.emailAddress = "holder";
        this.startTime = 0;
        this.endTime = 99999999;
        this.updatePeriodConsumption();
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
        this.devices[deviceIndex].graphData = new Array(this.devices[deviceIndex].periodConsumption.length);
        this.devices[deviceIndex].graphLabels = new Array(this.devices[deviceIndex].periodConsumption.length);
        for (let i = 0; i < this.devices[deviceIndex].periodConsumption.length; i++){
            this.devices[deviceIndex].graphData[i] = this.devices[deviceIndex].periodConsumption[i][0];
            this.devices[deviceIndex].graphLabels[i] = this.devices[deviceIndex].periodConsumption[i][1];
        }
    }

    setPeriod(start, end){
        this.startTime = start;
        this.endTime = end;
    }

}

export default EnergyModel;