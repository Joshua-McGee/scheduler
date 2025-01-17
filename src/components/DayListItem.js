import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  // all this does is change the text for the spots based on the number it recieves 
  const formatSpots = (prop) => {
    if (prop === 0) {
      return "no spots remaining";
    } else if (prop === 1) {
      return prop + " spot remaining";
    }
    return prop + ' spots remaining';
  };

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
