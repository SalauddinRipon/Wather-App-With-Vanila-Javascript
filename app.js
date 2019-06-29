window.addEventListener("load", ()=> {
let long;
let lat;
let temperatureDegree= document.querySelector('.temperature-degree');
let temperatureDescription=document.querySelector('.temperature-description')
let locationTimezone=document.querySelector('.location-timezone')
let temperatureSection=document.querySelector('.temperature')
let temperatureSectionSpan=document.querySelector('.temperature span');



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        long=position.coords.longitude;
        lat=position.coords.latitude;

        const proxy="https://cors-anywhere.herokuapp.com/"
        const api =`${proxy}https://api.darksky.net/forecast/0a992eb3875fe8931d75ada82335d22f/${lat},${long}`;
        fetch(api)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const {temperature,summary,icon}= data.currently;
            //Set Dom Elements From Api;
            temperatureDegree.textContent=temperature;
            temperatureDescription.textContent=summary;
            locationTimezone.textContent=data.timezone;
            //Formula for celsious
            let celsious=(temperature - 32)*(5 / 9);
            //Set Icon

            setIcons(icon, document.querySelector('.icon'));

            //Change temperature to Celsious 

            temperatureSection.addEventListener('click', () => {
                if(temperatureSectionSpan.textContent === "F"){
                    temperatureSectionSpan.te
                    temperatureDegree.textContent=Math.floor(celsious);
                }
                else{
                    temperatureSectionSpan.textContent= "F";
                    temperatureDegree.textContent=temperature
                }
            }) 





        });
        
    });

   
}
    function setIcons(icon,iconID){
        const skycons= new Skycons({color:"white"});
        const currenIcon= icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currenIcon]);
    }

});