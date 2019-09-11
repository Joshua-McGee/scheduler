import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";

// I ended up only using this for testing in storybook otherwise it is not used for our application
export default function AppointmentEmpty(props) {

  return (
    <article className="appointment">
      <Header time={props.time}>
      </Header>
    <Empty /> 
    </article> 
  );
} 
