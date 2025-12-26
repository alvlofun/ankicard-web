// cardDB.js と reviewDB.js の競合を防ぐため、接続処理を一元化します
const DB_NAME = "ankiApp"
const DB_VERSION = 2 // バージョンを統一

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => {
      const db = e.target.result
      
      // カード用ストアの作成
      if (!db.objectStoreNames.contains("cards")) {
        db.createObjectStore("cards", { keyPath: "id" })
      }

      // 学習履歴用ストアの作成
      if (!db.objectStoreNames.contains("reviews")) {
        db.createObjectStore("reviews", { 
          keyPath: "id",
          autoIncrement: true 
        })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}