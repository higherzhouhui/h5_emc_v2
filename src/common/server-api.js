'use strict'
var axios = require('axios')
var qs = require('qs')
var stringify = require('json-stable-stringify');
var API = require('./urls')
var ServerAPI = {
    // POST请求
    postAPI: function (url, body, callback) {
        axios.defaults.timeout = 10000
        let confing = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 10000,
            withCredentials: true
        }
        axios.post(url, qs.stringify(body), confing).then(res => {
            if (res.status == '200') {
                callback(true, res.data)
            } else {
                callback(false, res.data)
            }
            /*
            注意callback是自己写的方法，只是拿res.data做页面处理，
            里面的第一个参数是是我自己写的方法做了判断的，只是作为参考，
            其他的根据需求定义自己的回调函数
             */
        }).catch(res => {
            callback(false, res)
            let postInfo = stringify(body)
            let loginName = ''
            if (sessionStorage.getItem('userName')) {
                loginName = sessionStorage.getItem('userName')
            } else {
                loginName = 'Not Login'
            }
            let getErrTime = new Date()
            let errorTime = getErrTime.toLocaleDateString().replace(/\//g, "-") + " " + getErrTime.toTimeString().substr(0, 8)
            let errorInfo = res + ' / Time:' + errorTime
            let errorParams = {
                ip: sessionStorage.getItem('loginIP'),
                info: errorInfo,
                appType: '全站H5',
                loginName: loginName,
                url: url,
                postInfo: postInfo,
                phoneType: 'H5',
                phoneVersion: sessionStorage.getItem('mobileModel'),
            }
            var domain = url.split("/"); //以“/”进行分割
            // var domain1 = domain[2]
            // var domain2 = ''
            // domain.forEach((item,index)=>{
            //     if(index > 2){
            //         domain2 += '/' + item
            //     }
            // })
            // domain2 = domain2.slice(1)

            if (domain[2]) {
                domain = domain[2];
            } else {
                domain = ''; //如果url不正确就取空
            }
            // console.log(domain)
            axios.post('/api/website/log/app', qs.stringify(errorParams), confing).then(res => {
                if (res.status == '200') {
                }
            })
        })
    }
}


module.exports = ServerAPI
