import React from "react";
import classnames from 'classnames';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";


export default function Appointment(props) {
 
  return (
    <article className="appointment">
      <Header>{props.time}</Header>
      <Empty></Empty>
    </article>
  );
}