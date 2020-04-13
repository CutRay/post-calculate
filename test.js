console.log('件数\t金額\tを入力')
let readline = require('readline')
let input = []
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.prompt()
rl.on('line', function (cmd) {
    if (cmd == '')
        rl.close()
    input.push(cmd)
})

rl.on('close', function () {
    input.forEach((el) => {
        console.log('580\t390\t250\t210\t140\t120\t合計')
        const data=el.replace('\t',' ').split(' ')
        const count=Number(data[0])
        const price = Number(data[1])
        test(count, price)
        console.log('\n')
    })
    process.exit(0)
})
function test(count,price) {
    pricePattern(count, price)
    console.log(res)
}
let res=[]
async function pricePattern(num, price, para = [], count = 1) {
    for (let i = 0; i <= num; i++){
        para.push(i)
        if (count !== 5) {
            count += 1
            pricePattern(num - i, price, para, count)
            count -= 1
        }
        if (count === 5&&i===num&&para[0]*390+para[1]*250+para[2]*210+para[3]*140+para[4]*120===price) {
            res.push(para.join('\t'))
        }
        para.pop()
    }
}


