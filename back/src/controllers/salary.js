const { bodyParser } = require('../helpers/bodyParser')
const salaryService = require('../services/salary-calculation')
const HEADER = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
}
const salary = async (req, res) => {
    const body = await bodyParser(req)

    if (!body || Object.keys(body).length === 0 || body?.data?.length === 0) {

        res.writeHead(500,
            HEADER)
        res.write(JSON.stringify({
            salaries: null,
            message: 'Error parsing request body'
        }))
        res.end()
        return res
    }

    try {
        const salaries = salaryService.calculateSalary(body.data)

        res.writeHead(200, HEADER)
        res.write(JSON.stringify({
            salaries: salaries,
            message: 'correct'
        }))

        res.end()

    } catch (e) {
        res.writeHead(500, HEADER)
        res.write(JSON.stringify({
            salaries: null,
            message: 'Error calculating salaries'
        }))
        res.end()
    }

    return res
}

module.exports = {
    salary,
}
