import moment from "moment-timezone";

const API_KEY = "655b906b34c280aaf88a7ab3f22eafd0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const res = await fetch(url);
  return await res.json();
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formatForecastWeather = (data) => {
    let { list } = data;
    const timezone = data.city.timezone;

    // Extract daily forecast data
    const daily = list
      .filter((d, index) => index % 8 === 0) // Get data every 24 hours (index divisible by 8)
      .slice(0, 5) // Take the next 5 days
      .map((d) => {
        return {
          title: formatToLocalTime(d.dt, timezone, "ddd"),
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
      });

    // Extract hourly forecast data
    const hourly = list
      .slice(0, 5) // Take the next 5 days of hourly data (8 data points per day)
      .map((d) => {
        return {
          title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
      });

    return { timezone, daily, hourly };
  };

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

function formatToLocalTime(secs, zone, format = "dddd, MMMM Do YYYY hh:mm a") {
  const utc_seconds = parseInt(secs, 10) + parseInt(zone, 10);
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds).toUTCString();
  const finalDate = moment.parseZone(local_date).format(format);

  return finalDate;
}

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
