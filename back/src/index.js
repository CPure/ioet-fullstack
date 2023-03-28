const http = require('http')
const { salary } = require('./controllers/salary')

const server = http.createServer(async (req, res) => {
    const { url, method } = req

    console.log(`URL: ${url} - Method: ${method}`)
    try {
        if (method === 'POST') {
            if (url === "/api/salary") {
                salary(req, res)
            }
            if (url !== "/api/salary") {
                res.writeHead(404,
                    {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Methods": "OPTIONS, POST, GET"
                    }
                )
                res.write(JSON.stringify({ message: 'Does not exist' }))
                res.end()
            }
        }
        if (method !== 'POST') {
            res.writeHead(200, {
                'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", // REQUIRED CORS HEADER
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            })
            res.write(JSON.stringify({ message: 'Hello' }))
            res.end()
        }
    } catch (e) {
        console.log(e)
    }


})

server.listen(3100)
console.log('Server on port 3100')