import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";

export default function Empty(props) {

  const Cancel = () => {
    props.onCancel();
  }

  const Confirm = () => {
    props.onConfirm();
  }

  return (
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={Cancel}>Cancel</Button>
    <Button danger onClick={Confirm}>Confirm</Button>
  </section>
</main>
  );
}