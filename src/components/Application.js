import React, { useState, Fragment, useEffect } from "react";
import DayList from "components/DayList.js";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment/index.js"
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "components/helpers/selectors.js";

export default function Application(props) {
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);
  const setDay = day => setState({ ...state, day });
  // removed because we will need to download days data first
  //const setDays = days => setState(prev => ({ ...prev, days }));
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      //Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      //console.log(all[0].data); // first
      //console.log(all[1].data); // second
      //console.log(all[2]); // third
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
    });
    
  }, []);

  //console.log(getAppointmentsForDay(state.appointments, state.day));

   const list = getAppointmentsForDay(state, state.day).map(appointment => {
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
            key={state.day.id}
            days={state.days}
            day={state.day}
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
