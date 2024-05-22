const form = document.querySelector("form")
const input = document.querySelector("input")
const div = document.querySelector("#weather")

form?.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!input || !div) return

    const local = input.value;

    if (local.length < 3){
        alert('Location needs at least 3 letters')
        return;
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=1d9369af3250ba646954d5c309bc4434&lan=pt_br&units=metric`)
        const data = await response.json()

        const infos = {
            temp: Math.round(data.main.temp),
            local: data.name,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }

        div.innerHTML = 
        `<div id="weather-info">
            <h5 id="city-name">${infos.local}</h5>
            <h1 id="temp">${infos.temp}°C</h1>                                                         
        </div>
        <img id="img" src="${infos.icone}">`
    }catch(err) {
        console.log("API ERROR: ", err)
    } 
})