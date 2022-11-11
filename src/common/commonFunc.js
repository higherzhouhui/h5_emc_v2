// import {
// 	Toast,MessageBox,Indicator
// } from 'mint-ui';
export default {
	install(Vue) {
        /**
         *  逛一逛功能登录toast组件
         * @param  {Boolean}   showLoginToast      是否调用弹框
         */
         Vue.prototype.loginToastFn = function(){
            if(localStorage.getItem('login_flag') === 'false' 
            && window.location.href.indexOf('phonePassword') === -1 
            && window.location.href.indexOf('login') === -1 
            && window.location.href.indexOf('help2') === -1
            && window.location.href.indexOf('register') === -1
            && window.location.href.indexOf('registerStep2') === -1
            ) {
                this.$toastLogin()
                return false
            }
        },

	    /**
         *  弹窗3（mint UI 确认框组件）
         * @param  {String}   msg      打印信息
         * @param  {Function} func     确认执行回调函数，默认是空函数
         * @param  {Boolean} ShowCancel    需要取消和确认按钮，默认是true
         */
        // Vue.prototype.confirmAlert=function(msg,func,ShowCancel){
        // 	let Func=()=>{}
        // 	if(!func || func=='') Func;
        // 	else Func=func;
        // 	if(ShowCancel=='')ShowCancel=true;
        // 	MessageBox({
        //         title: '提示',
        //         message: msg,
        //         showCancelButton: ShowCancel,
        //     }).then(action => {
        //         if(action=='confirm')  Func();
        //     });
        // },

         /**
         * 设置登录标志
         * @param {Boolean} flag 设置登录标志 true or false
         */
        Vue.prototype.setLogin = function(flag){
            if(typeof flag === 'boolean') {
                localStorage.setItem("login_flag", flag);
                // sessionStorage.setItem("login_flag", flag);
            }
        },

		//设置是否判断登录
		Vue.prototype.setIsLogin = function(flag){
            if(typeof flag === 'boolean') {
                localStorage.setItem("isLogin", flag);
              // sessionStorage.setItem("isLogin", flag);
            }
        },
        //判断参数是否为空
        Vue.prototype.isEmpty = function(B){
        	switch(typeof B){
	        	case"undefined":
	        		return true;
	        	case"string":
	        		if(B.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length==0){
	        			return true
	        		}
	        		break;
	        	case"boolean":
	        		if(!B){
	        			return true
	        		}
	        		break;
	        	case"number":
	        		if(isNaN(B)){
	        			return true
	        		}
	        		break;
	        	case"object":
	        		if(null===B||B.length===0){
	        			return true
	        		}
	        		for(var A in B){
	        			return false
	        		}
	        		return true
        		}
        	return false
        }
	}
}
