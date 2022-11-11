import Vuex from 'vuex';
import Vue from 'vue';
import common from './modules/common';
import home from './modules/home';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		count:0,
		list:[],
		inputValue:'test',
		nextId:5   // 演示用
	},
	// 只有mutations中定义的函数，才能修改state中的数据
	mutations:{
		add(state){
			state.count ++
		},
		addN(state,step){
			state.count += step
		},
		sub(state){
			state.count--
		},
		subN(state,step){
			state.count -= step
		},
		initList(state,list){
			state.list = list
		},
		setInputValue(state,val){
			state.inputValue = val
		},
		addItem(state){
			const obj = {
				id:state.nextId,
				info:state.inputValue.trim(),
				done:false
			}
			state.list.push(obj)
			state.nextId++
			state.inputValue = ''
		}
	},
	actions:{
		addAsync(context){
			setTimeout(()=>{
				// 在actions中，不能直接修改state数据，必须通过context.commit()来触发某个mutation来修改state。
				context.commit('add')
			},1000)
		},
		addNAsync(context,step){
			setTimeout(()=>{
				context.commit('addN',step)
			},1000)
		},
		subAsync(context){
			setTimeout(()=>{
				// 在actions中，不能直接修改state数据，必须通过context.commit()来触发某个mutation来修改state。
				context.commit('sub')
			},1000)
		},
		subNAsync(context,step){
			setTimeout(()=>{
				// 在actions中，不能直接修改state数据，必须通过context.commit()来触发某个mutation来修改state。
				context.commit('subN',step)
			},1000)
		},
		getList(context){
			// var API = require()
			axios.get('../../../static/vuex-test-demo.json').then(({data})=>{
				context.commit('initList',data)
			})
		}
	},
	getters: {
		showNum(state) {
			return '当前数量是['+ state.count +']'
		}
	},
	modules: {
		common,
        home
	}
});

export default store
