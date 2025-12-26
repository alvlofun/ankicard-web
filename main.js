import { Card } from "./src/model/card.js"
import { createCardView } from "./src/ui/cardView.js"
import { saveReviewToDB } from "./src/storage/reviewDB.js"
import { importCSV } from "./src/importer/csvImporter.js"
import { loadCards } from "./src/storage/cardDB.js"
import { buildPathTree } from "./src/utils/pathTree.js"
import { createPathBrowser } from "./src/ui/pathBrowser.js"

document.addEventListener("touchmove", e => {
  e.preventDefault()
}, { passive: false })

const app = document.getElementById("app")

/* =====================
   永続化
===================== */
async function saveReview(result) {
  await saveReviewToDB(result)
}

/* =====================
   描画
===================== */
function renderCard(card, onNext) {
  app.innerHTML = ""

  const cardView = createCardView(card, {
    onSwipe(direction) {
      const outcome = direction === "left" ? "correct" : "incorrect"

      saveReview({
        cardId: card.id,
        cardPath: card.path,
        outcome,
        reviewedAt: new Date().toISOString()
      })

      onNext()
    }
  })

  app.appendChild(cardView)
}

/* =====================
   CSV読み込み
===================== */
const csvInput = document.getElementById("csvInput")

csvInput.addEventListener("change", async e => {
  const file = e.target.files[0]
  if (!file) return

  const path = prompt("この問題群のパスを入力してください（例: 英語/英単語/500-550）")
  if (!path) return

  const importedCards = await importCSV(file, path)
  alert(`${importedCards.length} 問を読み込みました`)

  await showPathSelection()
})

/* =====================
   起動時処理
===================== */
async function showPathSelection() {
  const cards = await loadCards()
  app.innerHTML = ""

  if (cards.length === 0) {
    app.textContent = "問題がありません。CSVをインポートしてください。"
    return
  }

  const tree = buildPathTree(cards)

  const browser = createPathBrowser(tree, (selectedCards) => {
    startQuiz(selectedCards)
  })

  app.appendChild(browser)
}

const browser = createPathBrowser(tree, (selectedCards) => {
  startQuiz(selectedCards)
})

/* =====================
   出題開始処理
===================== */
function startQuiz(cards) {
  if (!cards || cards.length === 0) {
    alert("出題できる問題がありません")
    return
  }

  let index = 0

  function show() {
    const card = cards[index]
    renderCard(card, () => {
      index = (index + 1) % cards.length
      show()
    })
  }

  show()
}

showPathSelection()