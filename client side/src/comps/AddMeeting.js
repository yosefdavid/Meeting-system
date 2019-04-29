import React, { Component } from 'react';


class AddMeeting extends Component {

  state = {
    group_id: 1,
    date: "",
    time: "",
    meetingName: "",
    description: "",
    stay: "30"
  }

  render() {

    return (

      <div>

        <h1>Add Appointments</h1>

        <table>

          <tbody>

            <tr>

              <td>Team:</td>

              <td>

                <select onChange={this.handleText.bind(this)} name="group_id">

                  {this.props.groups.map(group => <option key={group.group_id} value={group.group_id}>{group.group_name}</option>)}

                </select>

              </td>


            </tr>

            <tr>

              <td>Date end Time:</td>
              <td> <input onChange={this.handleText.bind(this)} name="date" type="date" /><input onChange={this.handleText.bind(this)} name="time" type="time" /></td>

            </tr>

            <tr>

              <td>Meeting name:</td>
              <td><input onChange={this.handleText.bind(this)} name="meetingName" type="text" /></td>

            </tr>

            <tr>

              <td>Description:</td>
              <td><input onChange={this.handleText.bind(this)} name="description" type="text" /></td>

            </tr>

            <tr>

              <td>Duration:</td>
              <td>

                <select onChange={this.handleText.bind(this)} name="stay">
                  <option value={30}>30 Minutes</option>
                  <option value={60}>1 Hours</option>
                  <option value={120}>2 Hours</option>
                </select>

              </td>

            </tr>

          </tbody>

        </table>

        <button onClick={this.send_appointments.bind(this)}>Make Appointments </button>

      </div>

    );

  }

  handleText(ev) {

    this.setState({ [ev.target.name]: ev.target.value })

    if (ev.target.name == "group_id") {

      this.props.filterMeetings(ev.target.value);

    }

  }

  async send_appointments() {

    let res = await fetch('http://localhost:3000/meetings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    let data = await res.json();

    this.props.updateMeetings();

    alert(data.msg);

  }

}

export default AddMeeting;
