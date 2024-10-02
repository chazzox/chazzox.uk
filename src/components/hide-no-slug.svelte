<script lang="ts">
    import { onMount } from "svelte";
    import clsx from "classnames";
    let params = {} as { [key: string]: string | undefined };

    onMount(() => {
        params = Object.fromEntries(
            new URLSearchParams(window.location.search).entries()
        );
    });
</script>

<div class={clsx({ ["hidden"]: Object.keys(params).length == 0 })}>
    <slot />
</div>
