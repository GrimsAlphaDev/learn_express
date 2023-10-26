// const response = (statusCode, data, message, res) => {
//     res.status(statusCode).json( {
//         payload: {
//             statusCode: statusCode,
//             datas: data,
//         },
//         message: message,
//         pagination : {
//             prev: "",
//             next: "",
//             max: "",
//         }
//     })
// }

const response = (statusCode, data, message, res) => {
    res.json(statusCode, [
        {
            message: message,
            payload: data,
            metadata: {
                prev: "",
                next: "",
                max: "",
            }
        },
    ])
}

module.exports = response;