// show date as string (only day-month-year)
export function getDMY(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    //Day-Month-Year as string
    const dmy = `${day}/${month}/${year}`;

    return dmy;

}

export function addMonths(numOfMonths, date) {
    date.setMonth(date.getMonth() + numOfMonths);
  
    return date;
}

export default {getDMY, addMonths };


// compare if task day is today
// console.log(getDMY(inbox[0].date) == getDMY(new Date()));