#dim = [10, 7]
#fav = 10
#dest = [7, 4]

dim = [40, 45]
fav = 1350
dest = [31, 39]

start = [1, 1]
mapo = []

# shortest = float('inf')
allMatches = []

for y in range(dim[1]):
    mapo.append([])
    for x in range(dim[0]):
        #if x == 0: print(y % 10, end="")
        decNum = ((x*x) + (x*3) + (2*x*y) + y + (y*y)) + fav
        numOnes = "{0:08b}".format(decNum).count('1')
        tile = ''
        if (numOnes % 2) == 0: tile = '.'
        else: tile = '#'
        mapo[y].append(tile)
        #mapo.append({ 'x': x, 'y': y, 'tile': tile })
        #print(tile, end='')
    #print('')

# Deep copy of List
def clone(arr):
    return [clone(item) if type(item) in (list, ) else item for item in arr]

def findEnd(curry, currx, mapo):
    global dim, dest, allMatches
    newMapo = clone(mapo)
    newMapo[curry][currx] = 'O'

    thisLen = 0
    for y in range (dim[1]):
        for x in range(dim[0]):
            if mapo[y][x] == 'O': thisLen += 1
    if thisLen <= 50:
        if str(currx)+","+str(curry) not in allMatches:
            allMatches.append(str(currx)+","+str(curry))

        # if currx == dest[0] and curry == dest[1]: theEnd(newMapo)
        if (curry + 1) < dim[1] and mapo[curry+1][currx] != '#' and mapo[curry+1][currx] != 'O': findEnd(curry+1, currx, newMapo)
        if (curry - 1) >= 0 and mapo[curry-1][currx] != '#' and mapo[curry-1][currx] != 'O': findEnd(curry-1, currx, newMapo)
        if (currx + 1) < dim[0] and mapo[curry][currx+1] != '#'and mapo[curry][currx+1] != 'O': findEnd(curry, currx+1, newMapo)
        if (currx - 1) >= 0 and mapo[curry][currx-1] != '#'and mapo[curry][currx-1] != 'O': findEnd(curry, currx-1, newMapo)

findEnd(start[1], start[0], mapo)

print ("TOTAL:", len(allMatches))
