<style lang="scss">
	.headul {
		list-style: none;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;
		margin: 0;
	}

	.headli {
		list-style-type: none;
		float: left;
	}

	.logo {
		height: 70px;
		&:hover {
			opacity: 0.5;
		}
	}
</style>

<ul class="headul">
	<li class="headli"><img class="logo" src="images/logo.png" alt="my logo" /></li>
	<li class="headli">
		<h1 style="color: #fff">Charlie's Website</h1>
	</li>
</ul>
