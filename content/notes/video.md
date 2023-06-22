---
title: "Video"
date: 2023-06-22T12:20:40-08:00
draft: false
---

Video is images in motion.

### Images

An image is a 3D matrix where one dimension is for color and the other two are for position. 

For example, in the Red dimension, I have a rectangualar plane of points. At each point, or pixel, I store a number for how intensely Red the point should be drawn. The same concept extends to the Green and Blue dimensions.

The pixels must be stored. <dfn id='def-bit-depth'>Bit depth</dfn> is the number of bits required to store one pixel of an image. If we have 3 planes of color, and 8 bits to represent an intensity, it takes 3 * 8 or 24 bits to store one pixel. Bit depth is also referred to as color depth, because it hints at how many colors we can create. A bit depth of 24 implies 2^24 or ~16.7 million color possibilities at each pixel.

The <dfn id='def-resolution'>resolution</dfn> of an image is how many pixels fit in the position dimensions, usually stated as Width times Height. For example, 1280x720 implies 1280 pixels in the horizontal dimension and 720 pixels in the vertical dimension.

Following from resolution, we have the <dfn id='def-aspect-ratio'>aspect ratio</dfn>, which is the ratio of width to height in an image or video. The 1280x720 resolution has an aspect ratio of 16:9.

### Video

Video is images, or frames, over time. We extend the matrix concept to 4D to store video.

<dfn id='def-frame-rate'>Frame rate</dfn> is the number of frames per second (FPS) shown in a video. For example, 24 FPS, 30 FPS, and 60 FPS.

Because each frame is an image we can use bit depth to understand storing videos. The <dfn id='def-bit-rate'>bit rate</dfn> is how many bits per second are needed to represent a video. For example, a video with 60 frames per second, 24 bit depth, and 1280x720 resolution will need 60 * 24 * 1280 * 720 = 1,327,104,000 bits per second or 1327.104 Mbps to be stored without compression. This example assumes a constant bit rate or CBR. Some videos are stored with variable bit rate or VBR, which can save space.

### Compression

Video takes up a lot of space. If we had a 15 minute long video with a constant bit rate of 1327.104 Mbps, it would take up 1327.104 * 15 * 60 = 1194393.6 Megabits or 149.2992 GB.

Space can be saved in a few ways:
- Chrome subsampling
- Luma compression
- I frames, P frames, and B frames
- Motion block compensation
- Intra prediction


#### Chroma subsampling

Counterintuitively, between color and brightness, the human eye is [better at perceiving changes in brightness.](http://vanseodesign.com/web-design/color-luminance/) Rod cells in the eye, responsible for brightness, outnumber cone cells 20 to 1. Read more about [Photoreceptor cells on Wikipedia](https://en.wikipedia.org/wiki/Photoreceptor_cell).

Brightness and color are also called luma and chroma, respectively. 

To model luma and chroma we try a different approach than RGB. One of the most popular is <dfn id='def-YCbCr'>YCbCr</dfn>, which is a luma of Y, a chroma blue of Cb, and a chrome red of Cr. Converting from RGB has a formula:

```
Y = 0.299R + 0.587G + 0.114B

Cb = 0.564(B - Y)

Cr = 0.713(R - Y)
```

Converting back:

```
R = Y + 1.402Cr

G = Y - 0.344Cb - 0.714Cr

B = Y + 1.772Cb
```

Because we are more sensitive to light, we can store maximum luma and minimum chroma data, which is known as <dfn id='def-chroma-subsampling'>chroma subsampling</dfn>.

Ratios for subsampling are often expressed in 3 parts `J:a:b` where `J` is the horizontal luma sampling, `a` is the count of chroma samples in first row of `J` pixels, and `b` is the count of changes of chroma samples between first and second row of `J` pixels. Common ratios include:

- 4:4:4 (no subsampling)
- 4:2:2
- 4:1:1
- 4:2:0
- 4:1:0
- 3:1:1

Another way to read the ratio is for every `J` pixels of luma, take `a` pixels of chroma, and on the next row take `b` more pixels of chroma.

### Codecs & Containers

A <dfn id='def-video-codec'>video codec</dfn> is software to compress and decompress a video using a bundle of strategies. Common codecs like H.264/AVC and AV1 are different ways to reduce the size of videos.

A video codec is different from a <dfn id='def-video-container'>video container</dfn>, which is a wrapper format with metadata, audio, and the compressed video as its payload. This is usually seen in the file format, e.g `.mp4` for [MPEG-4 Part 14](https://en.wikipedia.org/wiki/MP4_file_format) and `.mkv` for [matroska](https://en.wikipedia.org/wiki/Matroska). Containers tell how to playback the contained video and audio.

### Definitions
- [Bit depth or color depth](#def-bit-depth)
- [Resolution](#def-resolution)
- [Aspect ratio](#def-aspect-ratio)
- [Frame rate](#def-frame-rate)
- [Bit rate](#def-bit-rate)
- [YCbCr](#def-YCbCr)
- [Chroma subsampling](#def-chroma-subsampling)
- [Video codec](#def-video-codec)
- [Video container](#def-video-container)


### Reading
- [Digital Video Introduction](https://github.com/leandromoreira/digital_video_introduction)
- [ffmpeg-libav-tutorial](https://github.com/leandromoreira/ffmpeg-libav-tutorial)
- [mkvinfo to print elements in Matroska files](https://mkvtoolnix.download/doc/mkvinfo.html)
- [Understanding mkvinfo's output](https://gitlab.com/mbunkus/mkvtoolnix/-/wikis/Understanding-mkvinfo's-output)
