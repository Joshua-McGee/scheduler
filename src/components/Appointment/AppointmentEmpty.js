import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";


export default function AppointmentEmpty(props) {

  return (
    <article className="appointment">
      <Header time={props.time}>
      </Header>
    <Empty /> 
    </article> 
  );
} 
