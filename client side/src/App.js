import React, { Component } from 'react';
import './App.css';
import AddMeeting from './comps/AddMeeting';
import ShowMeeting from './comps/ShowMeeting';


class App extends Component {

  state = {
    groups: [],
    meetings: [],
    meetingsToShow: [],
    team_id: 1
  }

  async componentDidMount() {

    let res = await fetch("http://localhost:3000/groups");

    let data = await res.json();

    this.setState({ groups: data });

    this.updateMeetings();

  }

  async updateMeetings() {

    let res = await fetch("http://localhost:3000/meetings");

    let data = await res.json();

    this.setState({ meetings: data });

  }

  filterMeetings(team_id) {

    this.setState({ team_id: team_id });

  }

  render() {

    let meetingsToShow = this.state.meetings.filter(meeting => meeting.group_id == this.state.team_id);

    if (meetingsToShow.length == 0)   {

      return (

        <div className="App">

          <AddMeeting groups={this.state.groups} updateMeetings={this.updateMeetings.bind(this)} filterMeetings={this.filterMeetings.bind(this)} />

          <h3>There are no appointments for this group</h3>

        </div>

      );

    }

    return (

      <div className="App">

        <AddMeeting groups={this.state.groups} updateMeetings={this.updateMeetings.bind(this)} filterMeetings={this.filterMeetings.bind(this)} />

        <ShowMeeting meetingsToShow={meetingsToShow} />

      </div>

    );

  }

}

export default App;
