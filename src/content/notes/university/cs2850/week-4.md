---
title: week 4 - inter-process communication (no busy waiting)
description:
    This week covers IPC without busy waiting, including semaphores, monitors
date: 2023-11-11
author: chazzox
released: true
tags:
    - operating-systems
---

-   one of the simplest alternative solutions to busy waiting is centered around
    `sleep` and `wakeup`
-   `sleep` will suspend the process it is called from
-   `wakeup` takes a `pid` (process id) as an argument and will wake it up.
-   `sleep()` call is not waste cpu time

#### producer consumer problem

-   two processes over a fixed length buffer
    -   1 of the processes supplies data to it
    -   the other is consuming it
-   what happens if a producer is trying to add to the buffer but it is full?
    -   sleep the producer until there is space, the consumer will re-awaken the
        process
-   these calls by themselves to not eradicate race conditions.
-   dijkstra come up with a new type of variable, known as "semaphores"
-   it keeps track of the number of waking calls

-   a semaphore has 2 **atomic** operations you can perform

    -   **down:** if a wakeup counter is 0, it will sleep/otherwise it will decrement
        and continue
    -   **up:** increment the wakeup counter, if a process is sleeping due to down
        operation, it will be woken and allowed to complete down.

-   these instructions are made atomic in two ways. on single core processors,
    interupts are disabled and on multi cpu systems, the
    [TSL instruction](./week-3#hardware-solution) is used
-   semaphores can be used for mutual exclusion and also to force a sequence of
    events

-   a binary semaphore is a semaphore with only 0 and 1 as possible values. it's used
    for mutual exclusion.

#### mutexes

-   simplified version of a semaphore.
    -   lock and unlocked are the only two states
    -   results in improved efficiency and the ability to implement in user space
-   has to methods somewhat androgynous to semaphores
    -   `mutex_down` - works the same as down in semaphores
    -   `muted_up` - will release the blocked thread, but no count is kept

#### message passing

-   all of the previous UPC methods are only applicable for single machine systems
-   message passing has 2 calls
    -   `send(dest, &message)`
    -   `receive(source, &message)`
-   receive will block if no message is available, it can also return immediately
    with an error code.
-   if the machines are communicating via a network, information can be lost
-   hense communication over a protocol must be defined, sequence numbers can prevent
    duplication.
-   acknowledgement messages can also be enforced, if no acknowledgement is received
    within a period, the same chunk of information can be sent again
