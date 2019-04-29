import React, { Component } from 'react';


class ShowMeeting extends Component {

  render() {

    return (

      <div>

        <h2>All Appointments</h2>

        <table className="table table-bordered">

          <thead>

            <tr>

              <th>ID meeting</th>
              <th>Group name</th>
              <th>Meeting name</th>
              <th>Description</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {this.props.meetingsToShow.map(meeting => {

              return (

                <tr key={meeting.meeting_id}>

                  <td>{meeting.meeting_id}</td>
                  <td>{meeting.group_name}</td>
                  <td>{meeting.meeting_name}</td>
                  <td>{meeting.description}</td>
                  <td>{meeting.start_time}</td>
                  <td>{meeting.time_stay}</td>
                  <td>{meeting.date}</td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    );

  }

}

export default ShowMeeting;
