<template>
	<div class="detail-content">
		<HeaderTop :title="title"></HeaderTop>
		<van-swipe class="help-imgs my-swipe" :autoplay="0" :showIndicators="false" :loop='false'>
			<van-swipe-item class="van-swipe-item" v-for="(item,index) in realImgUrl" :key="index">
				<img :src="item" alt="">
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';

export default {
	name: 'newHelpDetail',
	components: {
		HeaderTop
	},
	data() {
		return {
			helpList: [],
			title: '',
			imgUrl: '',
			realImgUrl: []
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	mounted() {
		this.getImg();
	},
	methods: {
		getImg() {
			this.title = this.$route.params.title;
			this.imgUrl = this.$route.params.imgUrl;
			if (this.imgUrl) {
				var cutUrls = this.imgUrl.split(",");
				for (let i = 0; i < cutUrls.length; i++) {
					this.realImgUrl.push(cutUrls[i]);
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-content {
	background: #edeff2;
	.help-imgs {
		// width: 90%;
        height: calc(100vh - 1.3rem);
		margin: .3rem auto 0;
		.van-swipe-item {
            text-align: center;
			img {
				height: 96%;
				// height: auto;
			}
		}
	}
}

</style>
