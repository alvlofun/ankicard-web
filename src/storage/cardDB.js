import { openDB } from "./db.js" // 共通DBモジュールを使用

const STORE_NAME = "cards"

export async function saveCards(cards) {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)

  // Promise.allで全件保存を待機
  const promises = cards.map(card => {
    return new Promise((resolve, reject) => {
      const req = store.put(card)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })

  await Promise.all(promises)
}

export async function loadCards() {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, "readonly")
  const store = tx.objectStore(STORE_NAME)

  return new Promise((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}