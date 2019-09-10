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
      appointments: {},
})

function reducer(state_, action) {
  let state = {...state_}
  switch (action.type) {
    case SET_DAY:
        state.day = action.value
      break;
    case SET_APPLICATION_DATA:
        state.days = action.value.days
        state.appointments = action.value.appointments
        state.interviewers = action.value.interviewers
      break;
    case SET_INTERVIEW:
      state.appointments = action.value
      break;
    case SET_SPOTS: 
    state.days.map((day) => {
      if(day.name === state.day) {
         day.spots += action.value;
      }
  })
      break;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
  return state;
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
      dispatch({type: SET_SPOTS, value: -0.5})

      //setState(state => ({...state, appointments}));
      return axios.put(`/api/appointments/${id}`, {
        // this is an object which has interviewer and student which the server expects
        interview
      })
      .then(res => {
        //calls setstate after we give the new data
        dispatch({ type: SET_INTERVIEW, value: appointments});
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
      dispatch({type: SET_SPOTS, value: 0.5})
      
      return axios.delete(`/api/appointments/${id}`, {
        // this is an object which has interviewer and student which the server expects
        interview
      })
      .then(res => {
        //calls setstate after we give the new data
        dispatch({type: SET_INTERVIEW, value: appointments});
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
        dispatch({type: SET_APPLICATION_DATA,  
          value: {
            days: all[0].data, 
            appointments: all[1].data, 
            interviewers: all[2].data
          }});
      });
    }, []);

    return { state, setDay, cancelInterview, bookInterview }

}