import { put, takeLatest } from 'redux-saga/effects';
import { getWeather } from '../services/openweather';

function* fetchWeather({ payload }) {
    try {
        const res = yield getWeather(payload);

        const weather = {
            country: res.sys.country,
            name: res.name,
            condition: res.weather[0].main,
            temperature: `${Math.round(res.main.temp)}°c`,
        }

        yield put({type: 'FETCH_WEATHER_SUCCESS', payload: weather});
    } catch (e) {
        console.error(e);
    }
}

function* generate() {
    yield takeLatest('SEARCH', fetchWeather);
}

export default generate;