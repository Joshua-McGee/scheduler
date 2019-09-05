import React, { useState, Fragment, useEffect } from "react";
import DayList from "components/DayList.js";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment/index.js"
import Appointment from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "components/helpers/selectors.js";

export default function Application(props) {

  //changes the day state based on what day we click in the nav
  const setDay = day => setState({ ...state, day });
  
  //used to dynamically update our states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // gets the data from our api server and sets our state to that data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    
  }, []);

  // returns the appointment data using my helpers to return the proper data
   const list = getAppointmentsForDay(state, state.day).map(appointment => {

     const interview = getInterview(state, appointment.interview);
     const interviewers = getInterviewersForDay(state, state.day);
     console.log(interview);

     return ( 
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />
   )});
  
  // everything below is what is painted to the DOM
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
