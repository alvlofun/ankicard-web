import { Card } from "../model/card.js"
import { saveCards } from "../storage/cardDB.js"

export async function importCSV(file, path) {
  const text = await file.text()
  const lines = text.split("\n").slice(1) // ヘッダー除外

  const cards = lines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((line, index) => {
      const [question, answer, note] = line.split(",")

      return new Card({
        id: `${path}-${index}-${crypto.randomUUID()}`,
        path,
        question,
        answer,
        note
      })
    })

  await saveCards(cards)
  return cards
}
