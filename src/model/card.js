export class Card {
  constructor({ id, path, question, answer, note = "" }) {
    this.id = id           // 内部ID
    this.path = path       // フォルダパス
    this.question = question
    this.answer = answer
    this.note = note       // 備考（Excelの3列目）
  }
}