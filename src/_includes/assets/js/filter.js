const toLowerCase = (value) => {
    return value.toLowerCase()
}

const limit = (array, limit) =>  {
    return array.slice(0, limit)
} 

module.exports = {
    toLowerCase,
    limit
}