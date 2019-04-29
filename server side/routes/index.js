var express = require('express');
var router = express.Router();
var myDbHlpr = require('../db/dbhelper');


router.get('/groups', async (req, res) => {

    let groups = await myDbHlpr.pool.query("SELECT * from group_names");

    res.json(groups);

});


router.post('/meetings', async (req, res) => {

    await myDbHlpr.pool.query(`INSERT INTO meetings (team_id, meeting_name, description, start_time, time_stay ,date)
     VALUES (${req.body.group_id} ,'${req.body.meetingName}','${req.body.description}','${req.body.time}','${req.body.stay}','${req.body.date}')`);

    res.json({ msg: "Meeting successfully added!" });

});


router.get('/meetings', async (req, res) => {

    let meetings = await myDbHlpr.pool.query("SELECT * from meetings");

    let groups = await myDbHlpr.pool.query("SELECT * from group_names");

    let newMeetings = meetings.map(meeting => {

        let currGroup = groups.find(group => group.group_id == meeting.team_id);

        let timeStayArry = meeting.start_time.split(':');

        let time = new Date();

        time.setHours(timeStayArry[0]);

        time.setMinutes(timeStayArry[1]);

        time.setMinutes(time.getMinutes() + Number(meeting.time_stay));

        let h = time.getHours().toString();
        let m = time.getMinutes().toString();

        if (h == "0") {
            h = `00`;
        }

        if (h.length == 1) {
            h = `0${h}`
        }

        if (m.length == 1) {
            m = `0${m}`;
        }

        return { meeting_id: meeting.meeting_id, group_id: currGroup.group_id, group_name: currGroup.group_name, meeting_name: meeting.meeting_name, description: meeting.description, start_time: meeting.start_time, time_stay: `${h}:${m}`, date: meeting.date };

    })

    res.json(newMeetings);

});


module.exports = router;
