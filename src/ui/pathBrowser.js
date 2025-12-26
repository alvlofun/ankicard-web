import { collectCards } from "../utils/pathTree.js"

export function createPathBrowser(tree, onSelect) {
  const container = document.createElement("div")
  container.style.textAlign = "left"
  container.style.padding = "16px"

  function renderNode(node, depth = 0) {
    const wrapper = document.createElement("div")

    for (const key of Object.keys(node)) {
      if (key === "__cards__") continue

      const row = document.createElement("div")
      row.textContent = key
      row.style.marginLeft = `${depth * 16}px`
      row.style.padding = "6px 4px"
      row.style.cursor = "pointer"
      row.style.userSelect = "none"
      row.style.borderRadius = "4px"

      row.addEventListener("click", () => {
        const cards = collectCards(node[key])
        if (cards.length === 0) return
        onSelect(cards)
      })

      wrapper.appendChild(row)
      wrapper.appendChild(renderNode(node[key], depth + 1))
    }

    return wrapper
  }

  container.appendChild(renderNode(tree))
  return container
}
