---
title: General lecture notes
description:
    These are notes taken in the middle of theory lectures, which go over previously
    covered content in the form of quizzes
date: 2023-01-26
author: chazzox
released: true
tags:
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

### general experiment implementing the peterson's algorithm on processes

followed most of the code from the textbook, this does not work as it requires shared
memory.

after the `fork()` call the new process may have the same virtual memory addresses
and identical memory image, but its physical location has changed so when we are
calling and mutating the variable states from either processes, we are only changing
the variable state for that process's memory image

```c
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

#define FALSE 0
#define TRUE 1

#define N 2

int turn;
int interested[N];
int finished = 0;

void enter_region(int process)
{
    int other;

    other = 1 - process;
    interested[process] = TRUE;
    turn = process;

    while (turn == process && interested[other] == TRUE)
        ;
}

void leave_region(int process)
{
    interested[process] = FALSE;
}

void process_a()
{
    enter_region(0);

    for (int i = 0; i < 10; i++)
    {
        if (i == 2)
        {
            printf("sleeping in crit loop a at %d\n", i);
            sleep(1);
        }
        printf("crit loop a is at: %d\n", i);
    }
    leave_region(0);

    for (int i = 0; i < 10; i++)
    {
        if (i == 5)
        {
            printf("sleeping from parent process in non crit at %d\n", i);
            sleep(2);
        }
        printf("non crit loop a is at: %d\n", i);
    }
}

void process_b()
{
    enter_region(1);

    for (int i = 0; i < 10; i++)
    {
        if (i == 4)
        {
            printf("sleeping in crit loop b at %d\n", i);
            sleep(1);
        }
        printf("crit loop b is at: %d\n", i);
    }
    leave_region(1);

    for (int i = 0; i < 10; i++)
    {
        if (i == 2)
        {
            printf("non crit sleeping from child process at %d\n", i);
            sleep(4);
        }
        printf("non crit loop b is at: %d\n", i);
    }
}

int main()
{
    if (fork() == 0)
    {
        process_b();
        finished++;
    }
    else
    {
        process_a();
        finished++;
    }

    printf("process finished\n\n");
    while (finished < 2)
    {
        printf("finished: %i\n", finished);
        sleep(5);
    }
    printf("program exit\n\n");
    return 0;
}
```
