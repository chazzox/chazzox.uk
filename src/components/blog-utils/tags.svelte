<script lang="ts">
    import clsx from "classnames";
    interface Props {
        tags: (readonly [string, boolean])[];
    }

    let { tags = $bindable([]) }: Props = $props();
</script>

<div
    class="sticky top-0 mr-3 flex min-h-7 w-full flex-wrap gap-3 bg-content-background py-5 dark:bg-black"
>
    {#each tags as [key, isActive], index}
        <div
            class={clsx(
                "cursor-pointer select-none border-1 border-black px-1 text-base shadow-2xl shadow-black transition-colors duration-150 hover:underline dark:border-white",
                isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "dark:text-white"
            )}
            role="button"
            tabindex="0"
            onmousedown={() => {
                tags = [
                    ...tags.slice(0, index),
                    [key, !isActive],
                    ...tags.slice(index + 1)
                ];
            }}
        >
            {key}
        </div>
    {/each}
</div>
