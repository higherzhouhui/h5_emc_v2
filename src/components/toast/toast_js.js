import vue from 'vue'
import toast from './toast'

const ToastConstructor = vue.extend(toast)
function showToast( _text,_icon,_time = 2000){
    let toastData = new ToastConstructor({
        el:document.createElement('div'),
        data(){
            return {
                toastText: _text,
                isIcon:_icon,
                isShow:true
            }
        }
    })
    document.body.appendChild(toastData.$el)
    setTimeout(() => {
        toastData.isShow = false
    },_time)
}

function regFn(){
    vue.prototype.$toast = showToast
}
export default regFn