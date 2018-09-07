export default class BaseException {
  constructor ({ code, message }) {
    this.code = code
    this.message = message
  }
  print () {
    console.error(`[${this.code}]${this.message}`)
  }
}
