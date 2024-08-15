document.getElementById("location_input").addEventListener('change', async () => {
    // Get the user-entered location
    const location = document.getElementById("location_input").value;

    // Fetch the weather data
    const weather_data = await getweatherdata(location);

    // Display the weather data on the page
    displayweatherdata(weather_data);
});

const getweatherdata = async (location) => {
    if (!location) {
        return {};
    }

    const apikey = 'c97b7d8c130abb6e190f8dc5f6259e60';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);

    const data = await response.json();
    return data;
}

function getbackgroundcolor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayweatherdata = (data) => {
    const weatherdataelement = document.getElementById('weather_data');

    if (Object.keys(data).length === 0) {
        weatherdataelement.innerHTML = "Please enter a location to see the weather.";
    } else {
        const backgroundcolor = getbackgroundcolor(Math.floor(data.main.temp - 273.15));
        weatherdataelement.style.backgroundColor = backgroundcolor;

        weatherdataelement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${Math.floor(data.main.temp - 273.15)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = async () => {
    const weather_data = await getweatherdata(""); // Pass an empty string to avoid an undefined location
    displayweatherdata(weather_data);
}
