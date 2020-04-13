const cluster = require('cluster')

// CPUの数が上限である必要はある？ これ以上なら動かないというわけでもないけど
const numCPUs = require('os').cpus().length

const masterFnc = (num) => {

    // 初期準備 処理対象
    const target = [...Array(num+1).keys()]
    // 各コアの処理数が均等になるように渡す数を分割する (ただしこのやり方は最後が楽になる)
    const slicedTarget = []
    const bundle = Math.ceil(target.length / numCPUs)
    for (let i = 0; i < target.length; i += bundle) {
        slicedTarget.push(target.slice(i, i + bundle))
    }
    // fork実行
    for (let i = 0; i < slicedTarget.length; i++) {
        let worker = cluster.fork()
        worker.on('online', () => {
            worker.send(slicedTarget[i])
        })
    }
}

const workerFnc = (num,price) => {
    // Masterから値をもらったらお仕事スタート
    process.on('message', (arr) => {
        arr.forEach((el) => {
            pricePattern(num-el, price,[el])
        })
        // 値を返してお仕事終了
        // process.send(arr)
        cluster.worker.disconnect()
    })
}

async function pricePattern(num, price, para = [], count = 1) {
    for (let i = 0; i <= num; i++){
        para.push(i)
        if (count !== 5) {
            count += 1
            pricePattern(num - i, price, para, count)
            count -= 1
        }
        if (count === 5&&i===num&&para[0]*580+para[1]*390+para[2]*250+para[3]*210+para[4]*140+para[5]*120===price) {
            console.log(para.join('\t')+'\t'+para.reduce((a,x) => a+=x))
        }
        para.pop()
    }
}

(async () => {
    if (cluster.isMaster) {
        await masterFnc(120)
    // 受け取った結果を使い処理を継続できる
    } else {
        workerFnc(120, 69600)
    }
})()