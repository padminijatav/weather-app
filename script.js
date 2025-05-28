const apiKey = '2ba16bea941a6c5a2fa4f5dd4fd9ceee';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather;

    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p><strong>Condition:</strong> ${weatherMain} (${description})</p>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
    `;
    weatherDisplay.innerHTML = weatherHTML;
}
