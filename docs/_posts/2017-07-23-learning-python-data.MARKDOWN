---
layout: post
title:  "Learning Python: Basic Data"
date:   2017-07-23 14:30:00 -0800
author: "Samuel Foster"
categories: 2017 july python
tagList: {2017, Python}
slug: learning-python-data
chronological: TRUE
cardDescription: Theory On Learning Additional Computer Languages
cardImage: https://www.fostersamuel.com/blog/media/libbasic.png
---

Every six months I read my old code. I try to decipher what a variable's purpose was or what a particular loop did. After years of not writing in *Liberty BASIC*, I cannot answer these curiosities. The lack of answers in one of my largest projects, a text-based RPG, still gets to me.

<figure class="post-figure">
	<img class="post-figureImage" alt="Frustrating, poorly-written variables inside of the Liberty BASIC Editor" width="auto" height="200px" src="../media/libbasic.png">
	<figcaption class="post-figureCaption">Uh, Samuel...which bonus is tied to which stat?</figcaption>
</figure>

Pain to my nostalgic heart sharpens me for when the time is right to learn a new language. But it's never the right time. I should have learned Python a long time ago. I want to learn Python with respect to prior mistakes and experiences.

I believe all programming languages are composed of three linguistic parts: **data**, **action**, and **conventions**. Some would argue that "display" or "input" can be parts, but they are defined within the broad idea of action. Action also overlaps with the modification and removal of data, leaving a precise definition for data as only the storage of itself.

Every language, in my imagination, is a floating box that can hold *data*. If commands are written in line with *conventions*, the box performs *actions* that create, modify, or display data. In Python's case, this box is an interpreted box and not a compiled one. You do not need me to tell you <a href="https://www.youtube.com/watch?v=UPZvzlfsiaY" class="post-writtenLink" target="_blank">how to start this box.</a> I want to work with the box by first learning its specific way of data storage.

For extra accountability, I will study these parts by talking to myself. Well, no, not really -- you're here too. Hello! These posts are not tutorials, but they serve as my idea on how to approach a programming language if you have already learned more than one.

*Note: Python 3.x is the only release used in this post. Some bits do not work in Python 2.x.*

### Storing Basic Data

I need to store data. First, how do I store no data? Python requires a pound sign before a comment. I can also use the keyword `None` to represent null data.

```python
# I am storing  these words but only in the file itself. Welp.
emptyVariable = None
```

How do I store data that will not be ignored? Python splits basic data into five categories: Boolean, Numeric, Sequence, Sets, and Mappings. 

**Boolean** data is straightforward. The only quirk is that Python capitalizes `True` and `False` literals.

Python stores **Numeric** data as an `int`, `float`, or a `complex`.

```python
isTheEarthFlat = False
howManyRoadsToFollow = 44
estimatedPie = 3.1415
zigZag = 3+4j
```

**Sequence** data fits in a `list`, `tuple`, `bytes`, `byte array`, or a `str`. A `list` holds more than one type of data, and a `tuple` is an immutable list. Lists of integers between 0 and 255 can be stored in a `byte array` or an immutable `bytes`. Unicode characters, such as the letters on this page, belong in a `str`.

```python
favoriteFoods = ['Apples', 'Spaghetti', 'Bagels']

# A tuple needs a comma. Strict, right?
safeDrinks = ('Water',) 

# Without commands, they become lists
funNumbers = bytearray([0, 254, 255]) 
foreverFunNumbers = bytes([50, 25, 36])

strMessage = "Hello, reader!"
```

**Set** data, which is unordered, can be stored in a `set` or a `frozen set`. Each one behaves as a mathematical set.


```python
# Guess which set type is immutable.

placesToGo = {"Italy", "Greece", "Italy"} 
placesYouWillNeverGo = frozenset({"Venus"})

# Italy will be removed from the first set.
# The set has simple notation, 
# but the frozen set doesn't. Must've got the cold shoulder.
```
For **Mapping** data, Python uses a dictionary. A dictionary, or `dict`, maps one piece of data to another using a semicolon.

```python
value = {"mead" : 1400, "sword" : 5000}
places = {"toGo" : {"Italy"}, "toNeverGo" : frozenset({"Mars"})}
```

One more idea splits data types. Immutable data cannot change in place. For example, no new elements can be added to a `frozen set`. Mutable data, however, is not limited.

Immutable | . . . . . | Mutable
--- | --- | ---
`int` |    | `byte array`
`float` |    | `list`
`complex` |  | `set`
`str` |  | `dict`
`bytes` |  | 
`tuple` |  | 
`frozen set` |  | 


### Data Done

I feel comfortable creating basic data in Python now. Complicated data can be built on these basic data types, but that will be covered in <a class="post-writtenLink" href="https://www.fostersamuel.com/blog/learning-python-action">the next post.</a>