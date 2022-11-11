import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routers = new Router({
    base: __dirname,
    routes: [
        // 首页
        {
            path: '/',
            name: 'entertainment',
            component: (resolve) => {
                require(['../pages/home/entertainment'], resolve)
            },
            // meta: {
            //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            // }
        },
        // 娱乐
        // {
        //     path: '/entertainment',
        //     name: 'entertainment',
        //     component: (resolve) => {
        //         require(['../pages/home/entertainment'], resolve)
        //     },
        //     meta: {
        //         requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        //     }
        // },
        // 新手教程
        {
            path: '/newerHelp',
            name: 'newerHelp',
            component: (resolve) => {
                require(['../pages/my/newerHelp'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        // 新手教程详情页
        {
            path: '/newHelpDetail',
            name: 'newHelpDetail',
            component: (resolve) => {
                require(['../pages/my/newHelpDetail'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        // 新手教程-盘口教程
        {
            path: '/newHelpDetailPKJC',
            name: 'newHelpDetailPKJC',
            component: (resolve) => {
                require(['../pages/my/newHelpDetailPKJC'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        // 加入合营
        {
            path: '/joinHY',
            name: 'joinHY',
            component: (resolve) => {
                require(['../pages/my/joinHY'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        // 设备信息
        {
            path: '/deviceInfo',
            name: 'deviceInfo',
            component: (resolve) => {
                require(['../pages/home/deviceInfo'], resolve)
            },
        },
        //游戏模版页
        {
            path: '/gameModel',
            name: 'gameModel',
            component: (resolve) => {
                require(['../pages/home/gameModel'], resolve)
            },
        },
        //游戏模版页2
        {
            path: '/gameModel2',
            name: 'gameModel2',
            component: (resolve) => {
                require(['../pages/home/gameModel2'], resolve)
            },
        },
        //老虎机游戏列表模版页
        {
            path: '/gameModelList',
            name: 'gameModelList',
            component: (resolve) => {
                require(['../pages/home/gameModelList'], resolve)
            },
        },
        //   登录
        {
            path: '/login',
            component: (resolve) => {
                require(['../pages/login/login'], resolve)
            }
        },
        // 登陆验证
        {
            path: '/loginVerify',
            component: (resolve) => {
                require(['../pages/login/loginVerify'], resolve)
            }
        },
        //   注册
        {
            path: '/register',
            component: (resolve) => {
                require(['../pages/register/register'], resolve)
            }
        },
        //   注册step2
        {
            path: '/registerStep2',
            component: (resolve) => {
                require(['../pages/register/registerStep2'], resolve)
            }
        },
        //   赞助和红包
        {
            path: '/sponsorship',
            component: (resolve) => {
                require(['../pages/homePages/sponsorship'], resolve)
            }
        },
        //   新赞助和红包
        {
            path: '/sponsorShip-new',
            component: (resolve) => {
                require(['../pages/home/sponsorShip-new'], resolve)
            }
        },
        //   主页-赞助详情
        {
            path: '/sponsorshipOne/',
            name: 'sponsorshipOne',
            component: (resolve) => {
                require(['../pages/homePages/sponsorshipOne'], resolve)
            }
        },
        //   交易记录
        {
            path: '/tradeRecords',
            component: (resolve) => {
                require(['../pages/homePages/tradeRecords'], resolve)
            }
        },
        //   转账
        {
            path: '/transferAccounts',
            component: (resolve) => {
                require(['../pages/homePages/transferAccounts'], resolve)
            }
        },
        //   余额宝-首页
        {
            path: '/interestDetail',
            component: (resolve) => {
                require(['../pages/my/interestDetail'], resolve)
            }
        },
        //   余额宝-充值
        {
            path: '/interestRecharge',
            component: (resolve) => {
                require(['../pages/my/interestRecharge'], resolve)
            }
        },
        //   余额宝-列表
        {
            path: '/interestList',
            component: (resolve) => {
                require(['../pages/my/interestList'], resolve)
            }
        },
        //   余额宝-说明
        {
            path: '/interestInto',
            component: (resolve) => {
                require(['../pages/my/interestInto'], resolve)
            }
        },
        //   充值页面
        {
            path: '/pay',
            component: (resolve) => {
                require(['../pages/pay/index'], resolve)
            }
        },
        // 充值-虚拟币ERC20
        {
            path: '/virtualCoinRecharge',
            component: (resolve) => {
                require(['../pages/my/virtualCoinRecharge'], resolve)
            }
        },
        // 充值-虚拟币TRC20
        {
            path: '/virtualCoinRechargeTrc20',
            component: (resolve) => {
                require(['../pages/my/virtualCoinRechargeTrc20'], resolve)
            }
        },
        //   充值-网银转账充值
        {
            path: '/transfer',
            component: (resolve) => {
                require(['../pages/pay/transfer'], resolve)
            }
        },
        //   充值-online
        {
            path: '/quickDeposit',
            component: (resolve) => {
                require(['../pages/pay/quickDeposit'], resolve)
            }
        },
        //   新版充值
        {
            path: '/pay_index',
            component: (resolve) => {
                require(['../pages/pay/pay_index'], resolve)
            }
        },
        //   通用iframe页
        {
            path: '/iframeModel',
            component: (resolve) => {
                require(['../pages/pay/iframeModel'], resolve)
            }
        },
        //   提现
        {
            path: '/extract',
            component: (resolve) => {
                require(['../pages/homePages/extract'], resolve)
            }
        },
        //   添加银行卡
        {
            path: '/addbankCard',
            component: (resolve) => {
                require(['../pages/homePages/addbankCard'], resolve)
            }
        },
        // 主页-添加非本人银行卡
        {
            path: '/addbankCardOther',
            component: (resolve) => {
                require(['../pages/my/addbankCardOther'], resolve)
            }
        },
        // 主页-添加数字货币
        {
            path: '/addDigital',
            component: (resolve) => {
                require(['../pages/my/addDigital'], resolve)
            }
        },
        // 添加虚拟币账户
        {
            path: '/addVirtualCoinAccount',
            component: (resolve) => {
                require(['../pages/my/addVirtualCoinAccount'], resolve)
            }
        },
        //   主页-优惠活动
        {
            path: '/discountActive',
            component: (resolve) => {
                require(['../pages/homePages/discountActive'], resolve)
            }
        },
        //    VIP详情
        {
            path: '/vipDetail',
            component: (resolve) => {
                require(['../pages/my/vipDetail'], resolve)
            }
        },
        //    VIP会员
        {
            path: '/vipMember',
            component: (resolve) => {
                require(['../pages/my/vipMember'], resolve)
            }
        },
        // 主页-优惠活动详情
        {
            path: '/discountOne/:id',
            name: 'discountOne',
            component: (resolve) => {
                require(['../pages/homePages/discountOne'], resolve)
            }
        },
        // 优惠活动详情--‘进球红包’
        {
            path: '/discountDetail24',
            name: 'discountDetail24',
            component: (resolve) => {
                require(['../pages/homePages/discountDetail24'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        // 优惠活动详情--‘余额宝’
        {
            path: '/discountDetail130',
            name: 'discountDetail130',
            component: (resolve) => {
                require(['../pages/homePages/discountDetail130'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        //   我的
        {
            path: '/my',
            name: 'my',
            component: (resolve) => {
                require(['../pages/my/my'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        //   安全中心
        {
            path: '/safeCenter',
            name: 'safeCenter',
            component: (resolve) => {
                require(['../pages/my/safeCenter'], resolve)
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        //   改绑邮箱(验证旧邮箱)
        {
            path: '/userEmail',
            component: (resolve) => {
                require(['../pages/userInfo/userEmail'], resolve)
            }
        },
        //   生日
        {
            path: '/birthday',
            component: (resolve) => {
                require(['../pages/userInfo/birthday'], resolve)
            }
        },
        //   改绑邮箱2(设置新邮箱)
        {
            path: '/reviseMail2',
            component: (resolve) => {
                require(['../pages/my/reviseMail2'], resolve)
            }
        },
        //   我的-收货地址(设置新地址)
        {
            path: '/adressPage',
            component: (resolve) => {
                require(['../pages/my/adressPage'], resolve)
            }
        },
        //   我的-投注记录
        {
            path: '/bettingRecord',
            component: (resolve) => {
                require(['../pages/homePages/bettingRecord'], resolve)
            }
        },
        //   管理银行卡
        {
            path: '/addBank',
            component: (resolve) => {
                require(['../pages/my/addBank'], resolve)
            }
        },
        //   账户密码修改
        {
            path: '/accountPassword',
            component: (resolve) => {
                require(['../pages/my/accountPassword'], resolve)
            }
        },
        //   联系客服
        {
            path: '/help',
            component: (resolve) => {
                require(['../pages/my/help'], resolve)
            }
        },
        //   联系客服-未登录状态
        {
            path: '/help2',
            component: (resolve) => {
                require(['../pages/my/help2'], resolve)
            }
        },
        //   会员互转
        {
            path: '/membertransfer',
            component: (resolve) => {
                require(['../pages/homePages/membertransfer'], resolve)
            }
        },
        //   游戏钱包
        {
            path: '/gameBalance',
            component: (resolve) => {
                require(['../pages/my/gameBalance'], resolve)
            }
        },
        //   密码-手机找回密码
        {
            path: '/phonePassword',
            component: (resolve) => {
                require(['../pages/password/phonePassword'], resolve)
            }
        },
        //   密码-手机找回密码,密码设置
        {
            path: '/phonePasswordSet',
            component: (resolve) => {
                require(['../pages/password/phonePasswordSet'], resolve)
            }
        },
        //   取款密码修改
        {
            path: '/cashPhonePassword',
            component: (resolve) => {
                require(['../pages/password/cashPhonePassword'], resolve)
            }
        },
        //   忘记取款密码
        {
            path: '/forgetCashPassword',
            component: (resolve) => {
                require(['../pages/password/forgetCashPassword'], resolve)
            }
        },
        //   取款密码修改确认
        {
            path: '/cashPhonePasswordSet',
            component: (resolve) => {
                require(['../pages/password/cashPhonePasswordSet'], resolve)
            }
        },
        //   个人信息
        {
            path: '/userInfo',
            component: (resolve) => {
                require(['../pages/userInfo/userInfo'], resolve)
            }
        },
        //   修改手机号码
        {
            path: '/userPhone',
            component: (resolve) => {
                require(['../pages/userInfo/userPhone'], resolve)
            }
        },
        //   修改手机-新号码确认
        {
            path: '/userPhoneSet',
            component: (resolve) => {
                require(['../pages/userInfo/userPhoneSet'], resolve)
            }
        },
        //   我的资料-修改昵称
        {
            path: '/userNickname',
            component: (resolve) => {
                require(['../pages/userInfo/userNickname'], resolve)
            }
        },
        //   我的资料-修改微信
        {
            path: '/userWeixin',
            component: (resolve) => {
                require(['../pages/userInfo/userWeixin'], resolve)
            }
        },
        //   我的资料-修改qq
        {
            path: '/userQq',
            component: (resolve) => {
                require(['../pages/userInfo/userQq'], resolve)
            }
        },

        //   我的资料-修改性别
        {
            path: '/userSex',
            component: (resolve) => {
                require(['../pages/userInfo/userSex'], resolve)
            }
        },
        //   我的消息
        {
            path: '/notice/:tabNum',
            name: 'notice',
            component: (resolve) => {
                require(['../pages/my/notice'], resolve)
            },
        },
        //   写站内信
        {
            path: '/writeMsg',
            name: 'writeMsg',
            component: (resolve) => {
                require(['../pages/my/writeMsg'], resolve)
            },
        },
        //   APP分享
        {
            path: '/appDownload',
            name: 'appDownload',
            component: (resolve) => {
                require(['../pages/my/appDownload'], resolve)
            }
        },
        //   欧洲杯竞猜
        {
            path: '/EuroCup',
            name: 'EuroCup',
            component: (resolve) => {
                require(['../pages/homePages/EuroCup'], resolve)
            }
        },
        //   呼朋唤友活动
        {
            path: '/inviteFriends',
            name: 'inviteFriends',
            component: (resolve) => {
                require(['../pages/homePages/inviteFriends'], resolve)
            }
        },
        //   呼朋唤友活动-个人专属
        {
            path: '/inviteFriendsUser',
            name: 'inviteFriendsUser',
            component: (resolve) => {
                require(['../pages/homePages/inviteFriendsUser'], resolve)
            }
        },
        //   呼朋唤友活动-邀请记录
        {
            path: '/inviteFriendsRecord',
            name: 'inviteFriendsRecord',
            component: (resolve) => {
                require(['../pages/homePages/inviteFriendsRecord'], resolve)
            }
        },
        //   呼朋唤友活动-好友升级记录
        {
            path: '/inviteFriendsUpdateRecord',
            name: 'inviteFriendsUpdateRecord',
            component: (resolve) => {
                require(['../pages/homePages/inviteFriendsUpdateRecord'], resolve)
            }
        },
        //  彩金日历
        {
            path: '/calendarPrize',
            name: 'calendarPrize',
            component: (resolve) => {
                require(['../pages/homePages/calendarPrize'], resolve)
            }
        },
        //   世界杯活动
        {
            path: '/worldCup',
            name: 'worldCup',
            component: (resolve) => {
                require(['../pages/homePages/worldCup'], resolve)
            }
        },
        //   世界杯-塞尔维亚赞助页
        {
            path: '/sponsorshipOne_worldcup',
            name: 'sponsorshipOne_worldcup',
            component: (resolve) => {
                require(['../pages/homePages/sponsorshipOne_worldcup'], resolve)
            }
        },
        //   世界杯热点
        {
            path: '/worldCupHot',
            name: 'worldCupHot',
            component: (resolve) => {
                require(['../pages/homePages/worldCupHot'], resolve)
            }
        },
        //   全屏iframe
        {
            path: '/urlIframe',
            name: 'urlIframe',
            component: (resolve) => {
                require(['../pages/homePages/urlIframe'], resolve)
            }
        },
        //   串关投注
        {
            path: '/multiBet',
            name: 'multiBet',
            component: (resolve) => {
                require(['../pages/home/multiBet'], resolve)
            }
        },
        //   注单记录
        {
            path: '/betOrders',
            name: 'betOrders',
            component: (resolve) => {
                require(['../pages/home/betOrders'], resolve)
            }
        },
        //   赛事详情
        {
            path: '/matchDetail',
            name: 'matchDetail',
            component: (resolve) => {
                require(['../pages/home/matchDetail'], resolve)
            }
        },
        //   搜索
        {
            path: '/searchMatch',
            name: 'searchMatch',
            component: (resolve) => {
                require(['../pages/home/searchMatch'], resolve)
            }
        },
    ]
});
routers.beforeEach((to, from, next) => {
    // console.log('to', to)
    // console.log('from', from)
    // console.log('store', routers.app.$store)
    //处理tabbar是否显示
    function changedTabbar(to, store) {
        if (to.path == '/' ||
            to.path == '/sponsorShip-new' ||
            to.path == '/betOrders' ||
            to.path == '/help' ||
            to.path == '/my') {
            store.dispatch('changeNavigator', {
                isShow: true
            });
        } 
        // else if (to.path == '/login' || to.path == '/register' || to.path == '/registerStep2' || to.path == '/phonePassword') {
        //     store.dispatch('changeNavigator', {
        //         isShow: false
        //     });
        // } 
        else {
            store.dispatch('changeNavigator', {
                isShow: false
            });
        }
    }

    //处理动画
    function changedPageAnimation(to, store) {

    // 滚动条位置初始化
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // 滚动条位置兼容IE处理
    window.scrollTo(0, 0);

        if (store.state.common.backMark == true) {
            store.dispatch("setPageAnimation", {
                enter: 'page-animated fadeInLeft',
                leave: 'page-animated fadeOutRight'
            });
            store.dispatch("setBackMark", false);
        } else {
            if (
                to.path == '/my' ||
                to.path == '/help' ||
                to.path == '/' ||
                to.path == '/betOrders' ||
                to.path == '/sponsorShip-new'
                ) {
                store.dispatch("setPageAnimation", {
                    enter: '',
                    leave: ''
                });
            } else {
                store.dispatch("setPageAnimation", {
                    enter: 'page-animated fadeInRight',
                    leave: 'page-animated fadeOutLeft'
                });
            }
        }
    }

    var store = routers.app.$store;
    if (typeof store === 'undefined') {

    } else {
        changedTabbar(to, store);
        changedPageAnimation(to, store);
    }
//		console.log("beforeEach to", to);
//		console.log("beforeEach from", from);
//		console.log("beforeEach next", next);
//    	console.log("login_flag next", window.localStorage.getItem('login_flag'));
    if (window.localStorage.getItem('login_flag') == 'true') {
        // if (window.sessionStorage.getItem('login_flag') == 'true') {
        next();
    } else {
        //这里是未登录
        //再判断哪些页面不需要跳转登录
        //  页面属于特殊处理
        if (to.path == '/login' || to.path == '/' || to.path == '/help' || to.path == '/sponsorShip-new' || to.path == '/sponsorshipOne' || to.path == '/register' || to.path == '/registerStep2' || to.path == '/phonePassword' || to.path == '/phonePasswordSet' || to.path == '/help2' || to.path == '/deviceInfo' || to.path == '/loginVerify') {
            // "不需要登录的页面"
            next();
        } else {
            // 需要等路页面
            // next({path: '/login', query: {toPage: to.path}});
        }
    }
});


export default routers
