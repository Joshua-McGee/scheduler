import React, {useState} from "react";
import "components/Appointment/styles.scss";

export default function Show(props) {

  let [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");

  const Reset = (prop) => {
    setName("") 
    setInterviewer(null);
    return;
  };

  const Delete = () => {
    Reset();
    interviewer = null;
    props.onDelete(name, interviewer); 
  }

  const Edit = () => {
    Reset();
    props.onEdit(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{props.student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{props.interviewer}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={Edit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={Delete}
      />
    </section>
  </section>
</main>
  );
}