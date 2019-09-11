import React from "react";
import DayList from "components/DayList.js";

import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "components/helpers/selectors.js";
import useApplicationData from "components/hooks/useApplicationData.js";

export default function Application(props) {
  // our state is exported from useApplicationData and so we grab it and make it available here
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // returns the appointment data using my helpers to return filtered props to get passed
   const list = getAppointmentsForDay(state, state.day).map(appointment => {

     const interview = getInterview(state, appointment.interview);
     const interviewers = getInterviewersForDay(state, state.day);

     return ( 
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
