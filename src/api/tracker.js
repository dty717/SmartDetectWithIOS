import axios from 'axios'
const {uploadIP} = require('../common/config')

export default axios.create({
    baseURL:uploadIP
})