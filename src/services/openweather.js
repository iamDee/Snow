import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from './../constants';

export const getWeather = async(city) => {
    const res = await fetch(`/weather/${city}`)

    if (!res.ok) {
        throw new Error(`An error has occurred in the OpenWeather API: ${res.status}`);
    }

    return Promise.resolve(await res.json());
}