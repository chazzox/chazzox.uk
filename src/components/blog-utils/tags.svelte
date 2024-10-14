<script lang="ts">
    import clsx from "classnames";
    import { tags, toggleTag, setMatchingTags } from "../state/svelte-state";
    import { onMount } from "svelte";

    onMount(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setMatchingTags(searchParams.get("slug")?.split(",") || []);
    });
</script>

<div class="flex min-h-7 gap-3">
    {#each Object.entries($tags) as [key, isActive]}
        <div
            class={clsx(
                "cursor-pointer select-none border-1 border-black px-1 text-base shadow-2xl shadow-black transition-colors duration-150 hover:underline dark:border-white",
                isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "dark:text-white"
            )}
            role="button"
            tabindex="0"
            on:mousedown={() => toggleTag(key)}
        >
            {key}
        </div>
    {/each}
</div>
