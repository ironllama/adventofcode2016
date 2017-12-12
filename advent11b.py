#import time
#allData = """cpy 41 a
#inc a
#inc a
#dec a
#jnz a 2
#dec a"""

allData = """cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 14 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5"""

allDataList = allData.split('\n')
myReg = { 'a': 0, 'b': 0, 'c': 1, 'd': 0 }
i = 0

while i<len(allDataList):
    #print("CURR:", allDataList[i], "ITER:", i)
    #for k in myReg: print(k, ": ", myReg[k])
    #time.sleep(0.5)
    tokens = allDataList[i].split();
    if tokens[0] == 'cpy':
        if tokens[1].isdigit():
            myReg[tokens[2]] = int(tokens[1])
        else:
            myReg[tokens[2]] = myReg[tokens[1]]
    elif tokens[0] == 'inc':
        myReg[tokens[1]] += 1
    elif tokens[0] == 'dec':
        myReg[tokens[1]] -= 1
    elif tokens[0] == 'jnz':
        if tokens[1].isdigit():
            if int(tokens[1]) != 0:
                i += (int(tokens[2]) - 1)
        elif myReg[tokens[1]] != 0:
                i += (int(tokens[2]) - 1)
    i += 1
    
for k in myReg: print(k, ": ", myReg[k])
