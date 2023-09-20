const resBase = (status, message, data) => {
    return {
        status,
        message,
        error: null,
        data
    }
}

const resBaseError = (statusCode, errorMessage, error) => {
    return {
        status_code : statusCode,
        errorMessage,
        error
    }
}

module.exports = {
    resBase,
    resBaseError
}