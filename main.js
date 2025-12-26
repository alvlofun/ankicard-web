import { Card } from "./src/model/card.js"
import { createCardView } from "./src/ui/cardView.js"

const app = document.getElementById("app")

// 仮カード（後でDB・Schedulerに置き換える）
const sampleCard = new Card({
  id: "1",
  question: "GitHub Pagesとは何ですか？",
  answer: "GitHubが提供する静的サイトのホスティングサービスです。"
})

const cardView = createCardView(sampleCard)
app.appendChild(cardView)
