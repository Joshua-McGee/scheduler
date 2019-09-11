  export const SET_DAY = "SET_DAY";
  export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  export const SET_INTERVIEW = "SET_INTERVIEW";


  // Reducer thats used to manage my state
  export default function reducer(state, action) {
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

          // In order to get this to update spots without mutating the array we need to grab the proper state 
          const appointment = {
            ...state.appointments[action.id],
            interview: action.interview && { ...action.interview }
          };
    
          const appointments = {
            ...state.appointments,
            [action.id]: appointment
          };
          // we need to get the spots for days and set the count
          const getSpotsForDay = day =>
            day.appointments.length -
            day.appointments.reduce(
              (count, id) => (appointments[id].interview ? count + 1 : count),
              0
            );
          // this is where we update the day state which contains spots
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
