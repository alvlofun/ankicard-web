export function createCardView(card, { onSwipe } = {}) {
  const cardEl = document.createElement("div")
  cardEl.className = "card"

  const questionEl = document.createElement("div")
  questionEl.className = "question"
  questionEl.textContent = card.question

  const answerEl = document.createElement("div")
  answerEl.className = "answer hidden"
  answerEl.textContent = card.answer

  cardEl.append(questionEl, answerEl)

  // タップで解答表示
  cardEl.addEventListener("click", () => {
    answerEl.classList.toggle("hidden")
  })

  // スワイプ検出
  let startX = null

  cardEl.addEventListener("pointerdown", (e) => {
    startX = e.clientX
    cardEl.setPointerCapture(e.pointerId)
  })

  cardEl.addEventListener("pointerup", (e) => {
    if (startX === null) return

    const deltaX = e.clientX - startX
    const threshold = 80

    if (deltaX > threshold) {
      onSwipe?.("right")
    } else if (deltaX < -threshold) {
      onSwipe?.("left")
    }

    startX = null
  })

  return cardEl
}
