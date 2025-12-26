import { collectCards } from "../utils/pathTree.js"

export function createPathBrowser(tree, onSelect) {
  const container = document.createElement("div")
  container.className = "path-browser"

  function renderNode(node, depth = 0) {
    const wrapper = document.createElement("div")

    for (const key of Object.keys(node)) {
      if (key === "__cards__") continue

      const row = document.createElement("div")
      row.className = "folder-row"
      row.textContent = key
      // インデント
      row.style.paddingLeft = `${(depth * 20) + 10}px`
      row.style.paddingTop = "12px"
      row.style.paddingBottom = "12px"
      row.style.cursor = "pointer"
      row.style.userSelect = "none"
      
      // 子要素のカード数をカウントして表示（任意）
      const childCards = collectCards(node[key])
      const countSpan = document.createElement("span")
      countSpan.style.float = "right"
      countSpan.style.marginRight = "10px"
      countSpan.style.color = "#999"
      countSpan.style.fontSize = "0.9em"
      countSpan.textContent = `${childCards.length}問`
      row.appendChild(countSpan)

      row.addEventListener("click", () => {
        if (childCards.length === 0) return
        onSelect(childCards)
      })

      wrapper.appendChild(row)
      wrapper.appendChild(renderNode(node[key], depth + 1))
    }

    return wrapper
  }

  const list = renderNode(tree)
  container.appendChild(list)
  
  return container
}