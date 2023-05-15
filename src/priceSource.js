import EnergyModel from "./EnergyModel";

function getCurrentPrice(model){  
    const date = new Date();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString();
    const month=(date.getMonth()+1).toString().padStart(2, '0');
    const day=date.getDate().toString().padStart(2, '0');


    console.log(year+" "+month+" "+ day);
        
    return fetch("https://www.elprisetjustnu.se/api/v1/prices/"
        +year+"/"+month+"-"+day+"_"+"SE3"+".json", { 
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
    
     /*                 //www.elprisetjustnu.se/api/v1/prices/2023/4-5_SE3.json
    return fetch("https://www.elprisetjustnu.se/api/v1/prices/2023/05-05_SE3.json",{
       method: "GET"
    }
    ).then(treatHTTPResponseACB);
    */
}

function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}



function lookupPrice(year, month, day){

    // Format "2023", "02", "05"
    return fetch("https://www.elprisetjustnu.se/api/v1/prices/"
        +year+"/"+month+"-"+day+"_SE3.json", { 
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

export{getCurrentPrice, lookupPrice}