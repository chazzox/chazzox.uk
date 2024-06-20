<script lang="ts">
    import { type CollectionEntry } from "astro:content";
    import { tags, getActive } from "@components/blog-utils/filter";
    import { onMount } from "svelte";

    let params = {} as { [key: string]: string | undefined };

    onMount(() => {
        params = Object.fromEntries(
            new URLSearchParams(window.location.search).entries()
        );
    });

    export let posts: CollectionEntry<"blogs">[];

    let activeTagPostUnion: CollectionEntry<"blogs">[] = [];
    let currentActive: string[] = getActive();
    let paramFilteredPosts =
        typeof params?.["slug"] == "undefined"
            ? posts
            : posts.filter((p) => p.data.folder.id == params["slug"]);

    const getBlogTags = (b: CollectionEntry<"blogs">) =>
        b.data.tags?.map((t) => t.id) || [];

    $: {
        (currentActive = getActive()), [$tags];
        activeTagPostUnion = paramFilteredPosts.filter(
            (t) =>
                getBlogTags(t).filter((n) => currentActive.indexOf(n) !== -1)
                    .length > 0 && currentActive.length > 0
        );
    }
</script>

{#each activeTagPostUnion.length > 0 ? activeTagPostUnion : posts as blog}
    <div
        class="dark:border-white dark:text-white border-black border-1 block my-3 max-w-2xl p-3"
    >
        <h2 class="font-semibold">{blog.data.title}</h2>
        <h3>description: {blog.data.description}</h3>
        <h4>tags: {getBlogTags(blog).join(",")}</h4>
        <h4>author: {blog.data.author.id}</h4>
    </div>
{/each}
