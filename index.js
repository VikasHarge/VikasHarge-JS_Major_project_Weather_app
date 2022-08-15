
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
const indi = document.getElementById('indiLogo')
const blurScreen = document.getElementById('blurScreen')
const indipendent = document.getElementById('indipendent')



// Confetti

        var confetti = { maxCount: 150, speed: 2, frameInterval: 15, alpha: 1, gradient: !1, start: null, stop: null, toggle: null, pause: null, resume: null, togglePause: null, remove: null, isPaused: null, isRunning: null }; !function () { confetti.start = s, confetti.stop = w, confetti.toggle = function () { e ? w() : s() }, confetti.pause = u, confetti.resume = m, confetti.togglePause = function () { i ? m() : u() }, confetti.isPaused = function () { return i }, confetti.remove = function () { stop(), i = !1, a = [] }, confetti.isRunning = function () { return e }; var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, n = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"], e = !1, i = !1, o = Date.now(), a = [], r = 0, l = null; function d(t, e, i) { return t.color = n[Math.random() * n.length | 0] + (confetti.alpha + ")"), t.color2 = n[Math.random() * n.length | 0] + (confetti.alpha + ")"), t.x = Math.random() * e, t.y = Math.random() * i - i, t.diameter = 10 * Math.random() + 5, t.tilt = 10 * Math.random() - 10, t.tiltAngleIncrement = .07 * Math.random() + .05, t.tiltAngle = Math.random() * Math.PI, t } function u() { i = !0 } function m() { i = !1, c() } function c() { if (!i) if (0 === a.length) l.clearRect(0, 0, window.innerWidth, window.innerHeight), null; else { var n = Date.now(), u = n - o; (!t || u > confetti.frameInterval) && (l.clearRect(0, 0, window.innerWidth, window.innerHeight), function () { var t, n = window.innerWidth, i = window.innerHeight; r += .01; for (var o = 0; o < a.length; o++)t = a[o], !e && t.y < -15 ? t.y = i + 100 : (t.tiltAngle += t.tiltAngleIncrement, t.x += Math.sin(r) - .5, t.y += .5 * (Math.cos(r) + t.diameter + confetti.speed), t.tilt = 15 * Math.sin(t.tiltAngle)), (t.x > n + 20 || t.x < -20 || t.y > i) && (e && a.length <= confetti.maxCount ? d(t, n, i) : (a.splice(o, 1), o--)) }(), function (t) { for (var n, e, i, o, r = 0; r < a.length; r++) { if (n = a[r], t.beginPath(), t.lineWidth = n.diameter, i = n.x + n.tilt, e = i + n.diameter / 2, o = n.y + n.tilt + n.diameter / 2, confetti.gradient) { var l = t.createLinearGradient(e, n.y, i, o); l.addColorStop("0", n.color), l.addColorStop("1.0", n.color2), t.strokeStyle = l } else t.strokeStyle = n.color; t.moveTo(e, n.y), t.lineTo(i, o), t.stroke() } }(l), o = n - u % confetti.frameInterval), requestAnimationFrame(c) } } function s(t, n, o) { var r = window.innerWidth, u = window.innerHeight; window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) { return window.setTimeout(t, confetti.frameInterval) }; var m = document.getElementById("confetti-canvas"); null === m ? ((m = document.createElement("canvas")).setAttribute("id", "confetti-canvas"), m.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0"), document.body.prepend(m), m.width = r, m.height = u, window.addEventListener("resize", function () { m.width = window.innerWidth, m.height = window.innerHeight }, !0), l = m.getContext("2d")) : null === l && (l = m.getContext("2d")); var s = confetti.maxCount; if (n) if (o) if (n == o) s = a.length + o; else { if (n > o) { var f = n; n = o, o = f } s = a.length + (Math.random() * (o - n) + n | 0) } else s = a.length + n; else o && (s = a.length + o); for (; a.length < s;)a.push(d({}, r, u)); e = !0, i = !1, c(), t && window.setTimeout(w, t) } function w() { e = !1 } }();


   


// window on load 

indi.style.cursor = "pointer"

indi.addEventListener('onmouseover', ()=>{
       
})

indi.addEventListener('click', ()=>{
        indi.style.transform = "scale(100)"
        setTimeout(()=>{
            blurScreen.style.display = 'none'
            indipendent.style.display = 'none'
            indi.style.display = 'none'
        },200)

        confetti.start();

        setTimeout(()=>{
            confetti.stop();
        },4000)

} )






// months array
const setMonth = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];

// default city when page loads
let cityInput = "Thane";


// listes cities

cities.forEach((city)=>{
    city.addEventListener('click', (e) => {

        search.style.borderBottom = "1px solid #ccc"

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
        search.style.borderBottom = "1px solid red"
    } else {
        inputWithoutSpace = String(search.value);
        inputWithoutSpace2 = inputWithoutSpace.replace(/ /g, "");

        cityInput = inputWithoutSpace2;
        app.style.opacity = "0"

        search.style.borderBottom = "1px solid #ccc"

        fetchWeatherData();
        search.value=""
    }
})

search.style.borderBottom = "1px solid #ccc"



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

    const dateString = new Date().toDateString()

    dateOutput.innerHTML = dateString;


// To show date in AM PM format

setInterval(()=>{
          
        const newDate = new Date()

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

        if(isDay){
            icon.src = `./media/weather/weather/64x64/day/${symbol}.png`
        } else {
            icon.src = `./media/weather/weather/64x64/night/${symbol}.png`
        }

        
        //background

        if(String(data.name) === "Mumbai"){
            app.style.backgroundImage = `url(./media/day/Mumbai.jpg)`
        } else if(String(data.name) === "Pune"){
            app.style.backgroundImage = `url(./media/day/Pune.jpg)`
        } else if(String(data.name) === "Chennai"){
            app.style.backgroundImage = `url(./media/day/Chennai.jpg)`
        } else if(String(data.name) === "Delhi"){
            app.style.backgroundImage = `url(./media/day/Delhi.jpg)`
        } else if(String(data.name) === "Agra"){
            app.style.backgroundImage = `url(./media/day/Agra.jpg)`
        } else if(String(data.name) === "Satara"){
            app.style.backgroundImage = `url(./media/day/Satara.jpg)`
        } else if(String(data.name) === "Sangli"){
            app.style.backgroundImage = `url(./media/day/Sangli.jpg)`
        } else if(String(data.name) === "Kolhāpur"){
            app.style.backgroundImage = `url(./media/day/kolhapur.png)`
        } else if(String(data.name) === "Nashik"){
            app.style.backgroundImage = `url(./media/day/Nashik.jpeg)`
        } else if(String(data.name) === "Phaltan"){
            app.style.backgroundImage = `url(./media/day/Phaltan.jpg)`
        } else if(String(data.name) === "Lonavala" || String(data.name) === "Lonavla"){
            app.style.backgroundImage = `url(./media/day/Lonavala.jpg)`
        } else {
            app.style.backgroundImage = `url(./media/day/flag.jpg)`
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


