import { openDB } from "./db.js" // 共通DBモジュールを使用

const STORE_NAME = "reviews"

export async function saveReviewToDB(review) {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  const store = tx.objectStore(STORE_NAME)

  return new Promise((resolve, reject) => {
    const req = store.add(review)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}