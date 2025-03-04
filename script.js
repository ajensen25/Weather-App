const cityInput = document.querySelector('.main-left input');
const searchButton = document.querySelector('.search-button');

const API_KEY = 'KEY HERE';

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  
  fetch(WEATHER_API_URL).then(result => result.json()).then(data => {
    console.log(data)
  }).catch(() => {
    alert('An error occured while fetching the weather forecast!')
  });
}

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    return
  }
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL).then(result => result.json()).then(data => {
    if (!data.length) return alert(`No coordinates found for ${cityName}`);
    const {name, lat, lon} = data[0];
    getWeatherDetails(name, lat, lon);
  }).catch(() => {
    alert('An error occured while fetching the coordinates!')
  });
}

searchButton.addEventListener('click', getCityCoordinates);