---
title: How to make a game
description: I do not know what I am doing
date: 2023-01-26
author: chazzox
released: true
---

# I do not know what I am doing

I have no idea what I am doing. I have no idea how to make a game let alone a game
engine. This is both my first attempt at writing as well as my first stab at making
any form of game development. And by game I don't just mean some small little scratch
game you make with your mates in the middle of a school day. Im talking about a fully
fudged, thought out, serious, big boy game. The typa game that you actually want to
keep playing.

The plan is to keep these things short, not too much of me rambling on about the
'technical' aspect of the game. More of a progress report. Think of it like a
[scrum meeting](https://www.productplan.com/glossary/scrum-meeting/), except I'm the
only one here.

## What I've done so far

First step was to figure out how. Because I enjoy pain and suffering. The obvious
choice was to write the whole thing in
[ANSI C](https://en.wikipedia.org/wiki/ANSI_C), along with the help of
[SDL2](https://wiki.libsdl.org/SDL2/FrontPage). A library that allows you to create
windows, render graphics, and play sounds without the annoyance of dealing with
platform specific APIs.

{/_ maybe a sdl2 explanation diagram _/}

After this I started to play around with SDL2, creating a window my first
breakthrough.

```c
SDL_Window *window = NULL;

// //The surface contained by the window
SDL_Surface *screenSurface = NULL;

// Initialize SDL
if (SDL_Init(SDL_INIT_VIDEO) < 0)
{
    printf("SDL could not initialize! SDL_Error: %s\n",
        SDL_GetError());
    return 0;
}
window = SDL_CreateWindow("project-omikron",
    SDL_WINDOWPOS_UNDEFINED,
    SDL_WINDOWPOS_UNDEFINED,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    SDL_WINDOW_RESIZABLE);
screenSurface = SDL_GetWindowSurface(window);
```

This, however would not actually keep the game window open. For that the first 'Game
loop' was created. In trying to learn how to get the square to move I found that in
order to rerender the square, you must first wipe the screen, then draw the new
square with its fancy new coordinates

```c
void draw(SDL_Surface *s, SDL_Rect *r)
{
    SDL_FillRect(s, NULL, 0x000000);
    SDL_FillRect(s, r, SDL_MapRGB(s->format, 0xFF, 0x00, 0xFF));
}
```

Success! A window!

![window](/blog-assets/window.png)

I thought the best next step would be to create a rectangle and draw it, behold the
purple square

![purple-square](/blog-assets/square.png)

After 4 hours of staring at the screen I realized a static square doesn't make for a
very captivating game. Not [stimulating](https://www.youtube.com/watch?v=d53KEMoH90o)
enough. My first thought for how to change the position of the square was to simply
change the value of the `SDL_Rect` pointers. Funnily enough this didn't work. It
turns out in order to redraw something in sdl you need to wipe the screen and draw a
large square spanning the entire window in a single color to complete a repaint.
Obviously in a fully fledged game there would be optimizations for this. But for now
it'll do. Oh, I also hooked up the SDL keyboard events to move the square as well.

With all that considered this is what we get

![purple-square](/blog-assets/output.gif)

### Issues

-   [x] How to keep the window open for more then 1ms
-   [x] How do sdl events work?
-   [ ] Resizing the window causes the game to do weird things (not update rectangle
        yet still run the code)

### Whats next?

-   make pong :)

I hope this was interesting and not entirely shit. These things will only come out
once I have something new and novel to report. This project is something that will
likely take years of learning and tinkering, so who knows how many blogs ill end up
writing. Here's to hoping that my author skills improve and these things don't read
like total ass.
