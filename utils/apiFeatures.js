class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
  search() {

        const keyword = this.queryStr.keyword ? {
            email: this.queryStr.keyword
        } : {}

        const query = this.query.find({ ...keyword })

        return this
    }
    searchByName() {
        const keyword = this.queryStr.name ? {
            name: {
                $regex: this.queryStr.name,
                $options:'i',
        },
        } : {}
        const query = this.query.find({ ...keyword })
        return this
    }
}
module.exports = ApiFeatures
