import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

function User() {
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
                placeholder="Country Name"
                //   value={this.state.title}
                //   onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                name="cases"
                placeholder="Confirmed Cases"
                //   value={this.state.title}
                //   onChange={this.handleChange}
              />
            </div>

            <div className="form-input">
              <input
                type="text"
                name="recovered"
                placeholder="Recovered"
                //   value={this.state.title}
                //   onChange={this.handleChange}
              />
            </div>

            <div className="form-input">
              <input
                type="text"
                name="deaths"
                placeholder="Confirmed Deaths"
                //   value={this.state.title}
                //   onChange={this.handleChange}
              />
            </div>

            <button className="btn">Submit</button>
          </form>
        </div>
      </div>

      <div className="user__right">
        <div className="top__twitter">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="COVID19Tracking"
            options={{ height: 420, width: 400 }}
          />
        </div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="CDCgov"
          options={{ height: 420, width: 400 }}
        />
      </div>
    </div>
  );
}

export default User;
