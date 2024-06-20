<script lang="ts">
    import clsx from "classnames";
    import { addTag, tags, toggleTag } from "./filter";
    export let initialTags: string[];
    initialTags.forEach((t) => addTag(t));
</script>

{#each Object.entries($tags) as [key, isActive]}
    <div
        class={clsx(
            "cursor-pointer px-1 dark:border-white dark:text-white border-black border-2 shadow-2xl shadow-black transition-colors duration-150 select-none text-base",
            {
                "bg-black text-white dark:bg-white dark:!text-black": isActive
            }
        )}
        role="button"
        tabindex="0"
        on:mousedown={() => toggleTag(key)}
    >
        {key}
    </div>
{/each}
