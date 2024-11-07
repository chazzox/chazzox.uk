<script lang="ts">
    import { type CollectionEntry } from "astro:content";
    import { posts, tags } from "../state/svelte-state";

    const getBlogTags = (b: CollectionEntry<"notes">) =>
        b.data.tags?.map((t) => t.id) || [];
</script>

<div class="flex flex-col gap-3 px-10 pb-5 md:grid md:grid-cols-3 md:gap-2">
    {#each Object.values($tags).includes(true) ? $posts.filter((p) => (p.data.tags || []).filter((v) => $tags[v.id]).length > 0) : $posts as blog}
        <a
            href={`/notes/${blog.slug}`}
            class="group block max-w-2xl border-1 border-black p-3 shadow-lg transition-colors hover:bg-gray-300 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
            <h2 class="font-semibold">{blog.data.title}</h2>
            <h3>
                <span class="underline">description:</span>
                {blog.data.description}
            </h3>
            <h4>
                <span class="underline">tags:</span>
                {#each getBlogTags(blog) as tag, index}
                    <span
                        class="border-1 border-black px-1 py-[0.125rem] leading-[1.9] transition-[border-color] dark:border-white dark:group-hover:border-black"
                        >{tag}</span
                    >{#if index + 1 !== getBlogTags(blog).length},{" "}
                    {/if}
                {/each}
            </h4>
            <h4><span class="underline">author:</span> {blog.data.author.id}</h4>
        </a>
    {:else}
        <p class="dark:text-white">not much to see here...</p>
    {/each}
</div>
