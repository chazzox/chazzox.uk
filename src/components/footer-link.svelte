<script lang="ts">
    export let url: string | undefined = "";
    export let displayText: string;
    export let className: string | undefined = "";
    export let onClick: undefined | (() => void) = undefined;

    import classNames from "classnames";
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
    class={classNames(
        "rounded-xl border-[1px] border-white px-6 py-1 transition-colors dark:border-gray-700 dark:hover:bg-[#e8e8e8] dark:hover:text-black",
        className
    )}
>
    <slot name="icon" />
    <p class="z-50">{displayText}</p>
</a>
