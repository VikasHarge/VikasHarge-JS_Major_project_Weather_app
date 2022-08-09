
// selectors

const app = document.querySelector('.weather_app')
const temp = document.querySelector('.temp')
const timeOutput = document.querySelector('.time')
const dateOutput = document.getElementById('date')
const monthOutput = document.querySelector('.month')
const yearOutput = document.querySelector('.year')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const wind = document.querySelector('.windSpeed')
const form = document.getElementById('locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')




// months array
const setMonth = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];

// default city when page loads
let cityInput = "Thane";


// listes cities
cities.forEach((city)=>{
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        app.style.opacity = "0"
        fetchWeatherData();

    })
})

// city from input
btn.addEventListener('click', (e)=>{

    e.preventDefault()

    if(search.value.length == 0){
        alert("please enter city name")
    } else {
        cityInput = search.value;
        app.style.opacity = "0"

        fetchWeatherData();
        search.value=""

    }
})



// to change icons as per day or night

    let isDay = false;
    let newDate = "";

    (function isDayFn(){

        const date = new Date();
        const hr = Number(date.getHours())
         
        if(hr < 19){
            isDay = true;
        }

    })();


    // for current date

    (function setDate(){

        const date = new Date();
   
        const month = setMonth[date.getMonth()];
        const newDay = date.getDate()
        const year = date.getFullYear()

        const completeDate = `${newDay} ${month} ${year}`;
        dateOutput.innerHTML = completeDate

    })();



// To show date in AM PM format

    setInterval(()=>{

        let date = new Date();
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let secound = date.getSeconds()


        var ampm = hours >=12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        secound = secound <10 ? '0'+ secound : secound;
        var strTime = hours + "  :  " + minutes + "  :  " + secound + "  :  " + ampm;
        timeOutput.innerHTML = strTime

    }, 1000)




// API data Fetch function

function fetchWeatherData(){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=f9db659e83cbbf668ae1c5798bbfb316&units=metric`)
    .then(response => response.json())
    .then(data => {
        
        // Data to show 

        temp.innerHTML = data.main.temp + "&#176;"
        nameOutput.innerHTML = data.name;
        conditionOutput.innerHTML = data.weather[0].description;
        cloudOutput.innerHTML = data.clouds.all + "%";
        humidityOutput.innerHTML = data.main.humidity + "%"
        wind.innerHTML = data.wind.speed + "km/h"

 
        // Icons

        const symbol = data.weather[0].main
        console.log(symbol);

        if(isDay){
            icon.src = `./media/weather/weather/64x64/day/${symbol}.png`
        } else {
            icon.src = `./media/weather/weather/64x64/night/${symbol}.png`
        }

        
        //background

        if(String(data.name) === "Mumbai"){
            app.style.backgroundImage = `url(./media/day/Mumbai.jpg)`
        } else if(String(data.name) === "Pune")  {
            app.style.backgroundImage = `url(./media/day/Pune.jpg)`
        } else if(String(data.name) === "Chennai")  {
            app.style.backgroundImage = `url(./media/day/Chennai.jpg)`
        } else if(String(data.name) === "Delhi")  {
            app.style.backgroundImage = `url(./media/day/Delhi.jpg)`
        } else {
            app.style.backgroundImage = `url(./media/day/cloudy.jpg)`
        }

        app.style.opacity = "1"
    })
    .catch(()=>{
        alert("city not found, please try again");
        app.style.opacity = "1"
    });

}


fetchWeatherData()
app.style.opacity = "1"




    

    

// API with key That has been used 

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// f9db659e83cbbf668ae1c5798bbfb316


