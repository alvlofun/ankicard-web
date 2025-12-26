import { Card } from "./src/model/card.js"
import { createCardView } from "./src/ui/cardView.js"

const app = document.getElementById("app")

function saveReview(result) {
  const key = "reviewResults"
  const existing = JSON.parse(localStorage.getItem(key) || "[]")
  existing.push(result)
  localStorage.setItem(key, JSON.stringify(existing))
}

const cards = [
  new Card({
    id: "c1",
    path: "英語/基礎/用語",
    question: "GitHub Pagesとは何ですか？",
    answer: "GitHubが提供する静的サイトのホスティングサービスです。"
  }),
  new Card({
    id: "c2",
    path: "英語/Web/略語",
    question: "PWAとは何の略ですか？",
    answer: "Progressive Web App の略です。"
  }),
  new Card({
    id: "c3",
    path: "英語/Web/DB",
    question: "IndexedDBは何のために使いますか？",
    answer: "ブラウザ内に構造化データを保存するためです。"
  })
]

let currentIndex = 0
let currentCardView = null

function showCard(index) {
  app.innerHTML = ""

  const card = cards[index]

  const cardView = createCardView(card, {
    onSwipe(direction) {
      const outcome =
        direction === "left" ? "correct" : "incorrect"

      saveReview({
        cardId: card.id,
        cardPath: card.path,
        outcome,
        reviewedAt: new Date().toISOString()
      })

      currentIndex = (currentIndex + 1) % cards.length
      showCard(currentIndex)
    }
  })

  app.appendChild(cardView)
}

showCard(currentIndex)
