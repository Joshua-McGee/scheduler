import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";


export default function Appointment(props) {
 
  return (
    <article className="appointment">
      <Header>{props.time}</Header>
      <Empty />
    </article>
  );
}