import vue from 'vue'
import quick_deposit_toast from './quick_deposit_toast'

const ToastConstructor = vue.extend(quick_deposit_toast)
function showToast(_mode,_time = 3000){
    let toastData = new ToastConstructor({
        el:document.createElement('div'),
        data(){
            return {
                showQuickDepositPop:true,
                showMode: _mode
            }
        },
    })
    document.body.appendChild(toastData.$el)
    setTimeout(() => {
        toastData.showQuickDepositPop = false
    },_time)
}

function quickFn(){
    vue.prototype.$quickPop = showToast
}
export default quickFn