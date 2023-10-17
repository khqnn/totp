import hashlib
import hmac
import math
import time

def getSlicedTimeStamp(interval=30):
    now_in_seconds = math.floor(time.time())
    return math.floor(now_in_seconds / interval)


def generateTimeBasedHash(key, message):
    hash = hmac.new(
        bytes(key, encoding="utf-8"),
        bytes(message, encoding='utf-8'),
        hashlib.sha256,
    )
    return hash.hexdigest()


def dynamicTruncation(raw_key, length=6):
    offset = int(raw_key[0], base=16)
    chosen32bits = raw_key[offset: offset+8]
    otpstr = str(int(chosen32bits, base=16))
    return otpstr[-length:]


def generateTOTP(key, interval):
    timestamp = getSlicedTimeStamp(interval)
    raw_key = generateTimeBasedHash(key, str(timestamp))
    return dynamicTruncation(raw_key)
    


shared_key = 'e8fb1a2faf331bfffe8670ca20447fae'
interval = 30
totp = generateTOTP(shared_key, interval)
print(totp)