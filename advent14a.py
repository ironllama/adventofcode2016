import hashlib
import re

salt = "zpqevtbw"
addCheck = {}
final = []

def inAddCheck(match, idx):
    global addCheck
    results = []
    for k, v in addCheck.items():
        #if k == 792: print("COMPARE:", k, idx, (idx-k), v[0], match)
        if idx == 771: print("COMPARE:", k, idx, (idx-k), v[0], match)
        if (idx-k) <= 1000 and v[0] == match: results.append(k)
    return results

i = 0
while(True):
    totalSalt = salt + str(i)
    hash = hashlib.md5( totalSalt.encode('utf-8') ).hexdigest()
    threeMatch = re.search(r'([a-z0-9])\1\1', hash, re.I)
    if threeMatch:
        threeStr = threeMatch.group()
        #print ("THREE:", totalSalt, threeStr, hash) # Store these

        fiveMatch = re.search(r'([a-z0-9])\1\1\1\1', hash, re.I)
        if fiveMatch:
            fiveToThreeStr = fiveMatch.group()[0:3]
            #print("FIVE:", fiveToThreeStr)
            threeKey = inAddCheck(fiveToThreeStr, i)
            if len(threeKey) > 0:
                for thisKey in threeKey:
                    final.append([ threeStr, thisKey, addCheck[thisKey][1], i, hash ])
                    #print("FOUND:", threeStr, threeKey, addCheck[threeKey][1], i, hash)
                    if len(final) == 64:
                        #print("END REACHED!")
                        break
                if len(final) == 64: break
                    
        addCheck[i] = [threeStr, hash]
    i += 1

#print("ADDCHECK: ")
#for k, v in addCheck.items(): print(k, v)

print("FINAL:")
for idx, v in enumerate(final):
    print(idx, v)

    