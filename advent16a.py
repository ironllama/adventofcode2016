#initial = "10000"
#initLen = 20

initial = "00111101111101000"
initLen = 272

while len(initial) < initLen:
    #reverse = ''.join(reversed(initial))
    reverse = initial[::-1]
    reverse = ''.join(str(1 - int(c)) for c in reverse)
    initial = initial + '0' + reverse

initial = initial[:initLen]
#print("INITIAL:", initial)

numPair = 2
while len(initial) % 2 != 1:
    pairs = [initial[i:i+numPair] for i in range(0, len(initial), numPair)]
    #print("PAIRS:", pairs)
    initial = ''
    for i in pairs:
        #print("TEST:", i[0], i[1])
        if i[0] == i[1]: initial += '1'
        else: initial += '0'
    #print("CHECKSUM:", initial)

print("FINAL:", initial)
