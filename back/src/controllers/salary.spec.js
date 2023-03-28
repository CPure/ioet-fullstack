const salaryController = require('./salary')
jest.mock('../services/salary-calculation')
const salaryService = require('../services/salary-calculation')
jest.mock('../helpers/bodyParser')
const { bodyParser } = require('../helpers/bodyParser')

describe('calculateSalary', () => {
    it('should calculate salaries correctly', async () => {

        const req = {
            body: {
                data: [
                    "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00",
                    "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00"
                ]
            }
        }
        bodyParser.mockReturnValue(req)
        const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() }
        const expectedSalaries = [
            "The amount to pay RENE is: 215 USD",
            "The amount to pay ASTRID is: 85 USD"
        ]
        salaryService.calculateSalary.mockReturnValue(expectedSalaries)

        await salaryController.salary(req, res)

        expect(res.writeHead).toHaveBeenCalledWith(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
        })
        expect(res.write).toHaveBeenCalledWith(JSON.stringify({
            salaries: expectedSalaries,
            message: 'correct'
        }))
        expect(res.end).toHaveBeenCalled()
    })
    it('should return a 500 error if bodyParser returns empty object', async () => {

        bodyParser.mockImplementation(() => { })
        const req = { body: {} }
        const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() }

        await salaryController.salary(req, res)

        expect(res.writeHead).toHaveBeenCalledWith(500,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
            })
        expect(res.write).toHaveBeenCalledWith(JSON.stringify({
            salaries: null,
            message: 'Error parsing request body'
        }))
        expect(res.end).toHaveBeenCalled()
    })

    it('should return a 500 error if salaryService throws an error', async () => {

        const req = {
            body: {
                data: [
                    "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00",
                    "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00"
                ]
            }
        }
        bodyParser.mockReturnValue(req)
        const res = { writeHead: jest.fn(), write: jest.fn(), end: jest.fn() }
        const error = new Error('Internal Server Error')
        salaryService.calculateSalary.mockImplementation(() => { throw error })


        await salaryController.salary(req, res)

        expect(res.writeHead).toHaveBeenCalledWith(500,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
            })
        expect(res.write).toHaveBeenCalledWith(JSON.stringify({
            salaries: null,
            message: 'Error calculating salaries'
        }))
        expect(res.end).toHaveBeenCalled()
    })
})