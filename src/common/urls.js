// const api = "https://www.emc89.cc";
// const api="https://www.emcyyy.com";                                  // 正式环境调试用
// const api = "https://www.emc188.cc/";
// const api = "https://www.emch5.com/";
// const api="http://api.emc188.cc";
const api = "";

var API = {
    logout: api + "/api/website/logout",						    // 退出
    login: api + "/api/website/login",							    // 登录
    loginSms: api + "/api/website/login/sms",						// 登录验证码获取
    login2: api + "/api/website/login2",							// 验证码登录
    loginLog: api + "/api/center/loginLog",							// 登录日志发送
    errorLog: api + "/api/website/log/app",							// 错误日志发送
    errorLog2: api + "/api/website/test",							// 错误日志发送测试
    register: api + "/api/website/register",					    // 注册
    registerCheck: api + "/api/website/registerstep1",			    // 注册名验证
    sendSms: api + '/api/website/sendsms',						    // 短信发送
    sendSmsNewPhone: api + '/api/website/sendsms/new',			    // 短信发送-验证新手机号码
    sendSms2: api + '/api/website/sendsms2',						// 忘记密码第一步短信发送
    centerSendSms: api + '/api/center/sendsms',						// 登录后发送短信
    isLogin: api + '/api/website/loginStatus',					    // 判断登录状态
    checkPhone: api + '/api/website/sendsms',				        // 验证手机
    checkFindMobile: api + '/api/website/checksms',	                // 手机找回密码
    checkFindMobile2: api + '/api/website/checksms2',	            // 忘记密码第一步验证原号码
    checkFindMobile3: api + '/api/member/checksms3',	            // 忘记密码第一步验证原号码v3
    checkFindMobile4: api + '/api/member/checksms4',	            // ‘忘记取现密码’第一步验证原号码v4
    checkUnread: api + '/api/center/message/messageSum',	        // 检查未读站内信
    checkMsg: api + '/api/center/getTopUnread',	                    // 获取新站内信
    singleMsg: api + '/api/center/readSingleMessage',	            // 首页跳转未读站内信后更改状态
    webnotice: api + '/api/website/notice/list',	                // 公告信息
    noticeOne: api + '/api/website/notice/get',	                    // 单条公告信息
    inBox: api + '/api/center/message/inbox',	                    // 站内信收件箱
    outBox: api + '/api/center/message/outbox',	                    // 站内信发件箱
    addMessage: api + '/api/center/message/addMessage',	            // 站内信写信
    findMessage: api + '/api/center/message/findMessage',	        // 站内信单条阅读状态更改
    inBoxDel: api + '/api/center/message/inbox/del',	            // 站内信收件箱删除
    outBoxDel: api + '/api/center/message/outbox/del',	            // 站内信发件箱删除
    changMsgStatus: api + '/api/center/readMessageAll',	            // 站内信全部设为已读
    delMsgInbox: api + '/api/center/message/inbox/delMul',	        // 站内信收件箱批量删除
    delMsgOutbox: api + '/api/center/message/outbox/delMul',	    // 站内信发件箱批量删除
    sysHelp: api + '/api/website/sysHelp',	                        // 新手帮助
    HelpCenter: api + '/api/website/newHelp',	                    // 帮助中心
    howToPlay: api + '/api/website/playhelp/list',	                // 玩法教程
    agentInfo: api + '/api/website/agentInfo',	                    // 代理合作
    shareApp: api + '/api/website/shareapp',	                    // 分享APP

    discount: api + '/api/website/discount/list',	                                        // 优惠列表
    discountType: api + '/api/website/discount/type',	                                    // 优惠类别
    discountOne: api + '/api/website/discount/get',	                                        // 单条优惠信息
    setting: api + '/api/website/setting',	                                                // 获取设置信息
    bannerList: api + '/api/website/banner/list',	                                        // banner 列表
    sponsorship: api + '/api/website/zanzu/list',	                                        // 赞助列表
    homeList: api + '/api/website/home/list',	                                            // 首页游戏列表


    userBalance: api + '/api/member/cash',	                                                // 获取用户钱包余额
    editUserInfo: api + '/api/member/info/edit',	                                        // 修改用户资料
    editCashPassword: api + '/api/member/cashpassword/edit',	                            // 修改取款密码
    editCashPassword2: api + '/api/member/cashpassword/edit2',	                            // 修改取款密码-新
    editCashPassword3: api + '/api/member/cashpassword/edit3',	                            // 修改取款密码-v3
    updatePass: api + '/api/website/password/edit',				                            // 修改登录密码
    updatePass2: api + '/api/website/password/edit2',				                        // 忘记密码第二步修改登录密码
    updatePhone: api + '/api/member/phone/edit',				                            // 修改用户手机号
    updatePhone2: api + '/api/member/phone/edit2',				                            // 修改用户手机号-新
    updatePhone3: api + '/api/member/phone/edit3',				                            // 修改用户手机号-v3
    userInfo: api + '/api/member/info',				                                        // 获取用户资料
    getAvatar: api + '/api/member/getAvatarInfoList',				                        // 获取系统头像
    saveAvatar: api + '/api/member/saveAvatarInfo',				                            // 提交头像更改
    adressSub: api + '/api/member/saveAddress',				                                // 新增、修改收货地址
    userBankList: api + '/api/center/withdraw/get',                                         // 用户取款银行卡信息
    BankList: api + '/api/center/deposit/bank/list',                                        // 网银转账银行卡列表
    addBankList: api + '/api/member/bank/list',                                             // 银行卡管理列表
    delBankList: api + '/api/member/bank/del',                                              // 银行卡管理列表-删除银行卡

    getPayType: api + '/api/pay/channels',                                                  // 获取在线充值

    checkQuickDeposit: api + '/api/deposit/jisu/wait/online',                               // 轮询极速充值订单
    checkQuickWithdraw: api + '/api/withdraw/jisu/wait/online',                             // 轮询极速提现订单
    depositOnlineGet: api + '/api/center/deposit/online/get',                               // 获取在线充值
    getJiSuStatus: api + '/api/deposit/jisu/get',                                           // 获取极速充值状态
    getJiSuStatus2: api + '/api/deposit/jisu/get/v2',                                       // 获取极速充值状态-v2
    getJiSuInfo: api + '/api/deposit/jisu',                                                 // 获取极速充值系统信息
    getJiSuInfo2: api + '/api/deposit/jisu/v2',                                             // 获取极速充值系统信息-v2
    getJiSuUploadStatus: api + '/api/deposit/jisu/check',                                   // 急速存款存款后确认进入下一步
    uploadJiSu: api + '/api/deposit/jisu/upload',                                           // 急速存款上传图片
    delUploadImg: api + '/api/deposit/jisu/img/del',                                        // 急速存款删除图片
    subJiSu: api + '/api/deposit/jisu/confirm',                                             // 急速存款提交确认
    depositOnline: api + '/api/center/deposit/online',                                      // 提交充值
    depositList: api + '/api/center/deposit/list',                                          // 充值列表
    deposit: api + '/api/center/deposit/bank',                                              // 手工充值保存
    withdraw: api + '/api/center/withdraw',                                                 // 提款申请
    depositalipay: api + '/centerjson/depositalipay',                                       // 手工支付宝保存
    sysBankList: api + '/api/center/sysbank/list',                                          // 系统银行卡列表
    addBankData: api + '/api/member/bank/add',                                              // 添加银行卡
    addBankDataOther: api + '/api/member/bank/add/other',                                   // 添加非本人银行卡
    addBankDataOther2: api + '/api/member/bank/add/other2',                                 // 添加非本人银行卡-新
    addBankDataOther3: api + '/api/member/bank/add/other3',                                 // 添加非本人银行卡-v3
    logMoneyChange: api + '/api/history/record/moneychange',		                        // 转账记录
    logDeposit: api + '/api/history/record/deposit',				                        // 充值记录
    logWithdraw: api + '/api/history/record/withdraw',				                        // 提款记录
    bonus: api + '/api/history/record/bonus',				                                // 红利记录
    hongbao: api + '/centerjson/hongbao',				    		                        // 显示红包
    getHB: api + '/api/activity/hongbao/get',				    	                        // 获取红包
    member: api + '/api/center/deposit/member',				    	                        // 会员互转提交
    checkHB: api + '/api/activity/hongbao/check',				    		                // 检查红包--登录后
    checkHB_2: api + '/api/website/hongbao/look',				    		                // 检查红包--未登录
    safeCenterInfo: api + '/api/member/safty',				    		                    // 用户安全中心状态

    getVirtualRate: api + '/api/pay/usdtrate',				    		                    // 用户USDT汇率
    getPayHint: api + '/api/pay/hint',				    		                            // 获取款提示


    bettingRecord: api + '/api/game/total/list',			                                // 投注统计

    interestGet: api + '/api/member/fund/get',                                              // 获取用户余额宝当前信息
    interestCheck: api + '/api/member/fund/check',                                          // 提取余额宝之前检查余额宝账号
    interestList: api + '/api/member/fund/list',                                            // 余额宝列表
    interestDeposit: api + '/api/game/deposit/fund',                                        // 余额宝转入
    interestWithdraw: api + '/api/game/withdraw/fund',                                      // 余额宝转出
    vipList: api + '/api/member/group/list',                                                // VIP等级详情
    vipInfo: api + '/api/member/vip/info',                                                  // VIP当前信息
    vipCashGet: api + '/api/member/cash/vip',                                               // 领取VIP升级奖金
    vipMonthGet: api + '/api/member/cash/month',                                            // 领取每月红包
    vipUpgrade: api + '/api/member/upgrade',                                                // vip手动升级

    sendCode: api + '/createValidateCode?createTypeFlag=n',		                            // 验证码
    sendMail: api + '/api/member/sendemail',		                                        // 发送邮件验证码
    checkMail: api + '/api/member/checkemail',		                                        // 验证邮件验证码

    withdrawChannels: api + '/api/withdraw/channels',		                                // 获取取款通道列表
    memberDigitalInfo: api + '/api/center/withdraw/digital/get',		                    // 获取用户数字货币取款-取款信息
    digitalList: api + '/api/member/digital/list',		                                    // 获取用户数字货币取款卡列表
    digitalType: api + '/api/center/digital/type',		                                    // 获取数字货币类型列表
    subWithdrawDigital: api + '/api/center/withdraw/digital',		                        // 数字货币取款提交
    addDigital: api + '/api/member/digital/add',		                                    // 数字货币绑定

    virtualCoinList: api + '/api/member/virtual/list',		                                // 用户虚拟币帐户列表
    virtualCoinListSys: api + '/api/center/deposit/virtual/list',		                    // 虚拟币ERC20收款帐户列表
    virtualCoinListSysTRC20: api + '/api/center/deposit/virtual/list/trc20',		        // 虚拟币TRC20收款帐户列表
    virtualCoinSms: api + '/api/center/sendsms',		                                    // 添加系统虚拟币-短信验证
    chainList: api + '/api/center/sysvirtual/chain',		                                // 虚拟币货币类型列表
    vitualWithdrawSwitch: api + '/api/withdraw/switch',		                                // 虚拟币取款方式开关
    virtualCoinCategory: api + '/api/center/sysvirtual/currency',		                    // 添加系统虚拟币-种类
    virtualCoinChannel: api + '/api/center/sysvirtual/platform',		                    // 添加系统虚拟币-渠道
    virtualCoinSub: api + '/api/member/virtual/add',		                                // 添加系统虚拟币-提交
    virtualCoinSub2: api + '/api/member/virtual/add2',		                                // 添加系统虚拟币-提交-新
    virtualCoinSub3: api + '/api/member/virtual/add3',		                                // 添加系统虚拟币-提交-v3
    virtualCoinDel: api + '/api/member/virtual/del',		                                // 添加系统虚拟币-删除
    virtualCoinDeposit: api + '/api/center/deposit/virtual',		                        // 虚拟币存款提交
    virtualCoinDepositTrc: api + '/api/center/deposit/virtual/trc20',		                // 虚拟币存款提交
    virtualCoinWithdrawList: api + '/api/center/withdraw/virtual/get',		                // 虚拟币提款列表获取REC
    virtualCoinWithdrawListTrc: api + '/api/center/withdraw/virtual/get/trc20',		        // 虚拟币提款列表获取TEC
    virtualCoinWithdrawSubTrc: api + '/api/center/withdraw/virtual/trc20',		            // 虚拟币提款提交TRC20
    virtualCoinWithdrawSub: api + '/api/center/withdraw/virtual',		                    // 虚拟币提款提交
    virtualCoinHelp: api + '/api/website/virtual/help',		                                // 虚拟币存款教程

    getWithdrawJiSuStatus: api + '/api/withdraw/jisu/get',		                            // 极速提款状态获取
    getWithdrawJiSu: api + '/api/withdraw/jisu',		                                    // 发起极速提款
    WithdrawJiSuCfm: api + '/api/withdraw/jisu/confirm',		                            // 极速提款
    withdrawLogin: api + '/api/withdraw/jisu/wait/login',		                            // 极速提款

    game: api + '/gamejson/game',                                                           // 游戏列表
    gameBalance: api + '/api/game/balance',                                                 // 游戏余额
    gameWithdrawAll: api + '/api/game/withdraw/all',                                        // 一键回收
    quickGameDeposit: api + '/api/game/deposit',                                            // 给游戏上分(一键转入)
    gameDeposit: api + '/api/game/deposit/cash',                                            // 给游戏上分(可填写金额)
    gameList: api + '/api/game/list',                                                       // 游戏列表


    getIp: api + '/api/website/getVisitIp',                                                 // 获取用户ip
    kfMeiqia: 'https://temp-chat.mstatik.com/widget/standalone.html?_=t&eid=128397',        // 美洽
    kfLiveChat: 'https://lc.chat/now/12881772/5',                                           // livechat
    kfLcChat: 'https://direct.lc.chat/12881772/',                                           // lcChat

    discountSub: api + 'json/discount/save',				    		                    // 优惠活动详情页提交
    eurocupList: api + '/api/discount/eurocup/question/list',			                    // 欧洲杯问题
    eurocupBonus: api + '/api/discount/eurocup/bonus',			                            // 欧洲杯竞猜奖金
    eurocupAnswer: api + '/api/discount/eurocup/question/answer',	                        // 欧洲杯竞猜奖金

    inviteInfo: api + '/api/inviter/info',	                                                // 呼朋唤友 获取个人信息
    inviteCodeAdd: api + '/api/inviter/apply/code',	                                        // 呼朋唤友 获取个人信息
    inviteBonusList: api + '/api/inviter/bonus/list',	                                    // 呼朋唤友 邀请礼金列表
    inviteWeekRebateList: api + '/api/inviter/weekBonus/list',	                            // 呼朋唤友 周返水列表
    inviteFriendUpdateList: api + '/api/inviter/upvip/list',	                            // 呼朋唤友 好友升级列表
    inviteFriendLevelUp: api + '/api/inviter/up/vip',	                                    // 呼朋唤友 邀请好友升级vip
    inviteAcceptLevelUp: api + '/api/inviter/accept/up/vip',	                            // 呼朋唤友 谁邀请我-提交申请
    inviteBonusGet: api + '/api/inviter/bonus/get',	                                        // 呼朋唤友 邀请礼金领取
    weeklyBonusGet: api + '/api/inviter/weekBonus/get',	                                    // 呼朋唤友 周返水领取

    discount24data: api + '/api/discount/get',	                                            // 进球红包 红包记录

    getFbNotice: api + '/api/website/notice/fbList',	                                    // 获取FB体育赛事公告
    getMustMsg: api + '/api/center/getTopMustMessage',	                                    // 获取强推站内信
    disableMustMsg: api + '/api/center/stopMustMessage',	                                // 关闭当前强推站内信

    inviteInfo_v2: api + '/v2/api/inviter/info',	                                        // 新版 呼朋唤友 获取个人信息
    inviteBonusList_v2: api + '/v2/api/inviter/bonus/list',	                                // 新版 呼朋唤友 邀请礼金列表
    inviteGetBonus_v2: api + '/v2/api/inviter/bonus/get',	                                // 新版 呼朋唤友 邀请礼金列表-领取
    inviteCodeAdd_v2: api + '/v2/api/inviter/apply/code',	                                // 新版 呼朋唤友 申请邀请码
    weekBonus_v2: api + '/v2/api/inviter/weekrebate/get',	                                // 新版 呼朋唤友 周返水领取
    inviteWorldCupPrize: api + '/json/discount/dis226/save',	                            // 新版 呼朋唤友 领取'世界杯豪礼'

    wordCupHot: api + '/worldcup/index',	                                                // 世界杯热点
    wordCupSponsor: api + '/api/home/zanzu/14',	                                            // 世界杯赞助页
    worldPrizeData: api + '/v2/api/inviter/paoma',	                                        // 世界杯期间跑马灯数据

    getFbToken: api + '/api/game/fb/token',	                                                // 获取FB 体育token    
    getMatchList: api + '/v1/fb/getMatchList',	                                            // 获取FB 比赛信息    
    getStatistical: api + '/v1/fb/matchStatistical',	                                    // 获取FB 赛事统计    
    getBetLine: api + '/v1/fb/batchBetMatchMarketOfJumpLine',	                            // 获取FB 即时赔率信息    
    getMatchDetail: api + '/v1/fb/getMatchDetail',	                                        // 获取FB 单场比赛详情    
    betSingle: api + '/v1/fb/singlePass',	                                                // FB 单注投注、可串关    
    getBetOrderStatus: api + '/v1/fb/getStakeOrderStatus',	                                // FB 获取投注后状态、可批量   
    betMultiSub: api + '/v1/fb/betMultiple',	                                            // FB 串关投注   
    getBetParameter: api + '/v1/fb/getBetParameter',	                                    // FB 获取预约投注限额   
    reserveBet: api + '/v1/fb/reserveBet',	                                                // FB 预约投注提交  


    paramVersion: '4.25.17',                                                                // 版本号
    assetsUrl: '../../../assets/online/',                                                    // 静态资源调用线上模式
    // assetsUrl:'https://www.emc89.cc/assets/online/',                                        // 静态资源调用本地模式

}
module.exports = API;
