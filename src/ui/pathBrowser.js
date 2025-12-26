import { collectCards } from "../utils/pathTree.js"

export function createPathBrowser(tree, onSelect) {
  const container = document.createElement("div")

  function renderNode(node, depth = 0) {
    const wrapper = document.createElement("div")
    wrapper.style.marginLeft = `${depth * 16}px`

    for (const key of Object.keys(node)) {
      if (key === "__cards__") continue

      const row = document.createElement("div")
      row.textContent = key
      row.style.cursor = "pointer"
      row.style.fontWeight = "bold"

      row.addEventListener("click", () => {
        const cards = collectCards(node[key])
        onSelect(cards, key)
      })

      wrapper.appendChild(row)
      wrapper.appendChild(renderNode(node[key], depth + 1))
    }

    return wrapper
  }

  container.appendChild(renderNode(tree))
  return container
}
