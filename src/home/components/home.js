import React, { Component } from 'react'
import { connect } from 'react-redux';
import DateBuilder from './../utils/datebuilder';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }

    render() {
        const { weather, handleSearch } = this.props;
        const { searchTerm } = this.state;
        const hasWeather = weather.name !== '';

        return (
            <div className={weather ? ((weather.condition === 'Cloud') ? 'app warm' : 'app') : 'app'}>
                <main>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="City"
                            onChange={(e) => this.setState({ searchTerm: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                        />
                    </div>
                    {hasWeather && (
                        <div>
                            <div className="location-box">
                                <div className="location">{weather.name}, {weather.country}</div>
                                <div className="date">{DateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">{weather.temperature}</div>
                                <div className="weather">{weather.condition}</div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
      );
    }
}

const reduxState = state => {
    return {
        weather: state
    }
}

const actions = dispatch => {
    return {
        handleSearch: (searchTerm) => dispatch({ type: 'SEARCH', payload: searchTerm})
    }
}

export default connect(reduxState, actions)(Home);