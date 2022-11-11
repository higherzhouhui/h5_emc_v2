<template>
    <div class="write-msg-body">
        <HeaderTop :title="`写信`"></HeaderTop>
        <div class="content-box">
            <div class="sms-content">
                <div class="white-msg-box" @click="showUploadMenu = null">
                    <!-- <div class="content-title flex">
                        <input placeholder="请输入标题" maxlength="30" v-model="title" @input='inputCheck()'>
                    </div> -->
                    <van-field class="content-title flex" placeholder="请输入标题" maxlength="30" v-model="title" @input='inputCheck()'/>
                    <div class="msg-type-box flex-b" @click='showPicker()'>
                        <div class="msg-type-fonts">{{msgType}}</div>
                        <van-icon class='msg-type-icon' name="arrow-down" color="#ABB3C2"/>
                    </div>
                    <van-field class='msg-content' v-model="content" rows="4" autosize label="" type="textarea" maxlength="300" placeholder="请输入内容" show-word-limit  @input='inputCheck()'/>
                    <div class="upload-area-top flex">
                        <div class="van-uploader" @click="choseFile()">
                            <div class="upload-click flex-c">
                                <!-- <span class="upload-click-icon bold">+</span> -->
                                <div class="text-c">
                                    <van-icon name="photo" size='.34rem'/><br>
                                    上传图片
                                </div>
                            </div>
                        </div>
                        <input type="file" accept="image/*" name="uploadFile" v-on='fileData' id="uploadFile" @change="fileChange($event)" style="visibility:hidden;position:absolute;top:0px;width:0px"/>
                        <div class="uploaded-list flex">
                            <div class="uploaded-list-img-box flex-c" v-for='(item,index) in fileList' :key='index' @click.stop="showUploadMenu = index">
                                <img :src="item" alt="" class="uploaded-list-img">
                                <div class="upload-menu-box" :class="showUploadMenu === index?'upload-menu-activing':''" :id='showUploadMenu + index'>
                                    <div class="upload-menu flex-c" @click.stop="deleteUploadImg(index)">删除</div>
                                    <div class="upload-menu-line"></div>
                                    <div class="upload-menu flex-c" @click.stop="showUploadImgPop(item)">查看</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <subBtn :buttonText='`提交`' :btnDisabled='whiteCheck' :buttonFn='submit()'></subBtn> -->
                    <div class="bottom-btn-box">
                        <van-button class="bottom-btn" round type="info" color="#0895FE" block @click="submit()" :disabled="whiteCheck">提交</van-button>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="uploadImgShow" class='check-upload-img-box' :close-on-click-overlay='false'>
            <img :src="imgSrc" alt="" class="check-upload-img">
            <div class="img-close-box" @click="uploadImgShow = false">
                <van-icon class='img-close-icon' name="clear" size=".5rem"/>
            </div>
        </van-popup>
        <van-popup class='msg-type-picker' v-model="msgTypePicker" position="bottom" :close-on-click-overlay='false'>
            <div class="msg-type-picker-title-box flex-b">
                <div class="msg-type-picker-title-left flex">
                    <van-icon class='msg-type-picker-icon' name="arrow-up" color="#ABB3C2"/>
                    <van-icon class='msg-type-picker-icon' name="arrow-down" color="#ABB3C2"/>
                </div>
                <div class="msg-type-picker-title-right bold" @click='msgTypePicker = false'>完成</div>
            </div>
            <van-picker ref='pickerEl' class='picker-box' :columns="msgTypeArr" @change='msgTypeChange' default-index='2' swipe-duration='400'/>
        </van-popup>
        <div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import axios from "axios";
import {Toast} from 'vant';
export default {
    name:'writeMsg',
    components:{
        HeaderTop,
        // subBtn
    },
    data(){
        return{
            title:'',
            content:'',
            fileList:[],
            showUploadMenu:null,
            showLoading:false,
            subImgArr:[],
            fileData:'',
            uploadImgShow:false,
            imgSrc:'',
            formData:new FormData(),
            imgUrl:'',
            sendImgSrc:'',
            imgList:[],
            showSendMenu:null,
            sendImgShow:false,
            whiteCheck:true,
            msgType:'请选择信件类型',
            msgTypePicker:false,
            msgTypeArr:['充值','提现','优惠','结算','帐号','风控','投诉','建议','爱情'],
            category:'',
        }
    },
    mounted(){
    },
    beforeRouteLeave (to, from, next) {   
      this.$destroy(true)
      next()
    },
    methods: {
        showPicker(){
            this.msgTypePicker = true
            this.$nextTick(()=>{
                document.getElementsByClassName('van-picker__frame')[0].style.border = '#E0E0E0 1px solid'
            })
            this.msgType = '优惠'
            this.category = 'DISCOUNT'
            this.inputCheck()
        },
        msgTypeChange(el,value){
            this.msgType = value
            if(value === '充值'){
                this.category = 'DEPOSIT'
            }else if(value === '提现'){
                this.category = 'WITHDRAW'
            }else if(value === '优惠'){
                this.category = 'DISCOUNT'
            }else if(value === '结算'){
                this.category = 'JIESUAN'
            }else if(value === '帐号'){
                this.category = 'ACCOUNT'
            }else if(value === '风控'){
                this.category = 'RISK'
            }else if(value === '投诉'){
                this.category = 'COMPLAIN'
            }else if(value === '建议'){
                this.category = 'SUGGEST'
            }else if(value === '爱情'){
                this.category = 'LOVE'
            }
            this.inputCheck()
        },
        submit() {
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            this.formData.append('version',this.API.paramVersion)
            this.formData.append('title',this.title)
            this.formData.append('category',this.category)
            this.formData.append('messageInfo',this.content)
            this.showLoading = true
			axios.post(this.API.addMessage,this.formData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        Toast('发送成功')
                        this.title = ""
                        this.content = ""
                        document.getElementById('uploadFile').value = ''
                        this.formData = new FormData()
                        this.fileData = ''
                        this.fileList = []
                        this.subImgArr = []
                        this.whiteCheck = true
                    }else{
                        Toast(res.data.info)
                    }
                } else {
                    Toast('网络错误，请稍后重试')
                }
            })
        },
        showUploadImgPop(value){
            this.uploadImgShow = true
            this.imgSrc = value
        },
        deleteUploadImg(index){
            this.fileList.splice(index,1)
            this.subImgArr.splice(index,1)
            this.formData = new FormData()
            this.subImgArr.forEach(element => {
                this.formData.append('file',element)
            });
            document.getElementById('uploadFile').value = ''
            // console.log(this.formData.getAll('file'))
        },
        fileChange(e){
            this.fileResult = document.getElementById('uploadFile')
            var imgReader = new FileReader()
            var appendImg = document.getElementById('uploadFile').files[0]
            // this.formData.append('file',appendImg)
            let _this = this
            imgReader.readAsDataURL(appendImg)
            imgReader.onload=function (e) {
                _this.fileList.push(this.result)
            }
            _this.subImgArr.push(appendImg)
            _this.formData = new FormData()
            _this.subImgArr.forEach(element => {
                _this.formData.append('file',element)
            });
            // console.log(this.formData.getAll('file'))
            
            _this.fileData = ''
        },
        choseFile(){
            document.getElementById('uploadFile').click()
        },
        inputCheck(){
            if(this.title.length > 0 && this.content.length > 0 && this.category !== '') {
                this.whiteCheck = false
            }else{
                this.whiteCheck = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.write-msg-body{
    .content-box {
        position: relative;
        width: 100%;
        background: #FFFFFF;
        top: .4rem;
        z-index: 2;
        .sms-content {
            .white-msg-box {
                padding-bottom: .6rem;
                .content-title {
                    width: 94%;
                    height: 0.88rem;
                    margin: .08rem auto 0;
                    padding: .15rem .2rem;
                    border-bottom: #f6f8fa 1px solid;
                    background: #F7F6F9;
                    border-radius: .08rem;
                }
                .msg-type-box {
                    width: 94%;
                    height: 0.88rem;
                    margin: .28rem auto 0;
                    padding: .15rem .2rem;
                    border: 1px solid #F4F4F4;
                    border-radius: .06rem;
                    color: #969799;
                    .msg-type-icon {
                        font-size: .3rem;
                        font-weight: bold;
                    }
                }
                .msg-content {
                    width: 94%;
                    background: #F7F6F9;
                    margin: .28rem auto 0;
                    border-radius: .08rem;
                    padding: .15rem .2rem;
                }
                .upload-area-top {
                    width: 94%;
                    margin: .4rem auto 0;
                    display: flex;
                    align-items: flex-start;
                    overflow-x: auto;;
                    .upload-click {
                        border-radius: .08rem;
                        width: 1.6rem;
                        height: 1.6rem;
                        border: #7C8591 1px dashed;
                        color: #3D3737;
                    }
                    .uploaded-list {
                        // width: calc(100% - 1.6rem);
                        margin-left: .2rem;
                        overflow-x: scroll;
                        .uploaded-list-img-box {
                            width: 1.6rem;
                            height: 1.6rem;
                            background: rgba(0,0,0,.2);
                            border-radius: .08rem;
                            position: relative;
                            .uploaded-list-img {
                                width: 1.6rem;
                                max-height: 1.6;
                                border-radius: .1rem;
                            }
                            .upload-menu-box {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                background: rgba(0,0,0,.7);
                                color: #FFFFFF;
                                border-radius: .1rem;
                                display: none;
                                .upload-menu {
                                    height: calc(50% - 1px);
                                }
                                .upload-menu-line {
                                    width: 80%;
                                    height: 2px;
                                    background: #FFFFFF;
                                    margin: 0 auto;
                                }
                            }
                            .upload-menu-activing {
                                display: block;
                            }
                        }
                        .uploaded-list-img-box:not(:last-child) {
                            margin-right: .2rem;
                        }
                    }
                }
                .bottom-btn-box{
                    width: 80%;
                    margin: .8rem auto 0;
                }
            }
        }
    }
}
.check-upload-img-box {
    max-width: 80vw;
    max-height: 78vh;
    overflow: hidden;
    background: none;
    .check-upload-img {
        display: block;
        width: 100%;
        max-height: calc(78vh - 1rem);
        border-radius: .1rem;
    }
    .img-close-box {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #FFFFFF;
        position: relative;
        margin: .2rem auto .4rem;
        z-index: 1;
        .img-close-icon {
            position: relative;
            top: -.06rem;
            left: -.06rem;
            z-index: 2;
        }
    }
}
.msg-type-picker {
    border-radius: .16rem .16rem 0 0;
    
    .msg-type-picker-title-box {
        height: 0.8rem;
        padding: 0 .4rem;
        .msg-type-picker-title-left {
            .msg-type-picker-icon {
                font-size: .42rem;
                // font-weight: bold;
                margin-right: .3rem;
            }
        }
        .msg-type-picker-title-right {
            color: #2976FA;
            font-size: .34rem;
        }
    }
}
</style>
