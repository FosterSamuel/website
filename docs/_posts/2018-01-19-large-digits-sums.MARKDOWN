---
layout: post
title:  "Digits of Large Sums"
date:   2018-01-19 08:00:00 -0800
author: "Samuel Foster"
categories: 2018 january projectEuler
tagList: {2018}
slug: digits-of-large-sums
chronological: TRUE
cardDescription: Can you digit?
cardImage: https://www.fostersamuel.com/blog/media/digits.jpeg
--- 

<a class="post-writtenLink" href="https://projecteuler.net" rel="noopener" target="_blank">Project Euler</a> hosts over 600 interesting math programming problems. <a class="post-writtenLink" href="https://projecteuler.net/problem=13" rel="noopener" target="_blank">Problem thirteen</a>  asks for the first ten digits of the sum of  equally-sized large numbers. The page offers these massive numbers:

```js
37107287533902102798797998220837590246510135740250
46376937677490009712648124896970078050417018260538
74324986199524741059474233309513058123726617309629
91942213363574161572522430563301811072406154908250
...
...
...
77158542502016545090413245809786882778948721859617
72107838435069186155435662884062257473692284509516
20849603980134001723930671666823555245252804609722
53503534226472524250874054075591789781264330331690
```

# Smaller Problem

A smaller problem should be helpful. How about finding the first digit of the sum of three smaller numbers?

```js
395
593
296
```

Each column of digits can be separated and added.  If the sum of a column is longer than one digit, I'll strip the leftmost digit(s) and add to the next column.

```js
5 + 3 + 6 = 14 // (4)

// + 1 from previous column
9 + 9 + 9 + 1 = 28 // (8)

// + 2 from previous column
3 + 5 + 2 + 2 = 12 // (don't have to strip the last column)
```

Placing all column sums beside each other, the first digit of the final sum is easy to grab.
```js
12..8..4
1284 // Grab the first digit: 1
```

# Translating to Python

I placed the original 50-digit numbers into the file ```nums.txt```. 

```python
lines = []
with open('nums.txt') as f:
    lines = f.read().splitlines()

importedNumbers = map(int, lines)
```

To get their sums, digit columns must be created. I added an additional spot in ```sums``` for overflow.


```python
columns = []
sums = [0]
MAX_COLUMNS = len(str(importedNumbers[0])) # how many digits are each number?

for dummy in range(0, MAX_COLUMNS):
    columns.append([])
    sums.append(0)
```

Each number must be converted to a string, ```letters```, to grab the digits. The plucked digits are placed in their column by counting up ```index```. I want the rightmost digits first. ```Columns``` gets reversed.

```python
# Convert numbers loaded in
# to lists of digit columns     
for num in importedNumbers:
    letters = str(num)

    for index in range(0, MAX_COLUMNS):
        digit = int(letters[index])
        columns[index].append(digit)

columns = list(reversed(columns))
```

I added each column, spilling the overflow digits to the next column.

```python
for columnIndex in range(0, len(columns)):
    currentColumn = columns[columnIndex]

    # Retain overflow from previous columns
    newColumnSum = sums[columnIndex]

    # Add sum of current column
    newColumnSum += sum(currentColumn)

    letters = str(newColumnSum)
    lastPosition = len(letters) - 1

    # Save single digit for column
    sums[columnIndex] = int(letters[lastPosition])

    # Move overflow if necessary
    if newColumnSum > 9:
        otherDigits = int(letters[0:lastPosition]) 
        sums[columnIndex+1] += otherDigits
```

Lastly, I pieced together the sums to build the large sum.

```python
finalSum = ""
sums = sums[0:len(sums)] # Cut off the original extra spot used to avoid errors
sums = list(reversed(sums)) # Get back in order

# Build final sum
for num in sums:
    finalSum += str(num)
finalSumDigits = int(finalSum[:10])
print(finalSumDigits) # 5537376230
```

# Major Mistake

I did not consider trying the bruteforce method. The results are painfully faster than my wasteful code. Ouch. 

Timing in seconds:

| Iterations |   |   | columns |   |   | sum()  |
|-----------:|---|---|:-------:|---|---|--------|
| 10         |   |   |  0.03   |   |   | 0.0002 |
| 10,000     |   |   |  31.54  |   |   | 0.12   |
|            |   |   |         |   |   |        |

According to this <a class="post-writtenLink" href="https://stackoverflow.com/a/24578976" rel="noopener" target="_blank">helpful StackOverflow comment</a>, Python does not interpret to compute ```sum()```. There is, however, an even faster solution. Check out <a class="post-writtenLink" href="https://stackoverflow.com/a/24579773" target="_blank" rel="noopener">this answer</a> covering the use of Numpy to beat ```sum()```'s timing.

# What I Learned

Don't immediately doubt bruteforcing. Keep it simple.

The answer to the problem is 5537376230.


<a class="post-writtenLink" href="https://projecteuler.net/archives" rel="noopener" target="_blank">See all Project Euler problems.</a>