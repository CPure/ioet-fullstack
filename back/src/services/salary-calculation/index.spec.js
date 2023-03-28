const { calculateSalary } = require('./index')

describe('calculateSalary', () => {
  it('should return correct payment for one employee', () => {
    const employeesHours = ['Carlos=TU10:00-13:00']
    const expectedPayment = ['The amount to pay Carlos is: 45 USD']
    expect(calculateSalary(employeesHours)).toEqual(expectedPayment)
  })

  it('should return correct payment for multiple employees with different shifts', () => {
    const employeesHours = ['Carlos=MO10:00-13:00,WE13:00-15:00', 'John=TU12:00-14:00,TH15:00-17:00']
    const expectedPayment = ['The amount to pay Carlos is: 75 USD', 'The amount to pay John is: 60 USD']
    expect(calculateSalary(employeesHours)).toEqual(expectedPayment)
  })

  it('should return correct payment for employees with same name but different shifts', () => {
    const employeesHours = ['Carlos=MO10:00-13:00,WE13:00-15:00', 'Carlos=TU12:00-14:00,TH15:00-17:00']
    const expectedPayment = ['The amount to pay Carlos is: 75 USD', 'The amount to pay Carlos is: 60 USD']
    expect(calculateSalary(employeesHours)).toEqual(expectedPayment)
  })

  it('should return empty array for empty input', () => {
    const employeesHours = []
    const expectedPayment = []
    expect(calculateSalary(employeesHours)).toEqual(expectedPayment)
  })

  it('should return empty array for invalid input', () => {
    const employeesHours = ['Invalid Input', 'Another invalid input']
    const expectedPayment = []
    expect(calculateSalary(employeesHours)).toEqual(expectedPayment)
  })
})