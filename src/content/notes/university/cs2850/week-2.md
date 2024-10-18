---
title: week 2 of teaching - process and threads
description:
    This week is all about two important concept&#58;  processes and threads. You
    will see how these are used in the OS to realize the illusion that many programs
    run on your computer simultaneously. In the lab, we will discuss C data types,
    variables, and functions. You will learn how to write simple programs that read
    and write on the terminal.
date: 2024-10-14
author: chazzox
released: true
tags:
    - operating-systems
---

### processes

-   OSes support running multiple programs
    -   we need to make sure to store all the metadata about them in order to
        correctly manage them
    -   to do this, we use processes

`PID`, name, user running it, files related, parts of CPU program counters that are
related to the execution (e.g. PSW and program counter) are examples of metadata
stored for processes execution

-   In multi-programming systems, CPUs are able to switch so quickly between
    processes that they give an illusion of concurrency "pseudo-parallelism"

reasons for process creation:

1. System initialisation
2. a running process wants to start a new process,this is done via a system call
3. user request to create a new system ll
4. a new batch job

In POSIX systems `fork()` is the sys-call, in windows it's done with `CreateProcess`

processes are hierarchical so a process created by another one is then it's "child"
processes. It is an exact clone in terms if memory image, program counter, open
resources and environment variables. **However the address space is different, the do
not share the space that these objects are stored in**. memory address operator calls
to the objects may be the same, but these virtual memory address map to different
physical addresses.

processes can be terminated for a couple of reasons

| Reason      | Description                                                                       | Voluntary/Involuntary |
| ----------- | --------------------------------------------------------------------------------- | --------------------- |
| normal exit | the process reaches the end of instructions                                       | Voluntary             |
| error exit  | the process experience's an error, that is handled in code and leaves             | Voluntary             |
| fatal error | I/O operation may fail, a resource might be busy or a page erorr could occur      | Involuntary           |
| killed      | another process can kill another example: a user uses the "kill" command in shell | Involuntary           |

-   process can interact with users such as something running the file explorer and
    they can also run in the background
    -   we call these background processes "daemons"
        -   a process that checks battery percentage, something that checks for
            updates on a timer

<a name="processes-running-states" class='no-underline font-normal text-pr text-[--tw-prose-body]'>There
are three process states</a>

| State   | Description                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| Running | Current process running                                                                                               |
| Ready   | runnable, but not currently scheduled                                                                                 |
| Blocked | unable to run, it might be waiting for another process to finish, or it could be waiting for some resource to be free |

In process based operating systems there is a hierarchy of threads, at the top is the
process that deals with scheduling an interrupts.

for every new processes, a new entry in the process table is created

### threads

while processes are able to give us multiprogramming, sometimes parallelism while
sharing address space can be beneficial. threads provide us this ability.

creating a user thread is faster as we need not rely on system calls to do it.
switching is also faster (as long as its within the same process) since the entire
memory image does not need to be reloaded.

-   each thread has it's own stack
-   it also follows the same running states as [processes](#processes-running-states)
-   when a process is started in a threaded environment, a single thread is also
    present
-   you can then create a new thread via a library call, it will return the new
    threads identifier
-   in POSIX environments there is a standard library for managing threads, it is
    called `Pthreads` (aptly named)

ways of implementing threads

| User level                                                                                                          | kernel level                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The OS has no knowledge of the threads                                                                              | thread table is in the OS layer                                                                                    |
| no need for low level thread support                                                                                | no need for runtime system                                                                                         |
| needs a run time system                                                                                             | managed by and implemented at the OS layer                                                                         |
| each process requires it's own thread table (lighter weight)                                                        | can use blocking system calls easily within threads                                                                |
| thread table is managed by the runtime system                                                                       | page faults to not effect other threads                                                                            |
| switching is fast as it's done with local calls                                                                     | creation via system calls is slower                                                                                |
| better control over thread scheduling                                                                               | you do need to deal with `fork()` semantics                                                                        |
| a system call will block all other threads in process, this is a large disadvantage as this is very common behavior | signal handling is a larger concern as each processes will have to handle which threads the interrupt is passed to |

however, there is a third option avaible: "Hybrid threads" this way, a single kernel
level thread can have multiple software threads contained within it

popover threads also are a thing, these are threads that are created to handle new
messages within a process

issues with threads when transitioning single threaded code into multithreaded:

-   overwriting global memory
-   library calls are often not re-entrant
    -   starting a new call in one thread while in another thread the same call has
        not completed
-   what happens if thread switching happens during memory allocation
-   signal handling for user level threads
