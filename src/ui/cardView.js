export function createCardView(card) {
  const cardEl = document.createElement("div")
  cardEl.className = "card"

  const questionEl = document.createElement("div")
  questionEl.className = "question"
  questionEl.textContent = card.question

  const answerEl = document.createElement("div")
  answerEl.className = "answer hidden"
  answerEl.textContent = card.answer

  cardEl.addEventListener("click", () => {
    answerEl.classList.toggle("hidden")
  })

  cardEl.append(questionEl, answerEl)
  return cardEl
}
