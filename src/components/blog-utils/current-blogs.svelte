<script lang="ts">
    import { type CollectionEntry } from "astro:content";
    import { posts, tags } from "../state/svelte-state";

    const getBlogTags = (b: CollectionEntry<"blogs">) =>
        b.data.tags?.map((t) => t.id) || [];
</script>

<div class="flex flex-col gap-3 py-5">
    {#each $posts.filter((p) => (p.data.tags || []).filter((v) => $tags[v.id]).length > 0) as blog}
        <a
            href={`/blogs/${blog.slug}`}
            class="block max-w-2xl border-1 border-black p-3 shadow-lg transition-colors hover:bg-gray-300 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
            <h2 class="font-semibold">{blog.data.title}</h2>
            <h3>description: {blog.data.description}</h3>
            <h4>tags: {getBlogTags(blog).join(", ")}</h4>
            <h4>author: {blog.data.author.id}</h4>
        </a>
    {:else}
        <p class="dark:text-white">not much to see here...</p>
    {/each}
</div>
