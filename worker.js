const dp = {0:[0]}
const columns = [58, 39, 25, 21, 14, 12]

function dfs(price, num, depth, result) {
  if (num === 0) {
    self.postMessage(result)
    return
  }
  if (depth === 6) return
  for (let i = 0; i <= num; i++) {
    if (price - columns[depth] * i < 0) break
    if (dp[num - i].includes(price- columns[depth] * i)) {
      result[depth] = i
      dfs(price - columns[depth] * i, num - i, depth + 1, result)
    }
  }
}

self.addEventListener('message', (message) => {
  const num = message.data.num
  const price = message.data.price / 10
  if (num * columns.slice(-1)[0] > price||num * columns[0] < price) {
    self.postMessage('finish')
    return
  }
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < price; j++) {
      if (!dp[i].includes(j)) continue
      if (!dp[i + 1])
        dp[i + 1] = []
      for (let k = 0; k < 6; k++) {
        dp[i + 1].push(j + columns[k])
      }
    }
  }
  const result = [0, 0, 0, 0, 0, 0]
  dfs(price, num, 0, result)
  
  self.postMessage('finish')
})
