
export function getAppointmentsForDay(state, day) {
  let finalArr = []
  let dayObject = state.days.find(days => days.name === day);
  if(dayObject === undefined) {
    return finalArr;
  } else {
   dayObject.appointments.map(appt => finalArr.push(state.appointments[appt]));
  }
  return finalArr;
}
// get an array of interviewers not interviews
export function getInterviewersForDay(state, day) {
  let finalArr = []
  let dayObject = state.days.find(days => days.name === day);
  if(!dayObject) {
    return finalArr;
  } else {
    dayObject.interviewers.map(interviewer => finalArr.push(state.interviewers[interviewer]));
  }
  return finalArr;
}

export function getInterview(state, interview) {
  let finalObj = {}
  //console.log("this is the state:", state.interviewers,"this is the interview:", interview);
  let interviewObj = state.interviewers;
  let studentObj = interview;
  //console.log(studentObj);
  if(interview === null) {
    return null;
  } else {
    for (let id in state.interviewers){
      //console.log(parseInt(id));
      if(parseInt(id) === studentObj.interviewer) {
        //console.log("############## MATCHING ################");
        finalObj = {interviewer: interviewObj[id], student: studentObj.student};
      }
    }
  }
  return finalObj;
}
  