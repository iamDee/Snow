import { applyMiddleware, createStore } from 'redux';
import createSageMiddleware from 'redux-saga';
import HomeSaga from './home/saga';

const defaultState = {
    country: '',
    name: '',
    condition: '',
    temperature: '',
}

const HomeReducer = function (state = defaultState, { type, payload }) {
    switch (type) {
      case 'FETCH_WEATHER_SUCCESS': {
        return {
          country: payload.country,
          name: payload.name,
          condition: payload.condition,
          temperature: payload.temperature,
        }
      }
      default:
        return state;
    }
};

const middleware = createSageMiddleware();
export default createStore(HomeReducer, applyMiddleware(middleware));
middleware.run(HomeSaga);