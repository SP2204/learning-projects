let current = null
let numBot = null, numMid = null, numTop = null
let opBot = null, opMid = null

document.getElementById('0').addEventListener('click', () => addCurrent(0))
document.getElementById('1').addEventListener('click', () => addCurrent(1))
document.getElementById('2').addEventListener('click', () => addCurrent(2))
document.getElementById('3').addEventListener('click', () => addCurrent(3))
document.getElementById('4').addEventListener('click', () => addCurrent(4))
document.getElementById('5').addEventListener('click', () => addCurrent(5))
document.getElementById('6').addEventListener('click', () => addCurrent(6))
document.getElementById('7').addEventListener('click', () => addCurrent(7))
document.getElementById('8').addEventListener('click', () => addCurrent(8))
document.getElementById('9').addEventListener('click', () => addCurrent(9))

document.getElementById('decimal').addEventListener('click', () => addCurrent('.'))

document.getElementById('div').addEventListener('click', () => addOp('/'))
document.getElementById('mult').addEventListener('click', () => addOp('x'))
document.getElementById('add').addEventListener('click', () => addOp('+'))
document.getElementById('subt').addEventListener('click', () => addOp('-'))
document.getElementById('equals').addEventListener('click', () => equals('='))

let topNo = document.getElementById('screenTop')
let middleNo = document.getElementById('screenMid')
let bottomNo = document.getElementById('screenBot')
let topOp = document.getElementById('opTop')
let middleOp = document.getElementById('opMid')
let bottomOp = document.getElementById('opBot')


function addCurrent(val) {
    if (val=='0' && current==null) return
    current += val
    bottomNo.innerText=current
}

function addOp(op){
    // console.log('here')
    // if (op=='-') console.log('here')
    if (!(current==null) && !(current.toString().endsWith(' '))){
        current += ' ' + op + ' '
        bottomNo.innerText=current
    }
    if (current==null & op=='-') current=op
        else if (current==null) return
}

function equals(){
    let digits = ['0','1','2','3','4','5','6','7','8','9']
    if (current.includes(' ') && (digits.includes(current[current.length-1]))){
        let arr = current.split(' ')
        let result = doMath(arr)
        console.log(result+'')
        bottomNo.innerText+=' = '+ result
        // // needs repair!!
        // if (typeof(result)=='number') bottomNo.innerText+=' = ' + result
        // else{
        //     bottomNo.innerText=result
        // }
    }
    topNo.innerText = numMid
    middleNo.innerText = 
    current = null
}

function doMath(arr){
    let i = 0
    while((arr.indexOf('x')!=-1 || arr.indexOf('/')!=-1)){
        (arr.indexOf('x')!=-1 && arr.indexOf('/')!=-1) ? i = Math.min(arr.indexOf('x'), arr.indexOf('/'))
            : arr.indexOf('x')!=-1 ? i = arr.indexOf('x') : i = arr.indexOf('/')
        if (arr[i]=='/' && arr[i+1]==0) {
            current = null
            return `can't divide by zero`
        }
        arr[i]=='x' ? arr[i-1]=arr[i-1]*arr[i+1] : arr[i-1]=arr[i-1]/arr[i+1]
        arr.splice(i,2)
    }
    let result = Number(arr[0])
    for(i=1; i<arr.length; i++){
        if (arr[i]=='+') result += Number(arr[i+1])
        if (arr[i]=='-') result -= Number(arr[i+1])
        i++
    }
    return result
}