let res=[]
async function pricePattern(num, price, para = [], count = 1) {
    for (let i = 0; i <= num; i++){
        para.push(i)
        if (count !== 5) {
            count += 1
            pricePattern(num - i, price, para, count)
            count -= 1
        }
        if (count === 5&&i===num&&para[0]*580+para[1]*390+para[2]*250+para[3]*210+para[4]*140+para[5]*120===price) {
            res.push(para.join('\t'))
        }
        para.pop()
    }
}

// メッセージ（数値）を受け取ったら素数がどうかを判定し、
// 結果をメッセージとして送信します。
self.addEventListener('message', (message) => {
    const num = message.data.num
    const price = message.data.price
    const countFrom = message.data.from
    const countTo = message.data.to
    console.log('起動')
    for (let i = countFrom; i <= countTo; i++){
        console.log(i)
        pricePattern(num-i, price, [i])
    }
    self.postMessage(res)
})