#allData = """Disc #1 has 5 positions; at time=0, it is at position 4.
#Disc #2 has 2 positions; at time=0, it is at position 1."""

allData = """Disc #1 has 17 positions; at time=0, it is at position 15.
Disc #2 has 3 positions; at time=0, it is at position 2.
Disc #3 has 19 positions; at time=0, it is at position 4.
Disc #4 has 13 positions; at time=0, it is at position 2.
Disc #5 has 7 positions; at time=0, it is at position 2.
Disc #6 has 5 positions; at time=0, it is at position 0.
Disc #7 has 11 positions; at time=0, it is at position 0."""

allLines = allData.split('\n');
allArr = []

for i in range(len(allLines)):
    tokens = allLines[i].split();
    numPos = int(tokens[3])
    startPos = int(tokens[11][0:-1])
    startOffset = (numPos - (((i+1) + startPos) % numPos)) % numPos
    allArr.append([startOffset, numPos])
    
#print("ALLARR:", allArr)
    
def myGen():
    global allArr
    i = 0
    while(True):
        yield (allArr[0][1] * i) + allArr[0][0]
        i += 1

final = -1
for i in myGen():
    #print("TRYING:", i)
    for j in range(1, len(allArr)):
        #print("TEST:", allArr[j][0])
        if i % allArr[j][1] != allArr[j][0]: break
        elif j == (len(allArr) - 1):
            #print("FOUND:", i)
            final = i
    if final != -1: break

print("FINAL:", final)
