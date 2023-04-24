class EnergyModel{

    constructor(){
        this.devices = [];
        this.isSignedIn = false;
        this.testText = "Text from model";
        this.emailAddress = "holder";
    }

    setEmail(mail){
        this.emailAddress = mail;
    }

}

export default EnergyModel;