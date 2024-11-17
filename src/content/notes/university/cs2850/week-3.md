---
title: week 3 of teaching - inter-process communication (busy waiting)
description: This week covers Inter-Process Communication (IPC) with busy waiting.
date: 2024-10-17
author: chazzox
released: true
tags:
    - operating-systems
---

## IPC (Inter process communication)

-   we may want processes to be able to peak to each other
    -   one process may need information from another for correct execution
    -   simultaneous resource usage
    -   process scheduling sequencing: A is dependant on B finishing
-   threads share memory so they can use shared memory to talk to each other, they
    still face the exclusivity problem as well as sequencing issues

race conditions

-   when a processes are reading/writing to shared data and the code path can change
    depending on scheduling order
-   parallelism, while overall beneficial, increases changes of race conditions
-   debugging these programs can be painful as execution order is non-deterministic

over the years we have developed a few techniques to avoid race conditions

### mutual exclusion

-   we can divide programs into "critical" and "non-critical" regions
-   in critical regions, a process use some shared memory or resources. blocking
    other processes from doing so

race condition solution requirements:

1. no no two process must be inside their critical region at the same time
2. must make no assumptions about clock speed or core count
3. <a name='rule-3' class='no-underline font-normal text-pr text-[--tw-prose-body] target:underline'>no
   process outside of critical region can block other processes from doing so</a>
4. no process should have to wait forever to access it's critical region

potential known solutions

-   busy waiting - this has both hardware and software implementations
-   semaphores
-   monitors
-   and a few others

#### busy waiting

-   while one process is in it's critical region, the other will repeatedly check a
    condition to see if they can enter theres

##### lock variables

-   create a new variable "lock" and set to 0
-   before process enters critical region it inspects the locl:
    -   if it's 0 set to 1 and enter critical region
    -   if it's 1 loop until it has value 0

this has a critical issue as if the scheduler switches, just after one process has
read the lock state, to the other process. both processes will have read lock as 0
and will be free to both entire their critical regions at the same time.

##### strict alternation

assuming alternation of processes

<table>

<tr>
<th>process 0</th>
<th>process 1</th>
</tr>
<tr>
<td>

```c
while (true){
    while(turn != 0) /* loop */;
    critical_region();
    turn = 1;
    non_critical_region();
}
```

</td>

<td>

```c
while (true){
    while(turn != 1) /* loop */;
    critical_region();
    turn = 0;
    non_critical_region();
}
```

</td>

</table>

-   using a turn variable does mean that no process can be in it's critical at the
    time as as another. however, if a process enters it's non-critical region before
    the other gets to check, if it's non-critical region has a long execution time it
    will violate [rule 3](#rule-3)

#### peterson's algorithm

this example does not assume alternation and although is implemented here for two
processes, a solution for N processes does exist

```c
#define FALSE 0;
#define TRUE 1;

#define N 2;

int turn;
int interested[N];

void enter_region(int process){
    int other;

    other = 1 - process;
    interested[process] = TRUE;
    turn = process;
    while(turn == process && interested[other] == TRUE);
}

void leave_region(int process){
    interested[process] = FALSE
}
```

#### hardware solution

```asm
enter_region:
    TSL REGISTER,LOCK
    CPM REGISTER, #0
    JNE enter_region
    RET

leave_region:
    MOVE LOCK, #0
    RET
```

-   tsl copies value of lock to register and sets to 1
-   as assembly language is atomic, no interrupt can stop it's execution. this gets
    around the interested variable in [peterson's algorithm](#petersons-algorithm)
-   this is far simpler then petersons, but still involved busy waiting
-   CPU time is still waisted on tsl checks
-   can lead to priority inversion
    -   If process L is low priority and it's entered it's critical region
    -   H is high priority and is waiting to enter it's critical region
    -   H will always have CPU time, which means L never get's to remove the lock
-   creates a deadlock where H can never enter and L can never leave
