import { Card } from "./src/model/card.js"
import { createCardView } from "./src/ui/cardView.js"
import { SequentialScheduler } from "./src/scheduler/sequentialScheduler.js"
import { saveReviewToDB } from "./src/storage/reviewDB.js"

document.addEventListener("touchmove", e => {
  e.preventDefault()
}, { passive: false })

const app = document.getElementById("app")

/* =====================
   カード定義（最初に）
===================== */
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

/* =====================
   Scheduler
===================== */
const scheduler = new SequentialScheduler()
let schedulerState = { currentIndex: 0 }

/* =====================
   永続化
===================== */
async function saveReview(result) {
  await saveReviewToDB(result)
}

/* =====================
   描画
===================== */
function renderCard(card) {
  app.innerHTML = ""

  const cardView = createCardView(card, {
    onSwipe(direction) {
      const outcome = direction === "left"
        ? "correct"
        : "incorrect"

      saveReview({
        cardId: card.id,
        cardPath: card.path,
        outcome,
        reviewedAt: new Date().toISOString()
      })

      const result = scheduler.next(cards, schedulerState)
      schedulerState = result.nextState

      renderCard(result.card)
    }
  })

  app.appendChild(cardView)
}

/* =====================
   初期表示
===================== */
renderCard(cards[schedulerState.currentIndex])
