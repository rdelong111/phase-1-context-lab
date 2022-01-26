function createEmployeeRecord(employee) {
    return {
        'firstName': employee[0],
        'familyName': employee[1],
        'title': employee[2],
        'payPerHour': employee[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(employeeList) {
    let employees = [];
    for (let employee of employeeList) {
        employees.push(createEmployeeRecord(employee));
    }
    return employees;
}

function createTimeInEvent(dateStamp) {
    const thedate = dateStamp.split(' ');
    const timeOb = {
        'type': 'TimeIn',
        'hour': parseInt(thedate[1]),
        'date': thedate[0]
    };
    this.timeInEvents.push(timeOb);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const thedate = dateStamp.split(' ');
    const timeOb = {
        'type': 'TimeOut',
        'hour': parseInt(thedate[1]),
        'date': thedate[0]
    };
    this.timeOutEvents.push(timeOb);
    return this;
}

function hoursWorkedOnDate(thedate) {
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if (this.timeInEvents[i].date === thedate) {
            return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour) / 100;
        }
    }
}

function wagesEarnedOnDate(thedate) {
    return this.payPerHour * hoursWorkedOnDate.call(this, thedate);
}

function findEmployeeByFirstName(records, fName) {
    for (let record of records) {
        if (record.firstName === fName) {
            return record;
        }
    }
}

function calculatePayroll(records) {
    let paysum = 0;
    for (let record of records) {
        paysum += allWagesFor.call(record);
    }
    return paysum;
}

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

