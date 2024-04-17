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
        copy("chazzox#1001");
        show.set(5);
        setTimeout(() => show.set(-32), 800);
    };
</script>

<div class="fixed flex w-full justify-center" style={`top: ${$show}px`}>
    <div class="rounded-lg bg-green-600 px-1 py-0.5 text-white">
        Copied: chazzox#1001!
    </div>
</div>

<div class="z-1 relative z-50 my-4 flex flex-row flex-wrap justify-center gap-3">
    <FooterLink url="https://github.com/chazzox" displayText="Github" />
    <FooterLink
        url="https://open.spotify.com/user/lntwtvllegk9frl5rn3elv0dk"
        displayText="Spotify"
    />
    <FooterLink onClick={bounceHandle} displayText="Discord" />
    <FooterLink url="https://www.linkedin.com/in/chazzox/" displayText="LinkedIn" />
</div>
