import vue from 'vue'
import toast_top from './toast_top'

const ToastConstructor = vue.extend(toast_top)
function showToastTop( _text,_icon,_time = 2000){
    let removeDom = document.getElementById('toastTopPop')
    if(removeDom !== null){
        removeDom.remove()
    }
    // removeDom.parentNode.removeChild(removeDom)
    let toastTopData = new ToastConstructor({
        el:document.createElement('div'),
        data(){
            return {
                toastTopText: _text,
                isIconTop:_icon,
                toastTopShow:true
            }
        }
    })
    document.body.appendChild(toastTopData.$el)
    setTimeout(() => {
        toastTopData.toastTopShow = false
    },_time)
}

function regFn(){
    vue.prototype.$toastTop = showToastTop
}
export default regFn