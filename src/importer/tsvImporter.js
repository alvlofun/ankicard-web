import { Card } from "../model/card.js"
import { saveCards } from "../storage/cardDB.js"

export async function importTSV(file, path) {
  const text = await file.text()
  
  // 改行コードの揺らぎ（CRLF, LF）を吸収して分割
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  
  // 1行目はヘッダーとしてスキップします（必要に応じてコメントアウトしてください）
  const dataLines = lines.slice(1) 

  const cards = dataLines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((line, index) => {
      // タブ(\t)で分割
      const parts = line.split("\t")
      
      // [問題, 答え, 備考] の順と想定
      // 要素が足りない場合は空文字を入れる
      const question = parts[0] || ""
      const answer = parts[1] || ""
      const note = parts[2] || ""

      return new Card({
        id: `${path}-${index}-${crypto.randomUUID()}`,
        path,
        question,
        answer,
        note // Cardモデルにnoteプロパティがある前提
      })
    })

  await saveCards(cards)
  return cards
}