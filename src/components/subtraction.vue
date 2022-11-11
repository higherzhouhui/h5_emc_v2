<template>
	<div class="">
<!--		<p>当前count值为：：{{count}}</p>-->
		<p>{{showNum}}</p>
		<button @click="sub">-1</button>
		<button @click="subN(6)">-N</button>
		<button @click="subAsync">-1 Async</button>
		<button @click="subNAsync(6)">-N Async</button>
	</div>
</template>

<script>
// 第二种使用vuex全局数据的方式:使用mapState方法.第二种触发mutations的方式:mapMutations和mapActions。第二种使用getters的方式:mapgetters
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
	name: "subtraction",
	data() {
		return {}
	},
	computed:{
		...mapState(['count']),
		...mapGetters(['showNum'])
	},
	methods:{
		...mapMutations(['sub','subN']),
		...mapActions(['subAsync','subNAsync']),
		// btnHandler1(){
			// this.sub();
		// },
		// btnHandler2(){
		// 	this.subN(6);
		// },
		// btnHandler3(){
		// 	this.subAsync();
		// }
	}
}
</script>

<style scoped>

</style>
