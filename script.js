const temp = document.querySelector('.temperature');
const cityName = document.querySelector('.city');
const humidityData = document.querySelector('.humidity-data');
const windData = document.querySelector('.wind-data');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const weatherImg = document.querySelector('.weather-img');

const apiKey = "61fd06990c004cef944124613232506";
const apiUrl = "https://api.weatherapi.com/v1/current.json?";

let data; // Declare a variable to store the weather data
let isCelsius = true; // Flag to track the temperature unit

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&key=${apiKey}` + `&q=${city}`);
    data = await response.json();

    updateWeatherDisplay();
}

// async function loadDefaultWeather() {
//     const defaultCity = 'Ljubljana';
//     checkWeather(defaultCity);
// }

checkWeather("Celje")

function updateWeatherDisplay() {
    if (isCelsius) {
        temp.textContent = `${data.current.temp_c}°C`;
    } else {
        temp.textContent = `${data.current.temp_f}°F`;
    }

    cityName.textContent = data.location.name;
    humidityData.textContent = `${data.current.humidity}%`;
    windData.textContent = `${data.current.wind_kph} km/h`;

    if (data.current.condition.text.toLowerCase().includes("rain")) {
        weatherImg.src = '/images/rain.png';
    } else if (data.current.condition.text.toLowerCase().includes("cloud") ||
        data.current.condition.text.toLowerCase().includes("overcast")) {
        weatherImg.src = '/images/clouds.png';
    } else if (data.current.condition.text.toLowerCase().includes("snow")) {
        weatherImg.src = '/images/snow.png';
    } else if (data.current.condition.text.toLowerCase().includes("clear") ||
        data.current.condition.text.toLowerCase().includes("sun")) {
        weatherImg.src = '/images/clear.png';
    } else if (data.current.condition.text.toLowerCase().includes("drizzle")) {
        weatherImg.src = '/images/drizzle.png';
    } else if (data.current.condition.text.toLowerCase().includes("mist")) {
        weatherImg.src = '/images/mist.png';
    }

    // console.log(data);
    // console.log(data.current.condition.text);
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    updateWeatherDisplay();
}

function handleSearch() {
    const location = searchInput.value;
    checkWeather(location);
}

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

temp.addEventListener('click', toggleTemperatureUnit);

// window.addEventListener('DOMContentLoaded', loadDefaultWeather);
