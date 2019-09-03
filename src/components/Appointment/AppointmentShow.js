import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";


export default function AppointmentShow(props) {

  return (
    <article className="appointment">
      <Header time={props.time}>
      </Header>
  {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> }
    </article> 
  );

} 