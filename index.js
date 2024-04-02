/* Your Code Here */
// Helper function to calculate hours between two timestamps
function hoursWorked(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDiff = Math.abs(end - start);
    const hoursWorked = Math.ceil(timeDiff / (1000 * 60 * 60));
    return hoursWorked;
  }
  
  function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      return hoursWorked(`${date} ${timeIn.hour}`, `${date} ${timeOut.hour}`);
    }
    return 0;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorkedToday = hoursWorkedOnDate(employee, date);
    return hoursWorkedToday * employee.payPerHour;
  }
  
  // Change 'const' to 'function' to avoid read-only error
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((acc, employee) => acc + allWagesFor(employee), 0);
  }
  
  // Example usage
  const employeeRecords = createEmployeeRecords([
    ['John', 'Doe', 'Developer', 25],
    ['Jane', 'Smith', 'Designer', 30],
  ]);
  
  createTimeInEvent(employeeRecords[0], '2024-03-21 0800');
  createTimeOutEvent(employeeRecords[0], '2024-03-21 1700');
  
  console.log(hoursWorkedOnDate(employeeRecords[0], '2024-03-21')); // Output: 9
  console.log(wagesEarnedOnDate(employeeRecords[0], '2024-03-21')); // Output: 225
  console.log(allWagesFor(employeeRecords[0])); // Output: 225
  console.log(findEmployeeByFirstName(employeeRecords, 'John')); // Output: Employee object for John
  console.log(calculatePayroll(employeeRecords)); // Output: Total payroll for all employees
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

