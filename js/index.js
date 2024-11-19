"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
const input = document.querySelector("input");
const div = document.querySelector("#weather");
const getLocalTime = (timezoneOffset) => {
    const localTime = new Date(Date.now());
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(localTime);
};
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !div)
        return;
    const local = input.value;
    if (local.length < 3) {
        alert('Location needs at least 3 letters');
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=1d9369af3250ba646954d5c309bc4434&lan=pt_br&units=metric`);
        const data = yield response.json();
        console.log(data);
        const infos = {
            temp: Math.round(data.main.temp),
            local: data.name,
            country: data.sys.country,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            timeZone: data.timezone,
        };
        const localTime = getLocalTime(infos.timeZone);
        div.innerHTML =
            `<div id="weather-info">
            <h5 id="city-name">${infos.local} / ${infos.country}</h5>
            <h1 id="temp">${infos.temp}°C</h1>    
            <p id="time">Timezone: ${localTime}</p> <!-- Mostra a hora local formatada -->
        </div>
        <div>
            <img id="img" src="${infos.icone}">
            <p id="humidity">Humidity: ${infos.humidity}%</p>
            <p id="wind">Wind: ${infos.wind}m/s</p> 
        </div>`;
    }
    catch (err) {
        console.log("API ERROR: ", err);
    }
}));
