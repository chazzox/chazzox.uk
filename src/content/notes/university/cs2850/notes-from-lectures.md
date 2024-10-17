---
title: General lecture notes
description:
    These are notes taken in the middle of theory lectures, which go over previously
    covered content in the form of quizzes
date: 2023-01-26
author: chazzox
released: true
tags:
    - university
    - operating-systems
    - lecture-notes
---

> Its worth noting that these are notes taken in the middle of theory lectures, which
> go over previously covered content in the form of quizzes

> in cs2850, the first lecture covers the theory content and the second goes over C
> programming

### Lecture 1 - Teaching week 3 (oct 14th)

-   `fork()` will return in both processes. In the parent process it will return the
    process ID of the child process just created. and in the child process it will
    return 0.

-   `fork()` will create a new instance of the current program running with identical
    copies of all parts of the cpu (i.e. program counter, program status word e.t.c).

process switching 0 if no clock interrupt is received, no process will ever give up
control.

-   **watch all videos and notes, BEFORE the lectures on thursday**

-   race condition solution requirements:

    1. no no two process must be inside their critical region at the same time
    2. must make no assumptions about clock speed or core count
    3. no process outside of critical region can block other processes from doing so
    4. <a name="rule-4-race-condition" class='no-underline font-normal text-pr text-[--tw-prose-body]'>no
       process should have to wait forever to access it's critical region</a>

-   All process can crash this does not violate [rule 4](#rule-4-race-condition)

### Lecture 2 - Teaching week 3 (oct 14th)

-   memory is a large array of memory cells
-   it contains entire state of a programs, variables and constants
-   data stored has it's own location/address

-   when writing `c` programs seperate the location and value of variables
    conceptually.

-   pointers: a reference to the start location in memory the value is contained in

    -   only limit to the amount of pointers your trying to dereference is the memory
        on the machine. in other words there is no theoretical limit
    -   [three star programming](https://wiki.c2.com/?ThreeStarProgrammer)

-   `C` is a pass by value language
-   `&` prefixed to a variable will return a typed pointer to the start address of
    the variable

    -   it is called `the address operator`

-   `*` before a pointer will "dereference" it, and evaluate to the contents of the
    memory address is referring to

-   what happens if we use the address operator on an array without specifying an
    index?

```c
char *str = "hello world"
```

all strings are terminated with `\0` this is known as the null terminator char
