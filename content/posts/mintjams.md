---
title: "Mint Jams in 3D CSS"
date: 2021-03-21T13:17:18-07:00
draft: false
summary: Recreating Casiopea's 1982 album cover.
---

A friend showed me _Mint Jams_, the 1982 jazz album by Casiopea. The tracks are catchy, but I couldn't stop thinking about the cover art.

<figure>
	<img loading="lazy" width="248" alt="Cover art for Casiopea's 1982 album Minty jams: a spoon scooping some mint jam from a jar with the label Casiopea wrapped around the front of it" src="https://live.staticflickr.com/8501/29525290756_f7956d6ace_o.jpg">
	<figcaption>Photo by <a target="_blank" rel="noopener" title="vinylmeister, CC BY-NC 2.0 &lt;https://creativecommons.org/licenses/by-nc/2.0/&gt;, via Flickr" href="https://www.flickr.com/photos/digimeister/29525290756/">vinylmeister</a> via Flickr under <a href="https://creativecommons.org/licenses/by-nc/2.0/">CC BY-NC 2.0.</a></figcaption>
</figure>

I wanted to make the jam move.

First, I needed similar fonts to capture the title of the album and the group name. I dug through Google Fonts and FontSquirrel and DaFont. Seymour One, by the late <a href="https://www.youtube.com/watch?v=Ywj8b589zR8" target="_blank" rel="noopener">Vernon Adams</a>, felt right for representing _Mint Jams_. Matthew Welch's free <a href="https://squaregear.net/fonts/whitrabt.html" target="_blank" rel="noopener">White Rabbit</a> font looked good for the Casiopea jar label.

Using <a href="https://imagecolorpicker.com/en" target="_blank" rel="noopener">imagecolorpicker.com</a> I got RGBA values for the red, off-white, and yellow. The back of the album cover lists the songs, so I added those too.

<figure>
	<img loading="lazy" width="248" alt="The words 'Mint Jams' on a vertically split background with half off-white and half mustard yellow" src="../../images/mintjams3d/mintjams_early.PNG">
</figure>

Now for that jar. David DeSandro has the excellent <a href="https://3dtransforms.desandro.com/" target="_blank" rel="noopener">Intro to 3D CSS transforms</a>, which got me rolling enough to make a boxy jar. The same color picker from before helped me get the right shades of green and white to recreate the jar.

<figure>
	<img loading="lazy" width="248" alt="The previous image but with a 3D dark green jar floating in the middle. The jar has a label around it that says 'Casiopea'" src="../../images/mintjams3d/mintjams_jar.PNG">
</figure>

The `clip-path` property allowed me to droop the label.

<figure>
	<img loading="lazy" width="248" alt="The previous image but the label is curved downward on each side" src="../../images/mintjams3d/mintjams_label.PNG">
</figure>

To get the "jam" look at the top of the jar, I generated a few SVGs using <a href="https://getwaves.io/" target="_blank" rel="noopener">Get Waves.</a> I flipped a few upside down. I also used their other tool, <a href="https://www.blobmaker.app/" target="_blank" rel="noopener">Blobmaker</a>, to make jam fly out of the jar. Here's the final result:

<figure>
	<img loading="lazy" width="248" alt="The jar from previous images in motion. The jam is flying out!" src="../../images/mintjams3d/mintjams.gif">
</figure>

See it right in the page <a href="https://www.fostersamuel.com/mintjams">here.</a>
