import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode.js";

export default function Appointment(props) {

  // save function that has 2 transitions with a 1 second timeout for saving
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  // delete function used to empty data
  function deleting(name, interviewer) {
    //the data given should be null so when we send the data it sends null
    const interview = {
      student: name,
      interviewer
    };
    // we transition to deleting page then after 1 second it transitions to empty and sends the data to update our server
      transition(DELETING, true)

      props.cancelInterview(props.id, interview)
      .then(()=> transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
      
  }
  // used to transition to confirm when the delete icon is clicked on the form
  function confirmingDelete() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

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
    onEdit={edit}
    />}
    {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()}/>}
    {mode === EDIT && <Form 
    onSave={save}
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    setInterviewer={props.interview.interviewer}
    interviewers={props.interviewers} 
    onCancel={() => back()}
    />}
    {mode === ERROR_DELETE && <Error message={"could not delete appointment."} onClose={() => back()}/>}
    {mode === ERROR_SAVE && <Error message={"could not save appointment."} onClose={() => back()}/>}
    {mode === SAVING && <Status message={"Saving"} />}
    {mode === DELETING && <Status message={"Deleting"} />}
    {mode === CONFIRM && <Confirm onConfirm={deleting} onCancel={() => back()} message={"Are you sure you would like to Delete?"} />}
  </article>
  );
}