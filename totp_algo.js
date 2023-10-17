const crypto = require('crypto')

function getSlicedTimeStamp(interval=30){
    const timeInSeconds = Date.now()/1000
    return parseInt(String(timeInSeconds / interval)).toString()
}

function generateTimeBasedHash(key, message){
    const hash = crypto.createHmac("SHA256", key).update(message).digest()
    return hash.toString('hex')
}

function dynamicTruncation(hexDigest, length = 6){
    const offset = parseInt( hexDigest[0], 16)
    const chosen32bits = hexDigest.slice(offset, offset+8)
    const otpString = BigInt(parseInt(chosen32bits, 16)).toString(10)
    const n = otpString.length
    return otpString.slice(n-length, n)
}

function generateTOTP(key, intervalInSeconds){
    const timestamp = getSlicedTimeStamp(intervalInSeconds)
    const hexDigest = generateTimeBasedHash(key, timestamp)
    return dynamicTruncation(hexDigest)
}

async function main(){
    const intervalInSeconds = 30
    const shared_key = 'e8fb1a2faf331bfffe8670ca20447fae'
    const totp = generateTOTP(shared_key, intervalInSeconds)
    console.log(totp);
}

main().then(()=>{console.log('completed!');}).catch((err)=>{console.log('ERROR: ', err);})