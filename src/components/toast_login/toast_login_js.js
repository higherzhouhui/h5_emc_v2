import vue from 'vue'
import toast_login from './toast_login'

const ToastConstructor = vue.extend(toast_login)
function showToastLogin( _text,_icon,_time){
    let toastTopData = new ToastConstructor({
        el:document.createElement('div'),
        data(){
            return {
                toastLoginShow:true
            }
        }
    })
    document.body.appendChild(toastTopData.$el)
}

function toastLoginFn(){
    vue.prototype.$toastLogin = showToastLogin
}
export default toastLoginFn