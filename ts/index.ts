const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const div = document.querySelector("#weather") as HTMLDivElement;


interface WeatherInfo {
    temp: number;
    local: string;
    country: string;
    icone: string;
    humidity: number;
    wind: number;
    timeZone: number;
}

const getLocalTime = (timezoneOffset: number): string => {
    const localTime = new Date(Date.now()); 
    const options: Intl.DateTimeFormatOptions = { 
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

form?.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    if (!input || !div) return;

    const local = input.value;

    if (local.length < 3) {
        alert('Location needs at least 3 letters');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=1d9369af3250ba646954d5c309bc4434&lan=pt_br&units=metric`);
        const data = await response.json();
        console.log(data);


        const infos: WeatherInfo = {
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
        <div id='icon'>
            <img id="img" src="${infos.icone}">
            <p id="humidity">Humidity: ${infos.humidity}%</p>
            <p id="wind">Wind: ${infos.wind}m/s</p> 
        </div>`;
    } catch (err) {
        console.log("API ERROR: ", err);
    } 
});
