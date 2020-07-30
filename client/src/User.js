import React, { useState } from 'react';
import './User.css';
import { Link } from 'react-router-dom';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

function User() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState();
  const [recovered, setRecovered] = useState();
  const [deaths, setDeaths] = useState();

  const submit = (event) => {
    event.preventDefault();

    const payload = {
      name: name,
      date: date,
      country: country,
      cases: cases,
      recovered: recovered,
      deaths: deaths,
    };

    fetch({
      url: '/api/save',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  return (
    <div className="user">
      <div className="user__left">
        <div className="user__nav">
          <h1>User Dashboard</h1>
          <Link className="user-link" to="/">
            Back To Home
          </Link>
        </div>
        <div className="form">
          <form>
            <div className="form-input">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                name="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                type="text"
                name="country"
                placeholder="Country Name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <input
                type="text"
                name="cases"
                placeholder="New Cases"
                value={cases}
                onChange={(e) => setCases(e.target.value)}
              />

              <input
                type="text"
                name="recovered"
                placeholder="Newly Recovered"
                value={recovered}
                onChange={(e) => setRecovered(e.target.value)}
              />

              <input
                type="text"
                name="deaths"
                placeholder="New Deaths"
                value={deaths}
                onChange={(e) => setDeaths(e.target.value)}
              />
            </div>

            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
