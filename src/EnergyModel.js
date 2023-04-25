class EnergyModel{

    constructor(){
        this.devices = [
        {id: 1, name: 'Lamp', consumption: [[8, 10002],[8, 10003],[9, 10004],[7, 10005],[10, 10006],[6, 10007],[8, 10008]]},
        {id: 2, name: 'Fan', consumption: [[15, 10002],[15, 10003],[21, 10004],[22, 10005],[20, 10006],[15, 10007],[15, 10008]]},
        {id: 3, name: 'TV', consumption: [[0, 10002],[0, 10003],[0, 10004],[43, 10005],[44, 10006],[44, 10007],[43, 10008]]}];
        this.isSignedIn = false;
        this.testText = "Text from model";
        this.emailAddress = "holder";
    }

    setEmail(mail){
        this.emailAddress = mail;
    }

}

export default EnergyModel;