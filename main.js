import { createCardView } from "./src/ui/cardView.js"
import { saveReviewToDB } from "./src/storage/reviewDB.js"
import { importTSV } from "./src/importer/tsvImporter.js" // TSVに変更
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
      // 左スワイプで正解、右で不正解とする（要件に応じて変更可）
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
   TSV読み込み
===================== */
// ID変更に対応
const tsvInput = document.getElementById("tsvInput")

tsvInput.addEventListener("change", async e => {
  const file = e.target.files[0]
  if (!file) return

  const path = prompt("この問題群のパスを入力してください（例: 英語/英単語/500-550）")
  if (!path) {
    tsvInput.value = "" // キャンセル時は入力をリセット
    return
  }

  try {
    const importedCards = await importTSV(file, path)
    alert(`${importedCards.length} 問を読み込みました`)
    tsvInput.value = "" // 読み込み完了後にリセット
    await showPathSelection()
  } catch (err) {
    console.error(err)
    alert("読み込みに失敗しました")
  }
})

/* =====================
   起動時処理
===================== */
async function showPathSelection() {
  const cards = await loadCards()
  app.innerHTML = ""

  if (cards.length === 0) {
    const msg = document.createElement("div")
    msg.textContent = "問題がありません。右上のボタンからTSVをインポートしてください。"
    app.appendChild(msg)
    return
  }

  const tree = buildPathTree(cards)

  const browser = createPathBrowser(tree, (selectedCards) => {
    startQuiz(selectedCards)
  })

  app.appendChild(browser)
}

/* =====================
   出題開始処理
===================== */
function startQuiz(cards) {
  if (!cards || cards.length === 0) {
    alert("出題できる問題がありません")
    return
  }

  // シャッフルしたい場合はここで cards をシャッフルする

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