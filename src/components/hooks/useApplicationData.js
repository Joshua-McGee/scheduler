import { useEffect, useReducer } from "react";
import axios from "axios";


export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

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
        return {
          ...state,
          appointments: action.value
        }
      case SET_SPOTS:
        return {
          ...state,
          days: state.days.map((day) => {
            if (day.name === state.day) {
              return {...day,
                spots: day.spots + action.value
              };
            } 
            return day
          })
        }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


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
    

    return axios.put(`/api/appointments/${id}`, {
      // this is an object which has interviewer and student which the server expects
      interview
    })
      .then(res => {
        //calls setstate after we give the new data
        dispatch({ type: SET_SPOTS, value: -1 })
        dispatch({ type: SET_INTERVIEW, value: appointments });
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
        dispatch({ type: SET_SPOTS, value: 1 })
        dispatch({ type: SET_INTERVIEW, value: appointments });
      })
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