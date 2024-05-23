import { getData } from "./database";

export function isToday(dateFormat) {
    const now = new Date();
    const date = new Date(dateFormat);
    return date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
}

export function isThisWeek(dateFormat) {
    // Get the current date
    const today = new Date();
    let date=new Date(dateFormat).getDate()
  
    // Get the start and end of the current week
    const startOfWeek = today.getDate() - today.getDay();
    const endOfWeek = startOfWeek + 6;

  
    // Check if the given date is between the start and end of the current week
    return date >= startOfWeek && date <= endOfWeek;
}

export function isThisMonth(dateFormat) {
    const now = new Date();
    const date = new Date(dateFormat);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

export function filterData(data,flag){
  let filterFunc = null;
  if(flag==="T")
  {
    filterFunc=isToday
  }
  else if(flag==="W")
  {
    filterFunc=isThisWeek  
  }
  else if(flag==="M"){
    filterFunc=isThisMonth
  }
  else
  {
    return false
  }
  let filteredData=[]

  for(let item of data)
  {
    let project=getData(item)
    if(filterFunc(project.due_date))
    {
        filteredData.push(item)
    }
  }
  return filteredData;
}

