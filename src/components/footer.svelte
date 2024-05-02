<script lang="ts">
    import { tweened } from "svelte/motion";
    import { backInOut } from "svelte/easing";
    import FooterLink from "./footer-link.svelte";
    import copy from "copy-to-clipboard";

    const show = tweened(-32, {
        duration: 400,
        easing: backInOut
    });

    const bounceHandle = () => {
        copy("chazzox");
        show.set(5);
        setTimeout(() => show.set(-32), 800);
    };
</script>

<div class="fixed flex w-full justify-center" style={`top: ${$show}px`}>
    <div class="rounded-lg bg-green-600 px-1 py-0.5 text-white">
        Copied: "chazzox"!
    </div>
</div>

<div class="z-1 relative z-50 my-4 flex flex-row flex-wrap justify-center gap-3">
    <FooterLink url="https://github.com/chazzox" displayText="Github"
        ><img
            slot="icon"
            class="h-3 w-3 invert transition-[filter] duration-200 group-hover:invert-0 dark:invert-0 dark:group-hover:invert"
            src="/social-icons/SVG/White/Github_white.svg"
            alt="github icon"
        /></FooterLink
    >
    <FooterLink
        url="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk"
        displayText="Spotify"
        ><img
            slot="icon"
            class="h-3 w-3 invert transition-[filter] duration-200 group-hover:invert-0 dark:invert-0 dark:group-hover:invert"
            src="/social-icons/SVG/White/Spotify_white.svg"
            alt="spotify icon"
        /></FooterLink
    >
    <FooterLink onClick={bounceHandle} displayText="Discord"
        ><img
            slot="icon"
            class="h-3 w-3 invert transition-[filter] duration-200 group-hover:invert-0 dark:invert-0 dark:group-hover:invert"
            src="/social-icons/SVG/White/Discord_white.svg"
            alt="Discord icon"
        /></FooterLink
    >
    <FooterLink url="https://www.linkedin.com/in/charlieaylott/" displayText="LinkedIn"
        ><img
            slot="icon"
            class="h-3 w-3 invert transition-[filter] duration-200 group-hover:invert-0 dark:invert-0 dark:group-hover:invert"
            src="/social-icons/SVG/White/LinkedIN_white.svg"
            alt="Linkedin icon"
        /></FooterLink
    >
</div>
