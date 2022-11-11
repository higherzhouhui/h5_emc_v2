import * as types from '../constants/common';

const state = {
	header: {
		title: '',
		centerPart: '',
		leftPart: '',
		rightPart: '',
		leftFuncState: '',
		// leftFunc: ()=>{},
		centerFunc: ()=>{},
		rightFunc: ()=>{}
	},
	navigator:{
		isShow:true
	},
	success:{
		tip:null,
		content:null,
		btntext:``,
		btnfunc:()=>{}
	},
	axis:{
		title:null,
		content:null
	},
	loading:false,
	//记录需要保持的视图,
	keepArray: [''],
	//页面跳转动画标识
	pageAnimation:{
		enter:'', //进入动画
		leave:'', //退出动画
	},
	backMark: false, // 是否点击了返回按钮
	withdrawUpdate:false,//回到提取页是否展示等待框
	// 全局变量
	info:'',
    tarbarIndex:'',
    // 未读消息标识
    unread:false,
    multiData:[],
}

const actions = {
	// 全局变量
	infoData({ commit },type){
		commit(types.GOLBLE,type)
	},
    tarbarIndex({ commit },type){
        commit(types.TARBAR,type)
    },
	changeHeader({ commit }, type){
		type.title = type.title == null ? '' : type.title;
		type.centerPart = type.centerPart == null ? '' : type.centerPart;
		type.leftPart = type.leftPart == null ? '' : type.leftPart;
		type.rightPart = type.rightPart == null ? '' : type.rightPart;
		type.leftFuncState = type.leftFuncState == null ? '' : type.leftFuncState;
		// type.leftFunc = type.leftFunc == null ? ()=>{} : type.leftFunc;
		type.centerFunc = type.centerFunc == null ? ()=>{} : type.centerFunc;
		type.rightFunc = type.rightFunc == null ? ()=>{} : type.rightFunc;
		commit(types.COMMON_HEADER,type);
	},
	changeNavigator({ commit }, type){
		type.isShow = type.isShow == null ? '' : type.isShow;
		commit(types.COMMON_NAVIGATOR,type);
	},
	changeSuccess({ commit }, type){
		commit(types.COMMON_SUCCESS,type);
	},
	changeAxis({ commit }, type){
		commit(types.COMMON_AXIS,type);
	},
	changeLoading({ commit }, type){
		commit(types.COMMON_LOADING,type);
	},
	pushKeepAlive({commit}, type){ //  设置页面缓存
		commit(types.COMMON_PUSH_KEEPALIVE,type);
	},
	popKeepAlive({commit}, type){  //清除页面缓存
		commit(types.COMMON_POP_KEEPALIVE,type);
	},
	popRootKeepAlive({commit}, type){ //清除所有页面缓存
		commit(types.COMMON_ROOT_KEEPALIVE,type);
	},
	popKeepAliveAtName({commit}, type){ //返回固定页面，清除之后页面缓存
		commit(types.COMMON_AT_NAME_KEEPALIVE,type);
	},
	setPageAnimation({commit}, type){    //设置页面切换动画
		commit(types.COMMON_PUSH_POP_ANIMATION, type);
	},
	setBackMark({commit}, type){   //设置是否点了返回按钮，用来控制返回时动画展示
		commit(types.COMMON_BACK_MARK, type);
	},
	// 回到提取页是否展示等待框
	withdrawUpdate({commit},type){
        commit(types.WITHDRAW_SHOW_INDICATOR, type);
	},
	unread({commit},type){
        commit(types.COMMON_UNREAD, type);
	},
	multiData({commit},type){
        commit(types.COMMON_MULTIDATA, type);
	}

}

const mutations = {
	// 这个是全局变量
	[types.GOLBLE](state,type){
		state.info=type
	},
    [types.TARBAR](state,type){
        state.tarbarIndex=type
    },
	[types.COMMON_HEADER](state, type) {
		state.header = Object.assign(state.header, type);
	},
	[types.COMMON_NAVIGATOR](state, type) {
		state.navigator = Object.assign(state.navigator, type);
	},
	[types.COMMON_SUCCESS](state, type) {
		state.success = Object.assign(state.success, type);
	},
	[types.COMMON_AXIS](state, type) {
		state.axis = type;
	},
	[types.COMMON_LOADING](state, type) {
		state.loading = type;
	},
	[types.COMMON_PUSH_KEEPALIVE](state, type){
		state.keepArray.push(type);
	},
	[types.COMMON_POP_KEEPALIVE](state, type){
		state.keepArray.pop();

		state.backMark = true;
	},
	[types.COMMON_ROOT_KEEPALIVE](state, type){
		state.keepArray = [state.keepArray[0]];

		state.backMark = true;
	},
	[types.COMMON_AT_NAME_KEEPALIVE](state, type){
		var index = state.keepArray.indexOf(type);
		if(index >= 0){
			state.keepArray.splice(index + 1, state.keepArray.length);
		}

		//设置返回动画
		state.backMark = true;
	},
	[types.COMMON_PUSH_POP_ANIMATION](state, type){
//		console.log('COMMON_PUSH_POP_ANIMATION', type);
		state.pageAnimation = type;
	},
	[types.COMMON_BACK_MARK](state, type){
		state.backMark = type;
	},
	// 回到提取页是否展示等待框
	[types.WITHDRAW_SHOW_INDICATOR](state, type){
		state.withdrawUpdate = type;
	},
	[types.COMMON_UNREAD](state, type){
		state.unread = type;
	},
	[types.COMMON_MULTIDATA](state, type){
		state.multiData = type;
	},
}

const getters = {
	info:state=>state.info,
	header: state => state.header,
	navigator : state => state.navigator,
	axis : state => state.axis,
	success : state => state.success,
	loading : state => state.loading,
	keepArray: state => state.keepArray,
	widthUpdate: state => state.widthUpdate,
    tarbarIndex:state=>state.tarbarIndex,
    unread:state=>state.unread,
    multiData:state=>state.multiData,
}

export default  {
	state,
	actions,
	mutations,
	getters
}
