import { useEffect, useReducer } from "react";
import axios from "axios";


export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  //used to dynamically update our states
  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      interviewers: {},
      appointments: {}
    })

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        }
      case SET_INTERVIEW:
          const appointment = {
            ...state.appointments[action.id],
            interview: action.interview && { ...action.interview }
          };
    
          const appointments = {
            ...state.appointments,
            [action.id]: appointment
          };
    
          const getSpotsForDay = day =>
            day.appointments.length -
            day.appointments.reduce(
              (count, id) => (appointments[id].interview ? count + 1 : count),
              0
            );
    
          const days = state.days.map(day => {
            return day.appointments.includes(action.id)
              ? {
                  ...day,
                  spots: getSpotsForDay(day)
                }
              : day;
          });
    
          return {
            ...state,
            appointments,
            days
          };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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