
export function getAppointmentsForDay(state, day) {
  let finalArr = []
  let dayObject = state.days.find(days => days.name === day);
  if(dayObject === undefined) {
    return finalArr;
  } else {
    finalArr = dayObject.appointments.map(appt => state.appointments[appt]);
  }
  return finalArr;
}

/* old way of solving the problem */

  //let finalArr = [];
  // const appointmentsArray = state.days.filter(days=> days.name === day);
  // for (let day of appointmentsArray) {
  //   //console.log(value.id);
  //   for (let id in state.appointments) {
  //     // compares the value of a day to the id of an appointment
  //     //console.log(state.appointments[id].id)
  //     if (day.id === (state.appointments[id].id)) {
        
  //       for (let appt of day.appointments){
  //         // push that value to the array
  //         finalArr.push(state.appointments[appt]);
  //       }   
  //     }
  //   }
  // }
  // return finalArr
  