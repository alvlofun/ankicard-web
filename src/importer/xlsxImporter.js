import { Card } from "../model/card.js"
import { saveCards } from "../storage/cardDB.js"

export async function importXLSX(file, path) {
  // ArrayBufferとしてファイルを読み込む
  const data = await file.arrayBuffer()
  
  // SheetJS (Global変数のXLSX) を使ってワークブックを読み込む
  const workbook = XLSX.read(data)
  
  // 最初のシートを取得
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  
  // シートを2次元配列に変換 (header: 1 は配列の配列として取得する設定)
  // 例: [ ["問題", "答え", "備考"], ["apple", "りんご", ""], ... ]
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  // 1行目はヘッダーとみなして除外（データが空の場合は考慮）
  const dataRows = rows.length > 1 ? rows.slice(1) : []

  const cards = dataRows
    .filter(row => row.length > 0 && row[0]) // 空行や問題文がない行を除外
    .map((row, index) => {
      // Excelのセルデータは文字列とは限らないため、String()で変換
      const question = row[0] ? String(row[0]) : ""
      const answer = row[1] ? String(row[1]) : ""
      const note = row[2] ? String(row[2]) : ""

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