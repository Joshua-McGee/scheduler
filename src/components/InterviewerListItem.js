import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const interviewersClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });

  return (
    <li className={interviewersClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        id={props.id}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}