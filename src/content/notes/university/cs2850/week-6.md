---
title: week 6 - scheduling and memory management
description:
    "In this week, we will conclude our survey of scheduling algorithms. We will then
    start a new topic: memory management, which is the functionality of an Operating
    System that handles memory allocation to programs."
date: 2023-11-11
author: chazzox
released: true
tags:
    - operating-systems
---

# scheduling algorithms

-   we have been focussing on ways to program applications so that the CPU can run
    multiple tasks at once in multiprogramming systems.
-   but how does the CPU decide when it is a good time to swap processes?
-   we have devised a number of options from across the years

### round robin

-   each process is given a "quantum", if the process blocks or finishes within this
    time interval, the next process is switched to. if it's still executing at the
    end of the quantum. it is blocked and the next process is loaded

-   the part that requires more attention is this "quantum". If it is too small, the
    time taken to switch tot the next process can mean that in order to execute a
    number of short tasks, with a very small quantum. the total execution time will
    far exceed if we were to run each of them after the other

```
[unsure about above wording, needs redoing]
```

### priority scheduling

round robin does not take into account that process A might not need to be completed
in a shorter amount of time automatic email checking, update checking and other
various tasks probably aren't as important as a video player application the user had
running. for this, we might want to set every programming running a priority.

-   to prevent high priority process from running forever, every N msecs we can
    decrease its priority, so that other process are given a chance to run.
    -   we can also set a max quantum for any process runnning
-   for I/O bound processes we can use `1/f` where f is the percentage of the last
    quantum used.
-   it's common for us to use a mix of both [round robin](#round-robin) and
    [priority scheduling](#priority-scheduling) this way time spent of similar
    priority tasks is shared fairly, but we are still handling the more important
    processes correctly

### shortest job first

-   sometimes in interactive systems it's nice to get a feeling of responsibility.
    executing the shortest job first will always give the shortest average response
    time. the main trouble with this is figuring out how long a process will take to
    run.

-   if we think of the time between waiting to be individual jobs we can take the
    general average (with some potential weighting on the more recent 'jobs') this
    way if a process changes in terms of its CPU utilization in recent iterations of
    the "jobs"

### lottery scheduling

-   a processes is given a number of tickets
-   each processes can give it's tickets to another
-   the CPU will hold lottery's and the winner will be given a quantum of execution
-   this actually leads to quite good process response time

### fair share scheduling

in multi user systems, if user 9 has a process and user 2 has 3. in a normal round
robin, this could result in user 1 having far more CPU time. `FSS` is when we take
this into account, ensuring that each user gets a "fair" share. if we say that user 2
should get 50% of CPU time, the scheduler will guarantee this, if it has processes to
run.

## scheduling in real time systems

0 for RTS we need to guarantee that things happen at a given time. e.g. medical
devices deliver medicine and correct times and correct rates/machines on factory
floors

-   we can formalize this requirement with the following

<div class='my-10 border-[1px] w-fit border-black dark:border-white py-3 px-6 mx-auto'>
    
```math
\sum_{c=1}^{M} \frac{C_i}{P_i} \le 1
```

</div>

where M is the number of periodic events and i is an event that occurs with period
$$P_i$$ and with $$C_i$$ seconds of CPU time

-   if this equation holds, a real time systems is said to be "schedulable"

## thread scheduling

-   scheduling when a system has threads running differs wildly depending on what
    type of threads the system has
-   if a system only supports user level threads, the kernel will have no knowledge
    of the reds running in a process and how much of a quantum it is using. this
    means that it becomes the responsibility of the process thread runtime to ensure
    a fair level of sharing in each process.
-   when system threads are available, the scheduler can decide which thread in which
    process gets the time.
-   if the CPU is currently in process A and there are 2 threads available to switch
    to: 1 in process A and 1 in process B, both with the same priority. the CPU may
    switch to the first, as it does not require the swapping out of all registers and
    CPU cache. the prioritization of the thread within the same process will lead to
    a higher average response time, as if it picks the process in B, 2 swaps are
    required, 1 to swap in data for process to B, and another to swap back in data
    for process A

# memory

-   high speed memory is in great demand from all programs running on computers.
    unfortunately it is a finite resource, so managing what is loaded into RAM at any
    given moment is something that requires great attention and care.

-   the part of the OS that manages this complex juggling act is known as the "memory
    manager"

-   originally there was no abstraction on top of memory. all programs had access to
    the systems entire physical memory. when trying to run multiple programs, this
    can very quickly lead to large issues. lets say that two programs running are
    trying to write/read to the same address, it's clear that this can lead to
    undefined behavior and unintended consequences.

-   one thought was to segment memory into physical "arenas", 1 for OS, 1 for device
    drivers and another for user programs.
    -   some basic devices (i.e credit cards/RFID systems) still use this basic
        technique
-   we could put all programs into one process with multiple threads. this way memory
    sharing is assured (obviously we probably don't want to do this, unrelated
    programs should not share memory as this is a clear security risk)

    -   additionally, a computer without any memory abstraction is highly unlikely to
        also support threads

-   it's possible to run multiple programs if when switching to another process, we
    swap entire contents of the user program memory arena to disk. funnily enough we
    call this "swapping"

-   with the addition of some special hardware we can start to devise ways of keeping
    multiple programs in memory at once.
-   divide all memory into chunks, assigning each chunk a unique key to protect it
    from being written to/read from other chunks.
-   the problem with the protection key is, programs may take up multiple chunks, so
    we can protect other chunks from jumping into other programs chunks. and since
    addresses are static, a program may not know where in memory it is loaded, making
    bugs like this a lot easier to occur.

-   we could program in such a way that each address can be added so some kind of
    base address number, so that no memory is never addressed absolutely at compile
    time. this is known as "static reallocation"

-   these days it's very rare for a system not to have memory abstraction, it's too
    large of an issue to not have a standard solution for. and from the different
    potential solutions discussed as of yet. 2 issues must be solved in the
    abstraction **re-allocation** and **protection**

## address spaces

-   each process has it's own addresses space, independent of another
-   the concept of address spaces is not unique to computer architecture, phone
    extensions such as "+44", top level domains like ".com" and even road names are
    all examples of address spaces.
-   address 28 in one space, has a completely different physical address then 28 in
    another
-   in order to arrange these memory spaces we can use "base and limit registers"

-   when a process is loaded it's "base" and "limit" registers are also loaded, these
    contain the processes start position in memory, and it's length respectively
-   this way, when address 28 is referenced, is added to the base, and checked to
    make sure that $$base + 28 \lt base + limit$$ to ensure protection of other
    spaces.
-   the disadvantage to this, is that whenever locations in memory are references an
    addition and a comparison must be completed

### handling the memory limit

-   realistically the number of running programs at any given moment will probably
    exceed the capacity of system RAM. dealing with memory overload is something all
    systems will have to handle. swapping out programs is one potential solution.

-   if a process is idle, it's written to disk, freeing it's section in memory.

-   this process can often leave holes in the memory stack, where it once was.

-   to deal with these holes, the OS can run a process known as "memory compaction"
    to remove the wholes, but this is a high CPU intensive operation and is not done
    often because of that.

-   we must also consider that each process can grow in it's memory image. for
    instance photoshop may start at 500mb, put during usage can easily grow to
    multiple gigabytes
-   another way to manage memory is [virtual memory]() where programs are still able
    to run when partially or fully written to disk. this will be covered in another
    week.

## managing free memory

-   when loading in new programs to RAM, careful consideration of where to place it
    in the stack must be done as it's not always to place something on the end.
-   to manage these constantly growing and shrinking holes in memory, bitmaps and
    linked lists are commonly used.

### bitmaps

-   with bitmaps, the system emory is divided into chunks/units. and for each unit
    it's assigned a bit in the bitmap. 0 if the unit is empty, 1 if not
-   the advantage to this is that the bitmap is always a fixed length as it is an
    exact representation of all system RAM.
-   but when searching for a place to put a new process, the system much search for
    the first N number of 0s where N is the length of the new program.
-   this is suboptimal as it requires a new search of the entire bitmap every time
    the process is loaded, which is a reason to not use the technique

### linked lists

-   another way to manage our memory is by maintaining a linked list of process and
    holes in memory.
-   this way we do not need to re-compute the size of the memory holes every time we
    load a new process

```mermaid
flowchart LR
    A[" P | 0 | 12"] --> B["H | 12 | 5"] --> C["P | 17 | 12"]
```

the first section of each node on the list marks if it is a hole (h) or a process
(p), then is the start position of the chunk, then the length of it

-   in this example that the list is sorted via start position in physical memory

-   it may be more convenient to use a double linked list so that figuring out if
    merges in holes are possible
-   we can use a number of different algorithms to decide where in the list to slot a
    new process: first fit, next fit, best fit, worst fit and quick fit.

#### first fit

-   this will search the list and use the first hole big enough for the program, it's
    also the simplest algorithm

#### next fit

-   this works the same way as first fit, except that it will begin each new search
    from where the last hole was found. this has shown to be slightly slower then
    first fit in simulations

#### best fit

-   in best fit we first search the whole list and use the hole that is closest to
    the length of the program
-   this algorithm ends up by creating a bunch of tiny holes throughout the stack
-   it is slower then the other 2 as it will search the entire list first
-   research has shown the first fit will generate larger holes in memory over time

#### worst fit

-   works the same way as best fit, but instead of selecting the hole closest in
    size, will instead select the largest hole. this is also not a good algorithm to
    choose

-   we can also seperate the linked lists, one for holes and another for programs,
    this makes us able to sort the holes in size instead of position, and also makes
    it so that first fit and best fit are equal in terms of performance, it will also
    render next fit pointless. when we organise the lists in this way, memory
    allocation gets a bump in performance.

#### quick fit

-   we can further group the hole lists by size into their own lists and then search
    across those on allocation, it works very quick for allocation. but makes process
    termination very finicky as computing if a merge is possible becomes quite
    painful
