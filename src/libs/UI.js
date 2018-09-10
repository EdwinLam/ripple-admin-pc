import iView from 'iview'

export default class UI {
  static msg ({ message }) {
    iView.Message.info(message)
  }
  static successMsg ({ message }) {
    iView.Message.success(message)
  }
  static warningMsg ({ message }) {
    iView.Message.warning(message)
  }
  static errorMsg ({ message }) {
    iView.Message.error(message)
  }
}
