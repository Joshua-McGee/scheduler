import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  const Reset = (prop) => {
    setName("") 
    setInterviewer(null);
    return;
  };

  const Cancel = () => {
    props.onCancel();
    Reset();
  }

  const Save = () => {
    const result = validate();
    //check if the result is true or false and setsError on False
    if (result) {
      setError("");
      props.onSave(name, interviewer);
    } else {
      setError("Student name cannot be blank");
      Reset();
    }
  }

  function validate() {
    if (name === "") {
      return false;
    } 
    return true
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={Cancel}>Cancel</Button>
      <Button confirm onClick={Save}>Save</Button>
    </section>
  </section>
</main>
  );
}