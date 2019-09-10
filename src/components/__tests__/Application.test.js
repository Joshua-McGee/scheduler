import React from "react";

import { render, 
         cleanup, 
         waitForElement, 
         fireEvent, 
         getByText, 
         prettyDOM, 
         getAllByTestId, 
         getByTestId,
         getByPlaceholderText,
         queryByText,
         queryByAltText, 
         getByAltText } from "@testing-library/react";

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

    const { container, debug } = render( <Application />);

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
    // check if saving is still in the document & wait for the appointment to update
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // check to see if the day node that containes "Monday" updated text to no spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
   
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render( <Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    //console.log(prettyDOM(appointment));

    fireEvent.click(queryByAltText(appointment, "Delete"))
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to Delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"))
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render( <Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // get the proper appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"))
    // change the placeholder text value
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

  })
});
