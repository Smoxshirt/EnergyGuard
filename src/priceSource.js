function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}

function getCurrentPrice(){  
    const date = new Date();
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString();
    let month="01";
    let day="01";

    if(date.getMonth()<10){
         month="0"+date.getMonth().toString()
    } else {
         month=date.getMonth().toString()
    }

    if(date.getDay()<10){
         day="0"+date.getDay().toString()
    } else {
         day=date.getDay().toString()
    }

    
    return fetch("https://www.elprisetjustnu.se/api/v1/prices/"
        +year+"/"+month+"-"+day+"_SE3.json", { 
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


function lookupPrice(year, month, day){

    // Format "2023", "02", "05"
    return fetch("https://www.elprisetjustnu.se/api/v1/prices/"
        +year+"/"+month+"-"+day+"_SE3.json", { 
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

export{getCurrentPrice, lookupPrice}