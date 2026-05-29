// Replace with your OpenWeatherMap API key
const API_KEY = '0d108d480327c607d77b6b5c022ceeeb'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

// Fetch weather data
async function getWeather(city) {
    if (!city) return;
    
    // Show loading, hide previous results
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherInfo.classList.add('hidden');
    
    try {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        errorDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Display weather on page
function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    
    weatherInfo.classList.remove('hidden');
}

// Event listeners
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value);
    }
});

// Load default city on startup
getWeather('Kathmandu');