<template>
	<div class="">
		<!--		<p>当前count值为：{{$store.state.count}}</p>-->
		<!--getters的第一种使用方法-->
		<p>{{ this.$store.getters.showNum }}</p>
		<button @click="btnHandle1">+1</button>
		<button @click="btnHandle2">+N</button>
		<button @click="btnHandle3">+1 async</button>
		<button @click="btnHandle4">+N async</button>
	</div>
</template>

<script>
// 第一种使用vuex全局数据的方式
export default {
	name: "addition",
	data() {
		return {}
	},
	methods: {
		btnHandle1() {
			this.$store.commit('add')
		},
		//commit的作用为调用某个mutation函数
		btnHandle2() {
			this.$store.commit('addN', 6)
		},
		//dispatch专门用来触发actions
		btnHandle3() {
			this.$store.dispatch('addAsync')
		},
		btnHandle4() {
			this.$store.dispatch('addNAsync', 6)
		}
	}
}
</script>

<style scoped>

</style>
