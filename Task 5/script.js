const apiKey = 'YOUR_API_KEY'; // Replace with your own API key from OpenWeatherMap or other weather API provider

const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const locationElem = document.getElementById('location');
const descriptionElem = document.getElementById('description');
const temperatureElem = document.getElementById('temperature');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');

locationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (location) {
    getWeather(location);
    locationInput.value = '';
  }
});

function getWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Weather data not available. Please try again.');
    });
}

function displayWeather(data) {
  locationElem.textContent = data.name + ', ' + data.sys.country;
  descriptionElem.textContent = data.weather[0].description;
  temperatureElem.textContent = 'Temperature: ' + data.main.temp + ' °C';
  humidityElem.textContent = 'Humidity: ' + data.main.humidity + '%';
  windElem.textContent = 'Wind Speed: ' + data.wind.speed + ' m/s';
}
