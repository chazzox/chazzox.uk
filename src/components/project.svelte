<script>
	import { css } from '@emotion/css';
	export let url;
	export let img = 'images/github.svg';
	export let background;

	export let githubOnly = false;

	const backgroundPsuedo = css`
		background-color: ${background};
		&::before {
			background: url('${img}');
		}
	`;
</script>

<!-- svelte-ignore a11y-missing-content -->
<a href={url} class="{backgroundPsuedo} {githubOnly ? 'git' : 'norm'} project" />

<style lang="scss">
	.git {
		background: linear-gradient(to right, #040d21, #3a3da0);
		&::before {
			height: 100%;
			width: 100%;
			background-size: 35%;
			background-repeat: no-repeat;
		}
		&:hover {
			&::before {
				background-size: 50%;
			}
		}
	}

	.norm {
		&::before {
			height: 175%;
			width: 175%;
			background-size: 100%;
			transform: rotate(20deg) translate(-20%, -10px);
		}

		&:hover {
			&::before {
				background-size: 150%;
			}
		}
	}

	.project {
		width: 300px;
		height: 150px;

		position: relative;
		overflow: hidden;
		margin: 15px;

		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
			rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
		border-radius: 9px;

		cursor: pointer;
		transition: margin 0.2s ease;

		&::before {
			background-position: center;
			content: '';
			position: absolute;
			transition: background-size 0.2s ease;
		}
	}
</style>
