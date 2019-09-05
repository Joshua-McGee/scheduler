import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode.js";

export default function Appointment(props) {
  //console.log(props);

  function save(name, interviewer) {
    setTimeout(() => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, 1000);
    //console.log(name, interviewer)
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
    {mode === SHOW && ( <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer.name}
    />)}
    {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()}/>}
    {mode === SAVING && <Status message={"Saving"} />}
  </article>
  );
}