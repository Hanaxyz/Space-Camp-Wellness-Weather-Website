weatherArray={
Sunny:{
Morning:["Mint frosting", "Watermelon"],
Afternoon:["Pineapple", "Strawberry frosting"],
Evening:["Vanilla", "Strawberry frosting"],
Night:["Mint frosting","Watermelon","Pineapple"]

},

Rainy:{
Morning:["Berry stardust", "Vanilla","Birthday cake"],
Afternoon:["Salted caramel", "Wild cherry"],
Evening:["Birthday cake", "Vanilla"],
Night:["Vanilla", "Salted caramel"]



},

Cloudy:{

Morning:["Berry stardust", "Vanilla","Coconut",],
Afternoon:["Coconut","Berry stardust"],
Evening:["Coconut", "Vanilla"],
Night:["Berry stardust", "Vanilla","Coconut"]

},


Cold:{

Morning:["Salted caramel", "Birthday cake"],
Afternoon:["Berry stardust","Coconut"],
Evening:["Salted caramel", "Wild cherry"],
Night:["Birthday cake","Berry stardust"]

}
};




const msgBgArray={
"Sunny" :{

 Morning:{message:"Good morning sunshine! Start your day with your favourite lip balm Brand > Space Camp ",video:"sunrise.mp4"},
Afternoon:{ message:"Clear skies and even clearer vibes. Stay hydrated with Space Camp !",video:"sunnyDay.mp4"},
Evening:{ message:"Golden hour and golden lips. Stay smooth with Space Camp !",video:"sunnyDay.mp4"},
Night:{message:"Good Night . Your lips deserves some care ",video:"nightclear.mp4"}
} 
    ,
    "Rainy": {
        "Morning": { message: "Good morning Camper!,  Keep your lips soft with Space Camp", video: "rain.mp4" },
        "Afternoon": { message: "It’s a rainy afternoon. Perfect for some extra balm.", video: "rain.mp4" },
        "Evening": { message: "Rain against the window, balm on your lips. Total mood.", video: "rain.mp4" },
        "Night": { message: "Rainy night, calm vibes , Did you forget your Space Camp lip balm? ", video: "rainnight.mp4" }
    },

    "Cloudy": {
        "Morning": { message: "Cloudy morning, dreaming big. Don’t forget your Space Camp shine.", video: "shine.mp4" },
        "Afternoon": { message: "Don't forget to use Space Camp  lip balms to feel like fluffy clouds .", video: "cloud1.mp4" },
        "Evening": { message: "Cloudy evening, low-key vibes. Stay smooth with Space Camp .", video: "cloudev2.mp4" },
        "Night": { message: "Dreaming under the clouds. Keep your glow locked in .", video: "nightcloud.mp4" }
    },

    "Cold": {
        "Morning": { message: "Freezing out there! Keep your smile protected  with Space Camp.", video: "snowmorning.mp4" },
        "Afternoon": { message: "Chilly afternoon? Time for a little extra moisture.", video: "snow.mp4" },
        "Evening": { message: "Cold air, cozy heart. Your glow is weather proof.", video: "snow.mp4" },
        "Night": { message: "Frosty night. warm dreams. Keep  your lips hydrated with Space Camp.", video: "snownight.mp4" }
    }


}


function getStatus(apiStatus){
if (apiStatus === "Clouds") return "Cloudy";
    if (apiStatus === "Clear") return "Sunny";
    if (apiStatus === "Rain") return "Rainy";
    
    return "Cold"

}
// start of the choosing flavor function : 

function getPartOfTheDay(data){

    const timezoneOffset = data.city.timezone;
    const now = new Date(); 
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (timezoneOffset * 1000)); 
    
    const hour = localTime.getHours(); 
    
  

if (hour >= 5 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 20) return "Evening";
    return 'Night'

}


function myWindow(){
const about=document.getElementById("my-window");
if(about.style.display==='block'){

    about.style.display='none';




}

else{
  about.style.display='block';


}




}



function chooseFlavor(status,time){
    const options=weatherArray[status][time];
    const randomIndex=Math.floor(Math.random()*options.length);
    return options[randomIndex];






}


function chooseIcon(status,time){
    const icons={

        // decide the time : day or night :

        "Sunny-Night":"moon2",

        "Sunny-Morning":"sunny",
        "Cloudy":"cloudy",
        "Rainy":"rainy",
        "Cold":"snowy"

  
    };

    const imageName=status +"-"+time;
    


    return icons[imageName]|| icons[status]||'sunny';





}







//this part is for handling errors : 
async function getWeather(){
    

const apiKey = '3d394915241c935c1fa46d3b1c2f5b9a';
const city = document.getElementById("city-input") ;
const cityvalue=city.value.trim()||'Boston';
const cityName=document.getElementById("city");




const url =  `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityvalue)}&appid=${apiKey}&units=metric`;

try{

const response= await fetch(url);
console.log("Response Status:", response.status);

if(!response.ok){

    throw new Error ("City not found");
}
const data=await response.json();
console.log("Data returned:", data);
cityName.innerText = data.city.name;



updateUI(data);

}


catch(error){

alert("City not found, please try again!");

}

}

window.onload=getWeather;

//update for the upper part 
function updateUI(data) {

    

    
 
        const currentData=data.list[0];
          const apiStatus=currentData.weather[0].main;
         const myStatus=getStatus(apiStatus);


    const time=currentData.dt_txt.substring(11,16);
    const nowTime=getPartOfTheDay(data)


        //msg

    const effect=msgBgArray[myStatus][nowTime];
    document.querySelector(".advice-container").innerText = effect.message;


//video :
const videoElement = document.getElementById("bg-video");
const videoSource = videoElement.querySelector("source");

videoSource.src=`assets/bg/${effect.video}`;
videoElement.load();





        
        const temp = Math.round(currentData.main.temp);
        document.getElementById('temp').innerText = temp + "°";


     const statue=currentData.weather[0].main;
     document.getElementById("statue").innerText=statue;
   


            const highestT=Math.round(currentData.main.temp_max);
        document.getElementById("highest-T").innerText="H :"+highestT+ "°";


           const lowestT=Math.round(currentData.main.temp_min);
        document.getElementById("lowest-T").innerText="L :"+lowestT+ "°";



       //update the day-container:

      

             
 const selectedHours = ["09:00", "12:00", "15:00", "18:00", "21:00"];

 const filteredList = data.list.filter(t => {
    const time = t.dt_txt.substring(11, 16);
    return selectedHours.includes(time);
}).slice(0, 5);

 let html='';

filteredList.forEach(t => {
  

            const apiStatus=t.weather[0].main;
         const myStatus=getStatus(apiStatus);


       const time=t.dt_txt.substring(11,16);
    const currentHour = parseInt(time.split(':')[0]);
    let itemPartOfDay = 'Night';
    if (currentHour >= 5 && currentHour < 12) itemPartOfDay = "Morning";
    else if (currentHour >= 12 && currentHour < 17) itemPartOfDay = "Afternoon";
    else if (currentHour >= 17 && currentHour < 20) itemPartOfDay = "Evening";

const temprature = Math.round(t.main.temp);
const myFlavor = chooseFlavor(myStatus, itemPartOfDay);



const fileName = myFlavor.toLowerCase().replace(/\s/g, '') ;

  html += `<div class="day-row">
                        <div class="time">${t.dt_txt.substring(11, 16)}</div>
                        <img src="assets/images/${fileName}.png" class="balm-img">
                        <div class="temp">${temprature}°</div>
                     </div>`;
}
);

let html1='';
let headerHtml=`<div class="week-header">
<img src="assets/icons/calender.png" class="calender">
<h3>Weekly Forecast</h3>
</div>


`


const midDay=data.list.filter(w =>  w.dt_txt.includes('12:00:00'));

midDay.forEach(w => {
    const date=new Date(w.dt_txt);
const dayName=date.toLocaleDateString('en-US',{weekday:'short'});
const apiStatus=w.weather[0].main;
const myStatus=getStatus(apiStatus);
const myFlavor= chooseFlavor(myStatus, 'Afternoon');
const fileName = myFlavor.toLowerCase().replace(/\s/g, '');

const iconName=chooseIcon(myStatus,'Afternoon');

    html1+=`<div class="hour-card">
    <div class="time">${dayName}</div>
    <img src="assets/images/${fileName}.png" class="balm-img">
    <img src="assets/icons/${iconName}.png" class="weather-icon">

    </div>
    
    `
    
    
    });








document.querySelector(".today-container").innerHTML = html;

document.querySelector(".week-container").innerHTML =html1+headerHtml;



    


  
}
























