import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

    //book interview function needs to be passed
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      //setState(state => ({...state, appointments}));
      return axios.put(`/api/appointments/${id}`, {
        // this is an object which has interviewer and student which the server expects
        interview
      })
      .then(res => {
        //calls setstate after we give the new data
        setState(state => ({...state, appointments}));
      })
    }
  
    // functions used to cancel the interview and update the database and react state
    function cancelInterview(id, interview) {
      //used to send our data for setState
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      return axios.delete(`/api/appointments/${id}`, {
        // this is an object which has interviewer and student which the server expects
        interview
      })
      .then(res => {
        //calls setstate after we give the new data
        setState(state => ({...state, appointments}));
      })
    }
  
    //changes the day state based on what day we click in the nav
    const setDay = day => setState({ ...state, day });
    
    //used to dynamically update our states
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
  
    // gets the data from our api server and sets our state to that data
    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
    }, []);

    return { state, setDay, cancelInterview, bookInterview }

}