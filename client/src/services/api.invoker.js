import axios from 'axios'

class ApiInvoker {
  constructor() {
    this.http = axios.create({
      baseURL: '/api'
    })
  }
}

const apiInvoker = new ApiInvoker()

export { apiInvoker }