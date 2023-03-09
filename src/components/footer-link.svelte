<script lang="ts">
  export let url: string | undefined = "";
  export let displayText: string;
  export let className: string;
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
    "relative bg-opacity-100 p-2 before:absolute before:top-0 before:left-0 before:-z-10 before:contents before:h-full before:w-full before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
    className
  )}
>
  <p class="z-50">{displayText}</p>
</a>
