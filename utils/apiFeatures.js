class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const name = this.queryStr.name
        const keyword = this.queryStr.keyword
        if (name.length != 0) {
            const query = this.query.find({ ...name })
        } else { const query = this.query.find({ ...keyword }) }

        return this
    }
}
module.exports = ApiFeatures
