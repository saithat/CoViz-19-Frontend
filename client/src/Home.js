import React, { useState, useEffect } from 'react';
import './Home.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';

import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

import SideBar from './components/sideBar';

function Home() {
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [states, setStates] = useState([]);
  const [worldTableData, setWorldTableData] = useState([]);
  const [statesTableData, setStatesTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://demo-covid-api.herokuapp.com/all')
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://demo-covid-api.herokuapp.com/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.iso2,
          }));
          const sortedData = sortData(data);
          setWorldTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
      await fetch('https://demo-covid-api.herokuapp.com/states')
        .then((response) => response.json())
        .then((data) => {
          const sortedData = sortData(data);
          setStatesTableData(sortedData);
          setStates(states);
        });
    };
    getStatesData();
  });

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://demo-covid-api.herokuapp.com/all'
        : `https://demo-covid-api.herokuapp.com/countries/code/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === 'worldwide') {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(2);
        } else {
          setMapCenter([data.lat, data.long]);
        }
      })
      .then(setMapZoom(3));
  };

  return (
    <div>
    <div className="home">
      <Card className="table__left">
        <CardContent>
          <h3 className="app__rightTableTitle">
            current confirmed cases • world
          </h3>
          <Table countries={worldTableData} />
          <h3 className="app__rightGraphTitle">
            new daily {casesType} worldwide
          </h3>
          <LineGraph
            className="app__graph"
            casesType={casesType}
            historical="all"
          />
        </CardContent>
      </Card>
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Client</h1>
          <div className="right__nav">
          <SideBar />
            <Link className="user-link" to="/user">
              User Dashboard
            </Link>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country, i) => (
                  <MenuItem key={i} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="app__stats">
          <InfoBox
            isOrange
            type="Cases"
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Total Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            isGreen
            type="Recovered"
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Total Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            type="Deaths"
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Total Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="table__right">
        <CardContent>
          <h3 className="app__rightTableTitle">current confirmed cases • US</h3>
          <Table states={statesTableData} />
          <h3 className="app__rightGraphTitle">
            new daily {casesType} nationwide
          </h3>
          <LineGraph
            className="app__graph"
            casesType={casesType}
            historical="usa"
          />
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

export default Home;
