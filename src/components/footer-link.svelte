<script lang="ts">
    export const className: string | undefined = "";
    export let url: string | undefined = "";
    export let displayText: string;
    export let onClick: undefined | (() => void) = undefined;
</script>

<!-- svelte-ignore security-anchor-rel-noreferrer -->
<a
    target="_blank"
    href={url}
    on:click={(e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    }}
    class="group flex items-center gap-2 rounded-xl border-1 border-gray-700 px-6 py-1 transition-colors duration-300 hover:bg-black hover:text-white dark:border-gray-700 dark:hover:bg-content-background dark:hover:text-black"
>
    <slot name="icon" />
    <p class="z-50">{displayText}</p>
</a>
