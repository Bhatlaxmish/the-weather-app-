const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const WEATHER_API_URL = 'https://us-weather-by-city.p.rapidapi.com/getweather';
const WEATHER_API_KEY = 'YOUR API KEY';

const GEO_API_OPTIONS = {
  method: 'GET',

  headers: {
    'X-RapidAPI-Key': '47e7224a88msh8c8b0487b97b792p1f3c86jsnbf5c7a05cb3e',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

export async function fetchWeatherData(lat, lon) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
