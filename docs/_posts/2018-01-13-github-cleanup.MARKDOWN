---
layout: post
title:  "GitHub Cleanup"
date:   2018-01-13 17:00:00 -0800
author: "Samuel Foster"
categories: 2018 january github
tagList: {2018}
slug: github-cleanup
chronological: TRUE
cardDescription: Every little commit hurts
cardImage: https://www.fostersamuel.com/blog/media/clean.jpeg
--- 
My GitHub is an inconsistent mess. My profile has no bio. Commits are randomly described. Projects are missing descriptions and READMEs. Time to clean.

<figure class="post-figure">
  <img class="post-figureImage" alt="A selection of commits to project 'website' on FosterSamuel Github account" width="auto" height="200px" src="../media/github_commits.jpg">
  <figcaption class="post-figureCaption">Even further.</figcaption>
</figure>

### Profile 

I'm tempted to fit all of my interests into it. With only 160 characters, however, the profile bio should be short and direct. 

```
I build on the web. CS at Cal Poly Pomona.
```

### Descriptions

```Website``` has no description. Let's write it:

```
Website:
  - Personal website and Jekyll-based blog
```

My first repository, ```linkello```, is described as "a link-organization service inspired by Trello." We can shorten and update the description to:

```
linkello
  - Link-organization in vanilla JavaScript
```

The next repository is ```what-to-do```:

```
Not sure what to do? WhatToDo will decide 
what tasks are relevant to the amount 
of time you have available.
```

Too long. Let's shorten that:

```
what-to-do:
  - Picks task based on available time and priority
```

The only one left is ```vuefun```. The current description calls it a "playground", but it's more of a sandbox. New description:

```
vuefun
  - Sandbox for varied VueJS experiments
```

### Licenses

So far, I've used GitHub as a public history of written code. I did not consider licenses. If someone is interested in tangled vanilla JS code, they should be able to use it as they wish. <a target="_blank" class="post-writtenLink" href="https://choosealicense.com/licenses/unlicense/">The Unlicense</a> is now in every repository.

### READMEs

I disregarded READMEs because I didn't believe anyone *needed* any of my repositories. That's still true. But I want to get in the habit of writing them.

<figure class="post-figure">
	<img class="post-figureImage" alt="READ-ME file of repository 'Linkello' in Samuel Foster's GitHub" width="auto" height="200px" src="../media/linkellos_readme.jpg">
	<figcaption class="post-figureCaption">All cleaned up!</figcaption>
</figure>


The new READMEs can be seen in <a target="_blank" class="post-writtenLink" href="https://www.github.com/fostersamuel">each project here.</a>