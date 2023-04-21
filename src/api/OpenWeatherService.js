const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

const WEATHER_API_URL = 'https://us-weather-by-city.p.rapidapi.com/getweather';
const MY_API_KEY = '2eb5847c7a9cf4008271d58926e10816';

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
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=100&appid=${MY_API_KEY}`
      ),
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${MY_API_KEY}`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    console.log("hi",weatherResponse,"     ",forcastResponse);
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



const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'X-RapidAPI-Key': '47e7224a88msh8c8b0487b97b792p1f3c86jsnbf5c7a05cb3e',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};
// export async function fetchCities(city)
// {
//   try{

//     const response = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities',{
//       headers: {
//         'X-RapidAPI-Key': '47e7224a88msh8c8b0487b97b792p1f3c86jsnbf5c7a05cb3e',
//         'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//       }
//     });


//     const data = await response.json();
//     return data;


//   }
  
//   catch (error) {
//     console.log(error);
//     return;
//   }
// }
