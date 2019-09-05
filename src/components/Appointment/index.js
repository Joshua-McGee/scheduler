import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode.js";

export default function Appointment(props) {

  // save function that has 2 transitions with a 1 second timeout for saving
  function save(name, interviewer) {
    setTimeout(() => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, 1000);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  }
  // delete function used to empty data
  function deleting(name, interviewer) {
    //the data given should be null so when we send the data it sends null
    const interview = {
      student: name,
      interviewer
    };
    // we transition to deleting page then after 1 second it transitions to empty and sends the data to update our server
      transition(DELETING)
       setTimeout(() => {
       props.cancelInterview(props.id, interview);
        transition(EMPTY);
       }, 1000);
  }
  // used to transition to confirm when the delete icon is clicked on the form
  function confirmingDelete() {
    transition(CONFIRM);
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
    {mode === SHOW && <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer.name}
    onDelete={confirmingDelete}
    />}
    {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()}/>}
    {mode === SAVING && <Status message={"Saving"} />}
    {mode === DELETING && <Status message={"Deleting"} />}
    {mode === CONFIRM && <Confirm onConfirm={deleting} onCancel={() => back()} message={"Are you sure you would like to Delete?"} />}
  </article>
  );
}