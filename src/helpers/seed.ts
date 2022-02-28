export const populateActions = (formsDocs: any[], actions: any[]) => {
  const studentForm = formsDocs.find(doc => doc.form_name = 'student');
  const attendanceForm =  formsDocs.find(doc => doc.form_name = 'attendance');
  const subjectQForm = formsDocs.find(doc => doc.form_name = 'subject_qualification');
  const subjectQAndObsForm = formsDocs.find(doc => doc.form_name = 'subject_qualification_and_observations');
  
  const getFormIdByActionName = (actionName:string) => {
    if (actionName.includes('student')) {
      return studentForm._id
    };
    
    if (actionName.includes('attendance')) {
      return attendanceForm._id
    };
    
    if (actionName.includes('subject_qualification') && !actionName.includes('subject_qualification_and_observations') ) {
      return subjectQForm._id
    };

    if (actionName.includes('subject_qualification_and_observations')) {
      return subjectQAndObsForm._id
    }
  }

  const mappedActions = actions.map(action => ({
    ...action,
    form_id: getFormIdByActionName(action.action_name)
  }));

  return mappedActions;
}

export const populateGroupswithActions = (actions: any[], groups: any[]) => {
  const forms_ids = {
    student: actions.find((a:any) => a.action_name.includes('student')).form_id,
    attendance: actions.find((a:any) => a.action_name.includes('attendance')).form_id,
    subjectQ: actions.find((a:any) => a.action_name.includes('subject_qualification')  && !a.action_name.includes('subject_qualification_and_observations')).form_id,
    subjectQAndObs: actions.find((a:any) => a.action_name.includes('subject_qualification_and_observations')).form_id,
  };

  const actionsGrouped = actions.reduce((acc:any, current: any)=> {
    switch (current.form_id) {
      case forms_ids.student:
        return {
          ...acc,
          student: [...acc.student, current._id]
        }
      case forms_ids.attendance:
        return {
          ...acc,
          attendance: [...acc.attendance, current._id]
        }
      case forms_ids.subjectQ:
        return {
          ...acc,
          subjectQ: [...acc.subjectQ, current._id]
        }
      case forms_ids.subjectQAndObs:
        return {
          ...acc,
          subjectQAndObs: [...acc.subjectQAndObs, current]
        }
      }
  },{});

  const {
    student: studentActions,
    attendance: attendanceActions,
    subjectQ: subjectQActions,
    subjectQAndObs: subjectQAndObsActions,
  } = actionsGrouped

  const getActionsdByGroupName = (groupName:string) => {
    switch (groupName) {
      case 'teachers':
        return [...studentActions, ...attendanceActions, subjectQActions, subjectQAndObsActions]
      case 'students':
        return []
      case 'administrators':
        return [...studentActions, ...attendanceActions, subjectQActions, subjectQAndObsActions]
    }
  }

  const mappedGroups = groups.map(group => ({
    ...group,
    actions: getActionsdByGroupName(group.group_name)
  }))

  return mappedGroups;
}