import React, { useState, Fragment, useEffect } from "react";
import DayList from "components/DayList.js";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment/index.js"
import Appointment from "components/Appointment/index.js";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
     axios.get("http://localhost:8001/api/days").then(res => {
       setDays(res.data);
    }) 
  },[])

   const list = appointments.map(appointment => {
     return (
      <Fragment>
      <Appointment
      key={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
    </Fragment>
   )});
  
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={day.id}
            days={days}
            day={day}
            setDay={setDay} />
        </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
    <section className="schedule">
      {list}
      <Appointment
        id='last'
        time="5pm"
      />
    </section>
    </main >
  );
}
