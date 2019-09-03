import React, { useState } from "react";
import classnames from 'classnames';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
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
    
    // <article className="appointment">
    //   <Show>

    //   </Show>
    //   </article>