export function buildPathTree(cards) {
  const root = {}

  for (const card of cards) {
    // パス区切り文字 "/" で分割
    const parts = card.path.split("/")
    let node = root

    for (const part of parts) {
      if (!node[part]) {
        node[part] = {}
      }
      node = node[part]
    }

    if (!node.__cards__) {
      node.__cards__ = []
    }
    node.__cards__.push(card)
  }

  return root
}

export function collectCards(node) {
  let result = []

  if (node.__cards__) {
    result = result.concat(node.__cards__)
  }

  for (const key of Object.keys(node)) {
    if (key !== "__cards__") {
      result = result.concat(collectCards(node[key]))
    }
  }

  return result
}