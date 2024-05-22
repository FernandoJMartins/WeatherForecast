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
        const infos = {
            temp: Math.round(data.main.temp),
            local: data.name,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        div.innerHTML =
            `<div id="weather-info">
            <h5 id="city-name">${infos.local}</h5>
            <h1 id="temp">${infos.temp}°C</h1>                                                         
        </div>
        <img id="img" src="${infos.icone}">`;
    }
    catch (err) {
        console.log("API ERROR: ", err);
    }
}));
