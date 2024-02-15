// Selecting HTML elements using DOM manipulation
const form = document.querySelector('form');
const time = document.getElementById('time');
const icon = document.getElementById('icon');
const weatherInfo = document.querySelector('.weather-info');
const appBody = document.querySelector('.app-body');


// Function to get weather information from the API
const getInfo = async city => {
    const cityData = await getCity(city);   // Get city details
    const weatherData = await getWeather(cityData.Key);     // Get weather details
    console.log(cityData, weatherData);
    return {cityData, weatherData};
};

// Function to update the user interface with weather information
const updateUi = (data) => {
    // storing two object seperately
    const {cityData, weatherData} = data;

    // Updating time image source based on day or night
    let timeSrc = weatherData.IsDayTime ? './images/time/day.svg': './images/time/night.svg';
    time.setAttribute('src', timeSrc);

    // Updating weather icon source
    icon.setAttribute('src', `./images/icons/${weatherData.WeatherIcon}.svg`);

    // updating weather details
    const cityName = String(cityData.LocalizedName).toUpperCase();
    const weatherDetails = `<p id="city">${cityName}</p>
                            <P id="status">${weatherData.WeatherText}</P>
                            <p id="temp">${weatherData.Temperature.Metric.Value} &#8451;</p>`;
    
    
    // Updating the weather information container
    weatherInfo.innerHTML = weatherDetails; 
    
    // Making the app body visible
    appBody.style.display = "block";
    
};



// Getting user input
form.addEventListener('submit', e => {
    // Preventing the default form submission behavior
    e.preventDefault();

    // Getting and trimming user input
    const city = form.userLocation.value.trim();
    form.reset();

    // Storing the city name in localStorage
    localStorage.setItem('cityName', city);

    // Fetching weather information and updating UI
    getInfo(city)
        .then(data => {
            updateUi(data);
        })
        .catch(err => console.log(err));


});

// Checking for previously stored city name in localStorage
if(localStorage.getItem('cityName')) {
    getInfo(localStorage.getItem('cityName'))
    .then(data =>  updateUi(data))
    .catch(err => console.log(err));
}