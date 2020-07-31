import React, { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';

import SideBar from './components/sideBar';
import axios from 'axios';
import { prettyPrintStat } from './util';

function User() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState('');
  const [recovered, setRecovered] = useState('');
  const [deaths, setDeaths] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = () => {
    axios
      .get('https://demo-covid-api.herokuapp.com/user')
      .then((response) => {
        const data = response.data;
        setPosts(data);
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  };

  const submit = (event) => {
    event.preventDefault();
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const payload = {
      date: date,
      time: time,
      name: name,
      country: country,
      cases: Number(cases),
      recovered: Number(recovered),
      deaths: Number(deaths),
    };

    console.log(payload);

    axios({
      url: 'https://demo-covid-api.herokuapp.com/user',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        alert(
          'Hello ' +
            name +
            '! Your data has been saved... Thank you for your contribution!'
        );
        resetForm();
        getUserPosts();
      })
      .catch((err) => {
        console.log('Internal server error', err);
      });
  };

  const displayUserPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <div className="left">
          <div className="name">
            <h3>
              {post.country} | {post.date}
            </h3>
            <p>User: {post.name}</p>
          </div>
        </div>

        <div className="right">
          <p>New Cases: {prettyPrintStat(post.cases)}</p>
          <p>New Recovered: {prettyPrintStat(post.recovered)}</p>
          <p>New Deaths: {prettyPrintStat(post.deaths)}</p>
        </div>
      </div>
    ));
  };

  const resetForm = () => {
    setName('');
    setCountry('');
    setCases('');
    setRecovered('');
    setDeaths('');
  };

  return (
    <div className="user">
      <div className="user__nav">
        <h1>User Dashboard</h1>

        <div className="right__nav">
          <SideBar />
          <Link className="user-link" to="/">
            Back To Home
          </Link>
        </div>
      </div>
      <div className="form">
        <form onSubmit={submit}>
          <div className="form-input">
            <input
              required="true"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              required="true"
              type="text"
              name="country"
              placeholder="Country Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <input
              required="true"
              type="text"
              name="cases"
              placeholder="New Cases"
              value={cases}
              onChange={(e) => setCases(e.target.value)}
            />

            <input
              required="true"
              type="text"
              name="recovered"
              placeholder="Newly Recovered"
              value={recovered}
              onChange={(e) => setRecovered(e.target.value)}
            />

            <input
              required="true"
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

      <div className="blog-">{displayUserPosts(posts)}</div>
    </div>
  );
}

export default User;
