import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center pb-2 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl">{temp.toFixed()}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-xs md:text-sm items-center justify-center">
            <UilTemperature siz={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{feels_like.toFixed()}°</span>
          </div>
          <div className="flex font-light text-xs md:text-sm items-center justify-center">
            <UilTear siz={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{humidity.toFixed()}%</span>
          </div>
          <div className="flex font-light text-xs md:text-sm items-center justify-center">
            <UilWind siz={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{speed.toFixed()}km/h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:items-center justify-center space-x-2 text-white text-xs py-3">
        <UilSun />
        <p className="font-light text-center">
          Rise:{" "}
          <span className="font-base md:font-medium ml-0 md:ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light text-center">
          Set:{" "}
          <span className="font-base md:font-medium ml-0 md:ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light text-center">
          High:{" "}
          <span className="font-base md:font-medium ml-0 md:ml-1">
            {temp_max.toFixed()}°
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun />
        <p className="font-light  text-center">
          Low:{" "}
          <span className="font-base md:font-medium ml-0 md:ml-1">
            {temp_min.toFixed()}°
          </span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
