---
title: week 7 - scheduling and memory management
description:
    "This week covers memory management, including virtual memory, page replacement
    algorithms, and segmentation as an alternative to paging."
date: 2023-12-09
author: chazzox
released: true
tags:
    - operating-systems
---

-   we have discussed how an OS might go about managing it's free memory, but what
    about when the size of all programs exceeds RAM?
-   the concept of "virtual memory" was mentioned briefly earlier, and thats what we
    shall delve into now.

-   we need to find a way to run multiple programs, without the need to swap the
    programs entire memory image. swapping out and in a 1GB app can take a around a
    second and this can quickly build up

-   initially "overlays" were used, whereby the program would spend their time
    splitting up the application into chunks that could be independently swapped in
    and out by the OS. (this was done either in place of our above the other chunks)
-   programmers were very rarely good at creating good "overlays" and the good not be
    bothered either, meaning this practice fell out of use rather quickly

-   in virtual memory, each address space is further split up into "pages"
-   not all pages must be in RAM for a program to execute.
-   mapping from address space -> physical address must be done when it is required
-   if a piece of memory referenced is not in RAM, the OS will fetch it from disk and
    re-run the instructions
-   the implementation of virtual memory that we are gonna be learning is known as
    "paging"

# paging

-   when addresses are mentioned, instead of going straight to memory, they first go
    to the MMU. this is a small piece of hardware inside of the CPU that deals with
    managing. it's here the virtual addresses are mapped.
-   the chunks that virtual memory is divided into are known as "page frames"
-   they range in size from `512kb` to multiple GBs
-   transfers of disk <-> RAM are always done in whole pages.
-   if the MMU tries to access data not in RAM it generates a "page fault"
-   the OS will then write a relatively un-used page in RAM to DISK, (if it has been
    modified). then writes the page required to RAM. the CPU then changes its
    internal map and restarts the failed instruction
-   the map must reflect that the page "evicted" is no longer present by changing
    it's present/absent bit

-   virtual addresses are split into a couple of parts
    -   initial page number (high order bits)
    -   offset (low-order bits)
-   the number of bits allocated to the page number implies the page size (it can
    imply the division of memory)
-   page number is an index to the page table, if an entry is present then the higher
    order bits are replaced the the page **frame** number, this forms its physical
    address.
-   as you can probably tell the purpose of the page table is to map the virtual, to
    the physical.

## page table entries

-   page table structure differs between operating systems, but you can generally
    expect to find the following components in some order or another.

<table class='prose-td:border-white prose-td:border-2 prose-td:text-center'>
    <tr>
        <td>caching</td><td>referenced</td><td>modified</td><td>protection</td><td>modified/absent</td><td>page frame number</td>
    </tr>
</table>

-   32 bits are commonly used
-   present/absent bit tells us if the frame is currently in memory, 0 will trigger a
    page fault if access is attempted
-   protection bits will describe the access permissions (r, x, w are the common
    ones)
-   referenced and modified bits track the the usage of the frame for when page
    faults occur
    -   "dirty" describes if a frame was modified and needs to be written back into
        disk, if its selected for eviction
    -   "clean" means that it can just be overwritten
    -   these two different classes are used for the page replacement algorithms,
        these will covered in lots of detail later :)
-   page faults are managed with software, not hardware. similarly, when a page fault
    occurs, it's the OS that picks it up, not lower level sub systems

## implementation

-   there are 2 main considerations for implementing page faults

    -   the mapping of virtual --> physical must be very fast
    -   if the virtual address space is large, the page table will also be large

-   any reference to any address must be translated
    -   even arguments for instructions
-   if an instruction takes 1nsec, translation must take around ≈0.2 nsecs with page
    size of 4kb

with a page size of 4kb and a 32 but address space, the table with require around
1,000,000 entries

-   when you remember that each process has it's own page table, this is quite a lot
    of storage required for a page table.

-   one way to go about implementing, for each entry in the page table it has a
    corresponding hardware register. it's simple and requires no extra mapping as the
    page table is no longer kept in memory.
-   however, swapping out the values of these registers when a context switch occurs
    is insanely expensive at large page table sizes

-   in contrast we could keep all tables in memory, only keeping a reference to the
    location of the table in hardware. this would make context switching very fast
    but translations would be expensive (this is the way we do it tho)

## speeding up paging

-   to speed up paging to improve handling of large page tables mostly starts with
    the assumption that the page table is already in memory.
-   we can equip computers with a small hardware array of registers (usually no more
    then 256) this contains fields that have a 1-1 correspondence with the page
    table. another bit is present which indicated if the entry is in use or not
-   now, when an address is referenced and presented to the MMU for translation,
    first the table is checked (this table is known as the TLB or **translation
    lookaside buffer**) to see if an entry with the matching virtual table number is
    present and because of special hardware, this lookup can be done simultaneously.
-   if the MMU detects a TLB miss, it will do a normal page table lookup
-   once the page table entry is found, the OS will evict one of the entries in the
    TLB and put the new page there in place.
-   that way if the page is referenced again it only needs to go the the TLB

-   many RISC systems (and some others) do all page management in software. this
    offloading of responsibility free's up chip space and although translation
    because a little slower, it allows for greater improvements in performance
    elsewhere. it also allows for an increase in chip simplicity.
-   handling of TLB misses must be handled very quick, as they occur far more often
    then a page fault.
-   a number of strats are done to try and reduce the number of TLB faults. one is
    "intuition". where, for instance, if a server is running on a machine. and the
    code that manages an incoming request is ran, it's likely that the code that
    generates a response will soon be ran, so those pages are loaded in advance
-   sometimes the pages containing the page table may not be in memory, leading to
    TLB and page faults happening in additional to the memory lookup. to fix this
    systems will very often keep a large software cache (around `4kbs`) maintaining
    pages that are always kept in the TLB. this substantially reduces TLB misses. the
    cache is also kept in a fixed location in memory
-   when systems are running software managed TLBs we can break the misses into a
    number of different categories

| name of miss     | explanation                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| soft miss        | when the address is not in the TLB, but is in memory. the TLB must be updated. no disk I/O. around 2nsecs to fix                         |
| hard miss        | when a page is not in the TLB or memory, this requires a search of the page table. easily a million times slower to fix then a soft miss |
| minor page fault | a page may not be in the process page table, but could still be in memory due to a another process bringing it in (i.e a shared library) |
| major page fault | when the page table is not in memory at all                                                                                              |
| segmentation     | if a process tries to access invalid memory addresses. the OS will kill this process with a "segmentation fault" signal                  |

-   when we need to do a search of the page table it is known as a **page table
    walk**

## biiiiiiig memories

-   if the span of the virtual addresses is really big, then we may need to split the
    page table up into multiple tables.
-   we no longer have the entire page table in memory at once

-   this approach known as "multilevel page tables" means that the higher order page
    table bits are know split into a number of segments indidicating the index for
    each depth of page table

<table class='prose-td:border-white prose-td:border-2 prose-td:text-center'>
    <tr>
        <td>PT1 offset</td><td>PT2 offset</td><td>offset</td>
    </tr>
</table>

-   MORE READING REQUIRED ON MULTILEVEL PAGE TABLES

-   an alternative to page tables and their ever increasing hierarchy is the
    "inverted page table". in this design, pioneered by intel. tables have an entry
    for each page in real, physical memory. this saves considerable amounts of space,
    but the translation becomes way more complex.
-   we can still speed it up with the use of TLBs
-   TLB miss is an expensive operation tho
-   because of how much for space efficient this method is, most 64bit systems use
    inverted page tables

## page replacement algorithms

-   when a page fault occurs, the OS must choose which table to evict.
-   if the page to be evicted has been modified, we also need to write it back to
    disk
-   we could just pick a page at random to evict, but studies have shown that picking
    the lesser used pages leads to better perfs (as less faults end up occurring over
    time)
-   we can envision a perfect algorithm for page replacement, even if it's impossible
    to implement in the real world. it is still useful to inform and compare against
    our algorithms later
-   <a name="optimal-algo"></a> the moment a page fault occurs, there exists a set of
    pages in memory and all of these pages are going to be references _at some point_
    later on in execution.
-   if we pick the page that will not be referenced for the longest amount of clock
    cycles and use that one, it would result in optimal performance.
-   since we cannot know in advance what pages are going to be referenced, it not
    actually possible to implement this algorithm
    -   we could record the pages used in a sandbox during normal execution, then use
        that to figure out what the optimal algorithm _should_ look like, and this is
        useful for comparison

| list of algorithms                                |
| ------------------------------------------------- |
| [optimal algorithm](#optimal-algo)                |
| [NRU (not recently used)](#nru)                   |
| [FIFO (first in, first out)](#first-in-first-out) |
| [second chance](#second-chance)                   |
| [LRU (least recently used)](#least-recently-used) |
| [NFU (not frequently used)](#not-frequently-used) |
| [aging](#aging)                                   |
| [clock](#clock-page-replacement)                  |
| [working set](#working-set-page-replacement)      |
| [WS clock](#wsclock)                              |

-   we shall now delve into lots of detail on these!

### NRU

-   as mentioned earlier, the page table contains bits R & M - when a process is
    started, all of it's pages are marked as not in memory.
-   the system loads the page and sets the R bit. it is loaded in "read only mode"
-   if the process subsequently tries to modify the page, another type of fault is
    generated and the OS will change the M bit and change the page mode to
    "read/write".
-   we can seperate the pages with various states of R/M bits into 4 classes

-   on each clock interrupt, the R bit is cleared. this way we know which pages have
    not recently been read (as whenever a page is referenced, the page table sets
    it's R bit)

| Class Type | R bit | M bit | description                                                                                                                                                                                                                                                                  |
| ---------- | ----- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| class 0    | 0     | 0     | not references, or modified                                                                                                                                                                                                                                                  |
| class 1    | 0     | 1     | although it might seem impossible, this happens when a page has been modified, but not referenced for long enough that it's R bit has been cleared. The OS will never clear the M bit of the page, since it's needed so that it can be written back to disk if it is evicted |
| class 2    | 1     | 0     | referenced but not modified                                                                                                                                                                                                                                                  |
| class 3    | 1     | 1     | modified and referenced                                                                                                                                                                                                                                                      |

-   NRU works by selecting at random, a page from the lowest class available
-   although not wholely optimal, this algo is trivial to implement and understand,
    its considered "good enough"

### first in first out

-   the OS maintains a list of all pages most recently added
-   at the tail, the newest, and getting older and older the closer you get to the
    head
-   when a page fault happens the head is evicted and the new page becomes the tail
    of the list
-   it makes the fatal assumption that the oldest page is the least used one, this is
    often false
-   FIFO is rarely used as described in this section

### second chance

-   this algorithm is a slight modification to FIFO, allowing it to give the oldest
    page (that might be heavily used) another chance.
-   on page fault, inspect the R bit of the oldest page, if it 1 clear it, and move
    it to the tail of the list. then repeat of on the next item.
-   if all pages have been referenced, then second chance descends into regular FIFO
    (after 1 full iteration of the linked list)

### clock page replacement

-   instead of keeping the program in a simple linked list, this algo uses a circular
    linked list data structure ("**the clock**")
-   the "hand" points to the oldest page in the list
-   on page fault, the page in place of the hand is inspected. if the R bit = 1 , its
    cleared and the hand is advances. this repeats until a page with R=0 is found.
-   this page is then evicted and the new page is inserted in place of the old one

### least recently used

-   we can look at our [optimal algo](#optimal-algo) in a different light, heavily
    used pages are likely to stay in use. whereas pages that have not been accessed
    for some time, will likely stay un-accessed
-   unlike the "optimal" algo, this is possible to implement, but it does not come
    computationally cheap.
-   we must keep a linked list with the most recently used at the top, and the least
    at the bottom.

    -   on every memory reference, this list needs to be updated (bit pricey init)
    -   when we update the page we need to delete from current place, and attach it
        to top. sometimes there a multiple memory references per instruction. so this
        becomes exponentially inefficient _fast_

-   there are ways to implement this a bit better if we equip the system with a 64bit
    counter that gets increased on each instruction. when a page is references we set
    the value of this counter to a new field. so, when a page fault occurs, the page
    with the lowest counter value is therefor the oldest.

-   while technically feasable, not many systems contain this hardware counter
    needed. so a software implementation needs to be thought of...

### not frequently used

-   each entry in page table is given a software counter, and at every clock
    interrupt the value of the respective R bit is added to the counter. the entry
    with the lowest counter value will be evicted
-   the fatal error with this is that older, heavily used pages will have priority
    over the more recent additions to the page table. if a page has been in use for a
    very long time, but is no longer being referenced. it's unlikely to be evicted
    anytime soon, as it's counter value is large

### aging

-   to fix this, we need to have a way of weighting the more recent pages
-   there are two main differences in aging compared to [NFU](#not-frequently-used)
    -   the clock value is shifted to the right by 1 bit before the counter is
        increased (this halves it's decimal value)
    -   the R bit is now added to the _**left**_ most bit instead of the right

### working set page replacement

-   when a process begins, it will likely spit out many page faults as its global
    variables, stack and first few interactions are still being brought in.
-   after a while a process will have it's most commonly used pages loaded in and the
    number of page faults will have markedly decreased
-   this is called 'demand paging' as pages are loaded in when they are needed, not
    primitively.
-   most processes exhibit a pattern of behavior known as 'locality of reference'
    meaning that during execution a process will center around a small number of
    pages, and only occasionally have to request a different one from further afield.
-   the set of pages that a process is currently using is known as it's "**working
    set**"
-   if the entirety of the set is in memory then a process will generate 0 page
    faults
-   the working set model is when a system keeps track of a processes working set and
    ensures that is is in memory before the process runs. it greatly reduces the
    number of page faults thrown at the beginning of process execution
-   the strat of loading a processes pages before it begins is known as "pre paging"
-   in it's simplest form, working set replacement is when "if a page fault occurs,
    evict a page not in the working set"
-   the difficulty becomes calculating the contents of the working set
-   if we use the approximation of execution time of when the page was referenced,
    then we can define the working set as "all pages referenced in the last `t`
    amount of time"
-   on every page fault, the page table is scanned for an eviction candidate
-   the R bit is examined. if 1, the current virtual time is written, given in this
    case the R bit is 1 is is clearly in the working set.
-   if R is 0, check to see if the time of last use is less then `t`. if its greater,
    then this page is not in the working set and can be evicted
-   if all pages are in the working set, then the page with the oldest last used
    counter is evicted.
-   in the absolute worst case where all pages are referenced, one is picked at
    random

## WSclock

-   the main issue with the standard working set is that is that on fault, the entire
    page table is scanned.
-   WS clock merges the efficiency of [clock](#clock-page-replacement) with the
    theoretical greatness of [working set](#working-set-page-replacement)

## page fault handling

on the event of a page fault, the following steps are carried out:

-   hardware traps the kernel, program counter is saved into the stack
-   an assembly routine is started it saves all the registers and volatile
    information
-   the OS is made aware of fault, and must figure out which virtual page to load,
    this can be done using hardware registers (preferred method). or the OS can parse
    the last instruction called to figure out where the fault occurred.
-   once the virtual address is known, the OS will check if its a valid address, if
    it is not valid then the OS will send a signal to the process to kill it. then,
    the OS will check to see if any pages frames are free, if not the page
    replacement algorithm is ran.
-   if the to-be evicted frame has been modified, it is scheduled to write to disk
    and another process is given control until thw write is complete
-   once it completes (disk interrupt signal). the page table is updated.
-   the faulting instruction is loaded back in, along with the rest of the CPU data.
    and the process is returned

# backing store

-   we have covered in depth how pages are replaced. but how does the disk management
    side of paging work?
-   in most unix systems some form of swap partition is used- this partition does not
    use "files" as we are familiar with them
-   block numbers relative to the start of the partition are used- on system boot the
    partition is empty and is represented by a single chunk
-   on the start of the first process, a section of the partition is reserved. the
    size of it equal to the process core image.
-   this repeats for every new process and when they finish, the space is free'd
-   the swap partition is managed as a list of free chunks
-   associated with each process is the address of it's disk address for the swap
    area, we keep this address in the process table
-   calculating where to write the page is simply virtual
    `address offset + swap area`
-   before the process begins we need to initialise the swap area
    -   we can load the entire process core image to the disk first, and page in as
        needed
    -   we could also do the opposite, load all into memory and page as needed
-   this does not take into account that sometime a process can increase in size, it
    may be better to reserve different areas for text, data and stack. so that each
    one can grow independently of another
-   one the other end of the scale, we could allocate nothing in advance, only
    allocating space in the event something needs to be paged out - this has a
    disadvantage since a page has no static position in memory, for every process a
    table containing the current page -> physical disk mapping must be maintained
-   having a fixed size swap partition is not always available
-   systems sometimes use a series of large files with the normal file system
    (windows does this)
-   this approach does come with 1 nice optimization since we know that a program
    text comes from it's executable file, we can use this file as the swap area for
    the text. and as it remains present after execution, there is never any need to
    write it back after de-allocation
-   shared libraries also can work this way

# segmentation

-   so far, the virtual memory covered contains everything a process needs. it means
    that if any part of the process grows the entire virtual memory must also grow
-   segmentation is the idea of separating a process into multiple virtual address
    spaces
-   so that areas of the process can grow and shrink independently of one another
-   a common example of where this is useful is a compiler where it has multiple
    tables that undergo vast amounts of change
    -   source text
    -   symbol table, containing variables and function names
    -   table for all compiler time constants
    -   parse tree of the program syntax
-   in a normal virtual memory setup, the address space would need to be constructed
    in such a way that these tables and data structures can easily grow

![memory stack](../../../../assets/memory-stack.webp)

-   in this case and many others, we probably want some kind of way to unburden the
    programmer from where the position of data structures are,. throughout the
    virtual address space
-   segments are a logical entity, means that they are a programmer instantiated
    object
-   a segment contain a procedure, a stack, collection of scalar variables, but does
    not usually mix types
-   segment lengths usually vary wildly
-   the handling of growing data areas is not the only thing that segments simplify,
    linking of shared libraries is better now, as a segment containing the library
    can be shared between multiple processes
-   implementation of segments differs in that pages are of fixed size, and segments
    are dynamic. this can lead to "checkerboarding" in memory, which can be dealt
    with using the occasional run of a compacting procedure

## table of comparison

| point of comparison                             | paging | segmentation |
| ----------------------------------------------- | ------ | ------------ |
| is programmer aware?                            | N      | Y            |
| how many address spaces                         | 1      | many         |
| total address space > physical memory           | Y      | Y            |
| conflicting size can easily be dealt with       | N      | Y            |
| can easily share common utils between processes | N      | Y            |

## segmentation with paging

-   if the segment gets large it can often be tricky or even impossible to keep the
    entire thing in memory, so designs of the
    [MULTICS](httpshttps://www.multicians.org/) system came up with a way to combine
    paging and segmentation. a few other operating systems followed suit after.
-   each program in multics had a segment table with one descriptor per page, this
    segment table would be so large, that it was even a segment and was paged
-   if any page of the segment was in memory, the entire segment was considered to be
    present.
-   the segment descriptor contains size. protection bits and it's page table
    address. each page segment by the OS to be the same as a non-segmented page.
-   the same page fault algorithms

<table class='prose-td:border-white prose-td:border-2 prose-td:text-center'>
    <tr>
        <td>18 bits for address of page table</td><td>9 bit segment length (in terms of pages)</td><td>1 bit for page size</td><td>3 bits for protection bits</td><td>1 bit for random stuff</td>
    </tr>
</table>

-   when a reference occurs the following steps happen:
    -   segment number is used to find the descriptor
    -   a check to see if the segment page table is in memory, if it is, it's
        located. if ot a seg fault occurs.
    -   the page table entry for the virtual page is examined. if it's present the
        the physical address is extracted and if not a page fault is triggered.
-   this process is very slow if done for every single references so a
    [TLB](#speeding-up-paging) is used. in fact the MULTICS designers were the first
    people to use TLB. in multics, around 16 entries are usually kept

## segmentation in x86

-   x86 prioritized higher segment size as apposed to more segments. since a process
    very rarely needed more then 1000 segments
-   segmentation is considered obsolete in 64bit systems and is only present for
    backwards compatibility reasons
-   in 32bit it contains 2 tables. local descriptor table (LDT) and a global
    descriptor table (GDT). each process has it's own LDT but there is only 1 system
    wide GDT

-   the following address scheme is used

<table class='prose-td:border-white prose-td:border-2 prose-td:text-center'>
    <tr>
        <td>13 bits for table index</td><td>1 bit for GDT vs LDT toggle</td><td>2 bits for privilege level</td>
    </tr>
</table>
