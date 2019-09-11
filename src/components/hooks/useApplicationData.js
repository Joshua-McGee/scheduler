import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData() {
  
  //used to dynamically update our states
  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      interviewers: {},
      appointments: {}
    })

  //book interview function needs to be passed
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      });
    });
  }

  // functions used to cancel the interview and update the database and react state
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      });
    });
  }

  //changes the day state based on what day we click in the nav
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  // gets the data from our api server and sets our state to that data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  return { state, setDay, cancelInterview, bookInterview }

}