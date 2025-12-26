export class Card {
  constructor({ id, path, question, answer }) {
    this.id = id           // 内部ID（UUIDなど）
    this.path = path       // 人間可読な構造ID
    this.question = question
    this.answer = answer
  }
}