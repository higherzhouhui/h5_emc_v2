<template>
	<div class="appDownload">
		<HeaderTop :title="`APP下载`"></HeaderTop>
		<iframe class="download-content" ref='iframeHeight' id="iframeId" frameborder=0 width=100% height=100% marginheight=0 marginwidth=0 src="https://www.emcxz5.com/" scrolling=yes style="overflow-y: scroll"></iframe>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';

export default {
	name: 'appDownload',
	components: {
		HeaderTop,
		
	},
	data() {
		return {}
	},
    beforeRouteLeave(to, from, next) {  
		this.$destroy(true)
		next()
	},
	mounted(){
	
	},
	methods: {
	
	}
}
</script>

<style lang="scss" scoped>
.appDownload {
	height: 100%;
	padding-bottom: 1rem;
	.download-content {
	}
	
}
::-webkit-scrollbar {
	width: 0px;
}
</style>
