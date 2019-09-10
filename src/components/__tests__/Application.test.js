import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText } from "@testing-library/react";

import Application from "components/Application.js";
import Appointment from "components/Appointment/index.js";
import axios from "__mocks__/axios";


afterEach(cleanup);

describe("Application", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // this is returning a promise
    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   console.log(prettyDOM(container));
  //   });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //const onSave = jest.fn();

    const { container } = render( <Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    

    // clicks the add image
    fireEvent.click(getByAltText(appointment, "Add"));

    // changes the placeholder text to be Lydia Miller-Jones
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // clicks the mentor container "Sylvia Palmer"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // hits the save button
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });
});
