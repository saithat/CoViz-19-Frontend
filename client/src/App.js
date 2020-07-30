<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './App.css';
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
import SideBar from './components/sideBar'
=======
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
>>>>>>> 896e2b0e79a8b3fde5cf34a12d7cc6e420ca22a8

import Home from './Home';
import User from './User';

function App() {
  return (
<<<<<<< HEAD
    <div className="app">
      <SideBar>
      <Card>
        <CardContent className="left__table">
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
          <h1>COVID-19 Client Demo</h1>
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

      <Card className="app__right">
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
      </SideBar>
    </div>
=======
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    </Router>
>>>>>>> 896e2b0e79a8b3fde5cf34a12d7cc6e420ca22a8
  );
}

export default App;
