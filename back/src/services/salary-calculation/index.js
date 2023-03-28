const rates = {
    'MO': [25, 15, 20],
    'TU': [25, 15, 20],
    'WE': [25, 15, 20],
    'TH': [25, 15, 20],
    'FR': [25, 15, 20],
    'SA': [30, 20, 25],
    'SU': [30, 20, 25]
}

const calculateSalary = (employeesHours) => {
    const employeePayments = []
    for (let employeeHour of employeesHours) {
        const [name, scheduleString] = employeeHour.split('=')
        const schedule = scheduleString?.split(',')
        if (schedule) {
            employeePayments.push(`The amount to pay ${name} is: ${getPaymentByEmployee(schedule)} USD`)
        }
    }
    return employeePayments
}
const getPaymentByEmployee = (schedule) => {
    let payment = 0
    for (const shift of schedule) {
        const shiftMatch = shift.match(/^(\w{2})(\d{2}):(\d{2})-(\d{2}):(\d{2})$/)
        if (shiftMatch) {
            const dayOfWeek = shiftMatch[1]
            const startHour = parseInt(shiftMatch[2])
            const startMinute = parseInt(shiftMatch[3])
            const endHour = parseInt(shiftMatch[4])
            const endMinute = parseInt(shiftMatch[5])

            const startTime = startHour * 60 + startMinute
            const endTime = endHour * 60 + endMinute

            let rateIndex
            if (startTime >= 1 && startTime <= 540) {
                rateIndex = 0
            } else if (startTime >= 541 && startTime <= 1080) {
                rateIndex = 1
            } else if (startTime >= 1081 && startTime <= 1439) {
                rateIndex = 2
            }

            const rate = rates[dayOfWeek][rateIndex]
            const shiftPay = rate * (endTime - startTime) / 60
            payment += shiftPay
        }
    }
    return payment
}

module.exports = {
    calculateSalary
}