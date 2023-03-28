const bodyParser = async (req) => {
    let totalData = "";
    await new Promise((resolve, reject) => {
        req
            .on("error", err => {
                reject(err);
            })
            .on("data", chunk => {
                totalData += chunk;
            })
            .on("end", () => {
                req.body = JSON.parse(totalData);
                resolve();
            })
    })
    return req.body;

}

module.exports = { bodyParser }