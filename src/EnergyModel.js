class EnergyModel{

    constructor(){
        this.devices = [
        {id: 1, name: 'Lamp', consumption: [[8, 10002],[8, 10003],[9, 10004],[7, 10005],[10, 10006],[6, 10007],[8, 10008]], periodConsumption: [], periodTotal: 0},
        {id: 2, name: 'Fan', consumption: [[15, 10002],[15, 10003],[21, 10004],[22, 10005],[20, 10006],[15, 10007],[15, 10008]], periodConsumption: [], periodTotal: 0},
        {id: 3, name: 'TV', consumption: [[0, 10002],[0, 10003],[0, 10004],[43, 10005],[44, 10006],[44, 10007],[43, 10008]], periodConsumption: [], periodTotal: 0}];
        this.isSignedIn = false;
        this.testText = "Text from model";
        this.emailAddress = "holder";
        this.startTime = 0;
        this.endTime = 99999999;
        this.updatePeriodConsumption();
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
            this.devices[i].periodConsumption = [... this.devices[i].consumption.filter(this.periodCheck.bind(this))];
            // this.devices[i].periodTotal = this.devices[i].periodConsumption.map()
            let holder = 0;
            for (let j = 0; j < this.devices[i].periodConsumption.length; j++){
                holder = holder + this.devices[i].periodConsumption[j][0];
            }
            this.devices[i].periodTotal = holder;
        }
        console.log(this.devices[0].periodConsumption)
        console.log(this.devices[1].periodConsumption)
        console.log(this.devices[2].periodConsumption)

        console.log(this.devices[0].periodTotal)
        console.log(this.devices[1].periodTotal)
        console.log(this.devices[2].periodTotal)
    }

    setPeriod(start, end){
        this.startTime = start;
        this.endTime = end;
    }

}

export default EnergyModel;