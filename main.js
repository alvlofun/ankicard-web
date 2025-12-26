import { Card } from "./src/model/card.js"
import { createCardView } from "./src/ui/cardView.js"

const app = document.getElementById("app")

const cards = [
  new Card({
    id: "1",
    question: "GitHub Pagesとは何ですか？",
    answer: "GitHubが提供する静的サイトのホスティングサービスです。"
  }),
  new Card({
    id: "2",
    question: "PWAとは何の略ですか？",
    answer: "Progressive Web App の略です。"
  }),
  new Card({
    id: "3",
    question: "IndexedDBは何のために使いますか？",
    answer: "ブラウザ内に構造化データを保存するためです。"
  })
]

let currentIndex = 0
let currentCardView = null

function showCard(index) {
  app.innerHTML = ""

  const cardView = createCardView(cards[index], {
    onSwipe(direction) {
      // 次のカードへ
      currentIndex = (currentIndex + 1) % cards.length
      showCard(currentIndex)
    }
  })

  app.appendChild(cardView)
}

showCard(currentIndex)
