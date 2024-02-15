// API key for AccuWeather
const key = "PVZvjbadYVpdAL6FAXGEG52P8ClJtTFt";

// Function to get city details from AccuWeather API
// Returns a Promise
const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    // Fetching data from the API
    const response = await fetch(base + query);
    const data = await response.json();

    // Returning the first result (assuming it's the most relevant)
    return data[0];
};

// Function to get current weather conditions from AccuWeather API
// Returns a Promise
const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/"; // API endpoint
    const query = `${id}?apikey=${key}`;

    // Fetching data from the API
    const response = await fetch(base + query);
    const data = await response.json();

    // Returning the first result (assuming it's the most relevant)
    return data[0];
};

// Example usage of getCity and getWeather functions (commented out)
// Uncomment and run to test individual functions

// getCity('Kandy')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// getWeather('307303')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
