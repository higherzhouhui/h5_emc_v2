<template>
    <div class="euro-cup-content" ref="pageScrollValue" :class="{'has-bottom-nav':isWordCup === true}">
        <div class="top-arrow el-icon-arrow-left" @click="toBack()"></div>
        <img :src="API.assetsUrl + 'word-cup/top-banner-218.webp'" alt="" class="top-img">
        <div class="tab-box">
            <div class="tab-top">
                <div class="tab-top-left">
                    <!-- <div class="tab-top-list" :class="topTab === 1?'tab-top-list-active':''" @click="topTabSwitch(1)"> -->
                    <div class="tab-top-list" :class="topTab === 1?'tab-top-list-active':''" :style="topTab === 1?'background:url(' + API.assetsUrl + 'word-cup/top-nav-bg.png) -0.1rem -.0rem / 108% 108%;':''" @click="topTabSwitch(1)">
                        <div class="line1">小组赛</div>
                        <div class="line2">11/21-12/03</div>
                    </div>
                    <div class="tab-top-list" :class="topTab === 2?'tab-top-list-active':''" :style="topTab === 2?'background:url(' + API.assetsUrl + 'word-cup/top-nav-bg.png) -0.1rem -.0rem / 108% 108%;':''" @click="topTabSwitch(2)">
                        <div class="line1">淘汰赛</div>
                        <div class="line2">12/03-12/18</div>
                    </div>
                </div>
                <img :src="API.assetsUrl + 'word-cup/top-nav-line.png?v=0.1'" alt="" class="top-nav-line">
                <div class="tab-top-right flex-c">
                    <div class="tab-top-list2" @click="pageScroll(1)">竞猜奖金</div>
                    <div class="tab-top-list2-line"></div>
                    <div class="tab-top-list2" @click="pageScroll(2)">竞猜规则</div>
                </div>
            </div>
            <div class="tab-bottom" ref="scrollValue">
                <div class="tab-bottom-list-box" id="scrollBox_1" v-if="topTab === 1">
                    <div class="tab-bottom-list" id="scrollLeft11" :class="bottomTab === 21?'tab-bottom-list-active':''" @click="bottomTabSwitch(21,11,1)">11/21</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft13" :class="bottomTab === 22?'tab-bottom-list-active':''" @click="bottomTabSwitch(22,11,1)">11/22</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft14" :class="bottomTab === 23?'tab-bottom-list-active':''" @click="bottomTabSwitch(23,11,1)">11/23</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft15" :class="bottomTab === 24?'tab-bottom-list-active':''" @click="bottomTabSwitch(24,11,1)">11/24</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft16" :class="bottomTab === 25?'tab-bottom-list-active':''" @click="bottomTabSwitch(25,11,1)">11/25</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft17" :class="bottomTab === 26?'tab-bottom-list-active':''" @click="bottomTabSwitch(26,11,1)">11/26</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft18" :class="bottomTab === 27?'tab-bottom-list-active':''" @click="bottomTabSwitch(27,11,1)">11/27</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft19" :class="bottomTab === 28?'tab-bottom-list-active':''" @click="bottomTabSwitch(28,11,1)">11/28</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft20" :class="bottomTab === 29?'tab-bottom-list-active':''" @click="bottomTabSwitch(29,11,1)">11/29</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft21" :class="bottomTab === 30?'tab-bottom-list-active':''" @click="bottomTabSwitch(30,11,1)">11/30</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft22" :class="bottomTab === 1?'tab-bottom-list-active':''" @click="bottomTabSwitch(1,12,1)">12/01</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft23" :class="bottomTab === 2?'tab-bottom-list-active':''" @click="bottomTabSwitch(2,12,1)">12/02</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft24" :class="bottomTab === 3?'tab-bottom-list-active':''" @click="bottomTabSwitch(3,12,1)">12/03</div>
                </div>
                <div class="tab-bottom-list-box" id="scrollBox_2" v-if="topTab === 2">
                    <div class="tab-bottom-list" id="scrollLeft27" :class="bottomTab === 3.2?'tab-bottom-list-active':''" @click="bottomTabSwitch(3,12,2)">12/03</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft28" :class="bottomTab === 4?'tab-bottom-list-active':''" @click="bottomTabSwitch(4,12,2)">12/04</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft29" :class="bottomTab === 5?'tab-bottom-list-active':''" @click="bottomTabSwitch(5,12,2)">12/05</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft30" :class="bottomTab === 6?'tab-bottom-list-active':''" @click="bottomTabSwitch(6,12,2)">12/06</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft30" :class="bottomTab === 7?'tab-bottom-list-active':''" @click="bottomTabSwitch(7,12,2)">12/07</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft3" :class="bottomTab === 9?'tab-bottom-list-active':''" @click="bottomTabSwitch(9,12,2)">12/09</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft4" :class="bottomTab === 10?'tab-bottom-list-active':''" @click="bottomTabSwitch(10,12,2)">12/10</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft7" :class="bottomTab === 11?'tab-bottom-list-active':''" @click="bottomTabSwitch(11,12,2)">12/11</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft8" :class="bottomTab === 14?'tab-bottom-list-active':''" @click="bottomTabSwitch(14,12,2)">12/14</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft8" :class="bottomTab === 15?'tab-bottom-list-active':''" @click="bottomTabSwitch(15,12,2)">12/15</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft12" :class="bottomTab === 17?'tab-bottom-list-active':''" @click="bottomTabSwitch(17,12,2)">12/17</div>
                    <img :src="API.assetsUrl + 'word-cup/top-nav-match-line.png?v=0.1'" alt="" class="match-list-line">
                    <div class="tab-bottom-list" id="scrollLeft12" :class="bottomTab === 18?'tab-bottom-list-active':''" @click="bottomTabSwitch(18,12,2)">12/18</div>
                </div>
            </div>
        </div>
        <div class="match-content">
            <!-- <img :src="API.assetsUrl + 'word-cup/question-title-1.png'" alt="" class="match-content-title"> -->
            <!-- <lottie class="" style='width:92%;height:unset;' :options="defaultOptions" v-on:animCreated="handleAnimation"/> -->
            <div class="match-content-title-box flex">
                <div class="match-content-title-line"></div>
                <div class="match-content-title-fonts bold">竞猜题目</div>
                <div class="match-content-title-time" v-if="matchBegin">本场截止时间:{{questionTime}}</div>
            </div>
            <div class="match-content-list" v-for="(item,index) in matchData" :key="index" v-if="matchBegin">
                <div class="match-content-list-title">
                    <div class="title-right flex-b">
                        <div class="title-right-top flex">
                            <img :src="API.assetsUrl + 'word-cup/question-left-num-' + (index + 1) + '.png'" alt="" class="question-title-left">
                            {{item.question}}
                        </div>
                        <!-- <div class="title-right-bottom">{{item.begin.slice(5,-3)}}</div> -->
                    </div>
                </div>
                <div class="match-content-list-team">
                    <div class="team-side" :class="[item.answerUser === 'A' && item.type === 0?'dark-gray-bg':'',item.answerUser === 'A' && item.type === 2?'answer-chosed':'',item.type === 0?'gray-bg':'',item.type === 3 && item.answerUser === 'A'?'dark-gray-bg':'',item.type === 3 && item.answerUser === 'B'?'gray-bg':'',item.type === 4 && item.answerUser === 'A'?'dark-gray-bg':'',item.type === 4 && item.answerUser === 'B'?'gray-bg':'']">
                        <img :src="item.homeLogo" alt="" class="team-icon" v-if="item.selectHasLogo === true" :onerror='logoError'>
                        <div class="team-name" v-if="item.type === 1" :class="item.selectHasLogo === false?'team-name-center':''" @click="chosingSub(item.selectA,item.id,'A')">{{item.selectA}}</div>
                        <div class="team-name" v-if="item.type === 2" :class="item.selectHasLogo === false?'team-name-center':''" @click="showSubAlert">{{item.selectA}}</div>
                        <div class="team-name" v-if="item.type !== 1 && item.type !== 2" :class="[item.selectHasLogo === false?'team-name-center':'']">{{item.selectA}}</div>
                        <img :src="API.assetsUrl + 'word-cup/answer-result-right.webp?v=0.1'" v-if="item.answerUser === 'A' && item.type === 3" alt="" class="win-lose">
                        <img :src="API.assetsUrl + 'word-cup/answer-result-wrong.webp?v=0.1'" v-if="item.answerUser === 'A' && item.type === 4" alt="" class="win-lose">
                    </div>
                    <div class="team-side" :class="[item.answerUser === 'B' && item.type === 0?'dark-gray-bg':'',item.answerUser === 'B' && item.type === 2?'answer-chosed':'',item.type === 0?'gray-bg':'',item.type === 3 && item.answerUser === 'B'?'dark-gray-bg':'',item.type === 3 && item.answerUser === 'A'?'gray-bg':'',item.type === 4 && item.answerUser === 'B'?'dark-gray-bg':'',item.type === 4 && item.answerUser === 'A'?'gray-bg':'']">
                        <div class="team-name" v-if="item.type === 1" :class="item.selectHasLogo === false?'team-name-center':''" @click="chosingSub(item.selectB,item.id,'B')">{{item.selectB}}</div>
                        <div class="team-name" v-if="item.type === 2" :class="item.selectHasLogo === false?'team-name-center':''" @click="showSubAlert">{{item.selectB}}</div>
                        <div class="team-name" v-if="item.type !== 1 && item.type !== 2" :class="[item.selectHasLogo === false?'team-name-center':'']">{{item.selectB}}</div>
                        <img :src="item.awayLogo" alt="" class="team-icon" v-if="item.selectHasLogo === true" :onerror='logoError'>
                        <img :src="API.assetsUrl + 'word-cup/answer-result-right.webp?v=0.1'" v-if="item.answerUser === 'B' && item.type === 3" alt="" class="win-lose win-lose2">
                        <img :src="API.assetsUrl + 'word-cup/answer-result-wrong.webp?v=0.1'" v-if="item.answerUser === 'B' && item.type === 4" alt="" class="win-lose win-lose2">
                    </div>
                </div>
            </div>
            <div class="match-watting" v-if="!matchBegin">
                <div class="begin-date flex-c">2022年11月20日～12月18日</div>
                <img :src="API.assetsUrl + 'word-cup/word-cup-name.png?v=0.1'" alt="" class="match-name">
                <div class="match-watting-bg" :style="'background:url(' + API.assetsUrl + 'word-cup/question-date-bg.webp) 0 0 / 100% 100% no-repeat;'">
                    <img :src="API.assetsUrl + 'word-cup/match-watting-title.webp'" alt="" class="match-watting-title">
                    <div class="time-show flex-c">
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{days_1}}</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{days_2}}</div>
                        <div class="fonts">天</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{hours_1}}</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{hours_2}}</div>
                        <div class="fonts">时</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{minutes_1}}</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{minutes_2}}</div>
                        <div class="fonts">分</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{seconds_1}}</div>
                        <div class="number bold flex-c" :style="'background:url(' + API.assetsUrl + 'word-cup/question-unit-bg.png?v=0.1) 0 0 / 100% 100% no-repeat;'">{{seconds_2}}</div>
                        <div class="fonts">秒</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="match-content" id="content2">
            <!-- <img :src="API.assetsUrl + 'word-cup/question-title-2.png'" alt="" class="match-content-title"> -->
            <!-- <lottie class="" style='width:92%;height:unset;' :options="defaultOptions2" v-on:animCreated="handleAnimation"/> -->
            <div class="match-content-title-box flex">
                <div class="match-content-title-line"></div>
                <div class="match-content-title-fonts bold">竞猜奖金</div>
            </div>
            <div class="update-fonts" v-if="showUpdate === true">更新于 {{updateTime}}</div>
            <div class="result-area">
                <div class="result-area-line1 bold flex-c">今日奖金</div>
                <div class="result-area-line2 bold flex-c">¥{{bonusTotal}}</div>
                <div class="result-area-line3">
                    <div class="result-area-fonts">{{numTotal}}人</div>
                    <div class="result-area-fonts">
                        ￥{{betTotal}}
                        <img :src="API.assetsUrl + 'word-cup/question-more-icon.png'" alt="" class="more-icon" @click="rulesPopup2 = true">
                    </div>
                </div>
            </div>
            <div class="result-area2">
                <div class="result-area2-list-box">
                    <div class="result-area2-list">
                        <div class="result-area2-list-top bold">
                            个人投注金额(￥)
                            <img :src="API.assetsUrl + 'word-cup/question-more-icon.png'" alt="" class="more-icon" @click="rulesPopup = true">
                        </div>
                        <div class="result-area2-list-bottom">{{betMe}}</div>
                    </div>
                    <div class="result-area2-list">
                        <div class="result-area2-list-top bold">
                            个人中奖金额(￥)
                            <img :src="API.assetsUrl + 'word-cup/question-more-icon.png'" alt="" class="more-icon" @click="rulesPopup3 = true">
                            <div class="status-fonts" v-if="prizeStatus === 2">已派发</div>
                            <div class="status-fonts status-fonts2" v-if="prizeStatus === 0">未开奖</div>
                            <div class="status-fonts status-fonts2" v-if="prizeStatus === 3">未参与</div>
                            <div class="status-fonts status-fonts3" v-if="prizeStatus === 1">未中奖</div>
                        </div>
                        <div class="result-area2-list-bottom">{{bonusMe}}</div>
                    </div>
                </div>
                <div class="result-area2-list-box">
                    <div class="result-area2-list">
                        <div class="result-area2-list-top  ">
                            中奖人数(人)
                        </div>
                        <div class="result-area2-list-bottom">{{numBonus}}</div>
                    </div>
                    <div class="result-area2-list">
                        <div class="result-area2-list-top bold">
                            中奖总投注额(￥)
                        </div>
                        <div class="result-area2-list-bottom">{{betOver}}</div>
                    </div>
                </div>
            </div>
            <img :src="API.assetsUrl + 'word-cup/question-fonts-img.png'" alt="" class="logo-fonts-img">
        </div>
        <div class="match-content match-content3">
            <div class="match-content-title-box flex">
                <div class="match-content-title-line"></div>
                <div class="match-content-title-fonts bold">竞猜排行</div>
            </div>
            <!-- <img :src="API.assetsUrl + 'word-cup/question-title-3.png'" alt="" class="match-content-title"> -->
            <!-- <lottie class="" style='width:92%;height:unset;' :options="defaultOptions3" v-on:animCreated="handleAnimation"/> -->
            <div class="table-list-box" id='scrollBox'>
                <div class="prize-results-scroll">
                    <div class="scroll-list-box">
                    </div>
                </div>
            </div>
        </div>
        <div class="match-content match-content4" id="content4">
            <div class="match-content-title-box flex">
                <div class="match-content-title-line"></div>
                <div class="match-content-title-fonts bold">竞猜规则</div>
            </div>
            <!-- <img :src="API.assetsUrl + 'word-cup/question-title-4.png'" alt="" class="match-content-title"> -->
            <!-- <lottie class="" style='width:92%;height:unset;' :options="defaultOptions4" v-on:animCreated="handleAnimation"/> -->
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">1</div>
                </div> -->
                1.当日三题竞猜全中者才可依照投注金额瓜分当日100万奖金。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">2</div>
                </div> -->
                2.本活动彩金仅限体育投注，一倍流水出款。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">3</div>
                </div> -->
                3.奖池只计算体育场馆及冠军盘赔率香港盘≥0.5（欧洲盘≥1.5）的世界杯赛事有效投注额。每累积一位会员参加本活动，系统将统计该会员当日世界杯投注额至奖金池。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">4</div>
                </div> -->
                4.彩金计算：个人中奖金额=个人投注金额/中奖者在体育场馆世界杯赛事总投注额*100万。不包含虚拟体育内投注。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">5</div>
                </div> -->
                5.彩金申请：无需申请，竞猜彩金将于竞猜赛事结束后次日中午12:00陆续结算并自动派发。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">6</div>
                </div> -->
                6.竞猜后不可更改竞猜答案，竞猜赛事开赛后关闭本场赛事竞猜。竞猜全场不计算加时及点球大战。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">7</div>
                </div> -->
                7.会员在此优惠活动未完成有效流水前，转账到其他平台，将扣除所有彩金及其盈利。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">8</div>
                </div> -->
                8.参与该活动会员必须接受及遵循上述规则与条款，并接受EMC易倍使用的红利优惠一般相关规则与条款。
            </div>
            <div class="rules-content-list flex">
                <!-- <div class="fonts-left-bg flex-c">
                    <div class="fonts-left-num flex-c">9</div>
                </div> -->
                9.EMC易倍保留对此活动做出更改、终止的权利，并享有最终解释权。
            </div>
        </div>
        <img :src="API.assetsUrl + 'word-cup/to-top.png'" alt="" class="euro-cup-toTop" v-if="showTop" @click="toTop">
        <div class="word-cup-nav flex-b" v-if='isWordCup'>
            <div class="nav-list nav-list2 flex-c" @click="bottomFn('216',1)">比赛日签到</div>
            <div class="nav-line"></div>
            <div class="nav-list nav-list-chosed flex-c">2400万</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('220',1)">天天送</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('224',1)">新兵球衣</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('inviteFriends',2)">邀请豪礼</div>
        </div>
        <van-popup v-model="subPopup" class="sub-popup">
            <div class="popup-content">
                <img :src="API.assetsUrl + 'word-cup/sub-pop-img.png'" alt="" class="pop-top-img">
                <img :src="API.assetsUrl + 'word-cup/question-fonts-img.png'" alt="" class="pop-top-logo">
                <div class="popup-content-line1 bold">
                    <div class="">您选择</div>
                    <div class="chosed-fonts single-line">{{chosingValue}}</div> 
                    <div class="">是否确认?</div>
                </div>
                <div class="popup-content-line2 bold">※确认后不得更改</div>
            </div>
            <div class="pop-confirm flex-c" @click="subJoin()">确定</div>
            <img :src="API.assetsUrl + 'word-cup/sub-pop-close.png'" alt="" class="pop-cancel" @click="subPopup = false">
        </van-popup>
        <van-popup v-model="errorPopup" class="sub-popup">
            <div class="popup-content">
                <img :src="API.assetsUrl + 'word-cup/sub-pop-img.png'" alt="" class="pop-top-img">
                <img :src="API.assetsUrl + 'word-cup/question-fonts-img.png'" alt="" class="pop-top-logo">
                <div class="popup-content-line1">
                    <div class="bold">很抱歉，您尚未签到</div>
                </div>
                <img :src="API.assetsUrl + 'word-cup/error-pop-line.png?v=0.1'" alt="" class="error-pop-line">
                <div class="popup-content-line3">（请先完成签到后进行操作）</div>
            </div>
            <div class="pop-confirm pop-confirm2 flex-c" @click="toDiscount()">前往【签到天天送】</div>
            <img :src="API.assetsUrl + 'word-cup/sub-pop-close.png'" alt="" class="pop-cancel" @click="errorPopup = false">
        </van-popup>
        <van-popup v-model="rulesPopup" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            奖池只计算体育场馆及冠军盘当日个人投注世界杯赛事，且赔率香港盘≥0.5（欧洲盘≥1.5）为有效投注额
        </van-popup>
        <van-popup v-model="rulesPopup2" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            体育场馆及冠军盘世界杯赛事投注人数&总投注额
        </van-popup>
        <van-popup v-model="rulesPopup3" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            个人中奖金额=个人投注金额/中奖者世界杯赛事总投注额*100万
        </van-popup>
    </div>
</template>
<script>
import HeaderTop from '../../components/top/top';
// import {Toast} from 'vant'
import $ from 'jquery'
import dayjs from 'dayjs';
import { vanPopover } from 'vant';
export default {
    name:'worldCup',
    components:{
        HeaderTop,
    },
    data(){
        return{
            topTab:1,
            bottomTab:12,
            bottomTab2:1,
            subPopup:false,
            rulesPopup:false,
            rulesPopup2:false,
            rulesPopup3:false,
            matchData:[],
            matchPrizeData:[],
            columns:[],
            queryDate:'',
            chosingValue:'',
            updateTime:'',
            answer:'',
            matchBegin:false,
            days_1:'0',
            days_2:'0',
            hours_1:'0',
            hours_2:'0',
            minutes_1:'0',
            minutes_2:'0',
            seconds_1:'0',
            seconds_2:'0',
            prizeStatus:0,
            showTop:false,
            bonusTotal:'',
            betTotal:'',
            numBonus:0,
            numTotal:0,
            betMe:'',
            bonusMe:'',
            betOver:'',
            showUpdate:true,
            isWordCup:false,
            errorPopup:false,
            limitTime:'2022-11-21 00:00:00',
            questionTime:'',
            logoError:'this.src="' + require('../../../static/images/match-demo-logo.png') + '"',
        }
    },
    created(){
        // this.handleAnimation()
        // console.log(new Date('2022/11/8 13:20:00') - new Date())
    },
    mounted(){
        this.handleTime(this.limitTime)
        // this.handlePrizeFn()
        this.handleDateScroll()
        this.initScrollFn()
        if(sessionStorage.getItem('discountFromHome') && sessionStorage.getItem('discountFromHome') === 'true'){
            this.isWordCup = true
        }        
        // this.getMatchInfo()
        // this.getMatchPrize()
        // this.loadTop()
        window.addEventListener('scroll', this.handleScroll,true)
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener("scroll", this.handleScroll, true)
        if (this.dateTimer) {
            clearInterval(this.dateTimer)
        }
        if (this.timer) {
            clearInterval(this.timer)
        }
        if (this.prize_timer) {
            clearInterval(this.prize_timer)
        }
        this.$destroy(true)
        next()
    },
    // computed: {
    //     optionHover () {
    //         return {
    //             hoverStop: false, //是否悬停
    //             singleHeight:.6,  // 单行停顿
    //             watiTime:1000,
    //             switchDelay:1000,
    //             isSingleRemUnit:true
    //         }
    //     }
    // },
    methods: {
        initScrollFn(){
            this.$nextTick(()=>{
                let widthVal = $('.tab-bottom-list-active').offset().left
                let widthVal_2 = $('.tab-bottom-list').eq(1).offset().left - $('.tab-bottom-list').eq(0).offset().left
                let widthVal_3 = $('.tab-bottom-list-active').css('width').replace('px')
                $('.tab-bottom-list').each(function(i,dom){
                    if($(dom).hasClass('tab-bottom-list-active')){
                        console.log(widthVal_2 * i)
                        $('.tab-bottom-list-box').animate({scrollLeft:widthVal_2 * i}, 300)
                    }
                })
            })
        },
        bottomFn(val,type){
            if(type === 1) {
                sessionStorage.setItem('discountFromHome',true)
                this.$router.push('/discountOne/' + val)
            }else if(type === 2) {
                this.$router.push('/' + val)
            }
        },

        handleTime(val){
            if(this.dateTimer){
                clearInterval(this.dateTimer)
            }
            this.dateTimer = setInterval(()=>{
                var now= new Date();
                //截止时间
                var until= new Date(val.replace(/-/g,'/'));
                if(until- now <= 0) {
                    this.matchBegin = true
                    clearInterval(this.dateTimer)
                }else{
                    var days = (until- now)/1000/3600/24; 
                    var day = Math.floor(days);
                    if(day < 10) {
                        this.days_1 = 0
                        this.days_2 = day
                    }else{
                        this.days_1 = (day + '').slice(0,1)
                        this.days_2 = (day + '').slice(1)
                    }
                    var hours = (days - day)*24;
                    var hour = Math.floor(hours);
                    if(hour < 10) {
                        this.hours_1 = 0
                        this.hours_2 = hour
                    }else{
                        this.hours_1 = (hour + '').slice(0,1)
                        this.hours_2 = (hour + '').slice(1)
                    }
                    var minutes = (hours - hour)*60;
                    var minute = Math.floor(minutes);
                    if(minute < 10) {
                        this.minutes_1 = 0
                        this.minutes_2 = minute
                    }else{
                        this.minutes_1 = (minute + '').slice(0,1)
                        this.minutes_2 = (minute + '').slice(1)
                    }
                    var seconds = (minutes - minute)*60;
                    var second = Math.floor(seconds);
                    if(second < 10) {
                        this.seconds_1 = 0
                        this.seconds_2 = minute
                    }else{
                        this.seconds_1 = (second + '').slice(0,1)
                        this.seconds_2 = (second + '').slice(1)
                    }
                }
            },1000)
        },
        handlePrizeFn(){
            let _this = this
            var content = ''
            _this.columns.forEach(item => {
                content = content + "<div class='scroll-list flex-b'><div class='scroll-list-side flex-c'>" + item.userName + "</div><div class='scroll-list-side flex-c'>¥" + item.bonus + "</div></div>"
            })
            $(".scroll-list-box").html(content)
            var $uList = $(".scroll-list-box")
            _this.prize_timer = null
            $uList.hover(function() {
                clearInterval(_this.prize_timer)
            },
            function() {
                _this.prize_timer = setInterval(function() {
                    scrollList($uList)
                },
                1500);
            }).trigger("mouseleave") //自动触发触摸事件
            //滚动动画
            function scrollList(obj) {
                var scrollHeight = $(".scroll-list:first").height();
                $('.scroll-list').css('font-weight','400')
                $uList.stop().animate({
                    marginTop: -scrollHeight
                },600,function() {
                    $uList.css({
                        marginTop: 0
                    }).find(".scroll-list:first").appendTo($uList);
                });
                $('.scroll-list').eq(1).animate({
                    fontSize:'.24rem'
                })
                $('.scroll-list').eq(2).animate({
                    fontSize:'.27rem'
                })
                $('.scroll-list').eq(4).animate({
                    fontSize:'.27rem'
                })
                $('.scroll-list').eq(5).animate({
                    fontSize:'.24rem'
                })
                $('.scroll-list').css('height','0.58rem')
                $('.scroll-list').eq(3).css('font-weight','bold')
                $('.scroll-list').eq(3).animate({
                    fontSize:'.3rem',
                },100)
            }
        },
        toBack(){
            if(sessionStorage.getItem('discountFromHome') && sessionStorage.getItem('discountFromHome') === 'true'){
                this.$router.push('/')
            }else{
                this.$router.back()
            }
        },
        handleDateScroll(){
            let Day = dayjs().$D
            // let Day = 23
            let month = dayjs().$M + 1
            // let month = dayjs().$M + 2
            let index
            if(month < 11) {
                this.matchBegin = false
                this.bottomTabSwitch(21,11,1)
            }else if(month == 11 && Day < 21){
                this.matchBegin = false
                this.bottomTabSwitch(21,11,1)
            }else if(month == 11 && Day >= 21){
                this.matchBegin = true
                this.bottomTabSwitch(Day,11,1)
            }else if(month == 12 && Day <= 3){
                this.matchBegin = true
                this.bottomTabSwitch(Day,12,1)
            }else if(month == 12 && Day > 3 && Day <= 18){
                this.matchBegin = true
                this.bottomTabSwitch(Day,12,2)
            }else if(month == 12 && Day > 18){
                this.matchBegin = true
                this.bottomTabSwitch(18,12,1)
            }
        },
        handleScroll () {
            let scrollY = document.documentElement.scrollTop
            if (scrollY > 200) {
                this.showTop = true
            } else {
                this.showTop = false
            }
        },
        loadTop(){
            let _this = this
            _this.timer = setInterval( ()=> {
                this.getMatchInfo()
                this.getMatchPrize()
            }, 30000)
        },
        getMatchInfo() {
            this.matchData = []
            let params = {
                issue:this.queryDate
            }
            this.ServerAPI.postAPI(this.API.eurocupList, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.matchBegin = true
                        this.matchData = data.data
                        this.questionTime = this.matchData[0].begin.slice(5,-3)
                        if(this.dateTimer){
                            clearInterval(this.dateTimer)
                        }
                    }else if(data.code === '9002'){
                        this.matchBegin = false
                        this.limitTime = data.showBegin
                        this.handleTime(this.limitTime)
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        getMatchPrize(){
            let params = {
                issue:this.queryDate
            }
            this.ServerAPI.postAPI(this.API.eurocupBonus, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.matchPrizeData = data.data
                        this.bonusTotal = this.matchPrizeData.bonusTotal.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betTotal = this.matchPrizeData.betTotal.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betMe = this.matchPrizeData.betMe.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.bonusMe = this.matchPrizeData.bonusMe.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betOver = this.matchPrizeData.betOver.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.numBonus = (this.matchPrizeData.numBonus + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.numTotal = (this.matchPrizeData.numTotal + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.prizeStatus = data.data.type
                        this.updateTime = data.data.lastTime.slice(14)
                        if(this.updateTime === '00:00'){
                            this.showUpdate = false
                        }
                        this.days = parseInt(Math.abs(data.data.second) / (3600 * 24))
                        this.hours = parseInt((Math.abs(data.data.second) - this.days * 3600 * 24) / 60 / 60)
                        this.minutes = parseInt((Math.abs(data.data.second) - this.days * 3600 * 24 - this.hours * 3600) / 60)
                        this.columns = data.data.limit
                        let columnsLth = this.columns.length
                        if(this.columns.length < 7){
                            for(var i = 0;i < (7 - columnsLth);i++){
                                this.columns.push({bonus:'-',userName:'-'})
                            }
                        }
                        if(this.prize_timer) {
                            clearInterval(this.prize_timer)
                        }
                        this.handlePrizeFn()
                    }else{
                        // Toast(data.info)
                        this.$toastTop(data.info,3)
                        this.noPrizeList = true
                    }
                }else{
                }
            })
        },
        showSubAlert(){
            //   Toast('已确认无法修改')
            this.$toastTop('已确认无法修改',3)
        },
        subJoin(){
            let params = {
                id:this.id,
                answer:this.answer
            }
            this.ServerAPI.postAPI(this.API.eurocupAnswer, params, (success, data) => {
                this.subPopup = false
                if(success){
                    if(data.code === '0000'){
                        // Toast('提交成功');
                        this.$toastTop('提交成功',1)
                        this.getMatchInfo()
                        this.getMatchPrize()
                    }else if(data.code === '4003'){
                        this.errorPopup = true
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        topTabSwitch(value){
            this.topTab = value
            this.$refs.scrollValue.scrollTo(0,0)
            // if(value === 1){
            //     this.$nextTick(()=>{
            //         this.$refs.scrollValue.scrollTo(0,0)
            //     })
            // }else if(value === 2){
            //     this.$nextTick(()=>{
            //         this.$refs.scrollValue.scrollTo(document.getElementById('scrollLeft27').offsetLeft,0)
            //     })
            // }
        },
        bottomTabSwitch(value,mon,index){
            if(index === 2 && value === 3){
                this.bottomTab = 3.2
            }else{
                this.bottomTab = value
            }
            if(value < 10){
                value = '0' + value
            }
            this.queryDate = '2022-' + mon + '-' + value
            this.topTab = index
            this.getMatchInfo()
            this.getMatchPrize()
        },
        chosingSub(value,id,answer){
            this.subPopup = true
            this.chosingValue = value
            this.id = id
            this.answer = answer
        },
        pageScroll(value){
            if(value === 1){
                document.body.scrollTop = document.documentElement.scrollTop = document.getElementById('content2').offsetTop

            }else if(value === 2){
                document.body.scrollTop = document.documentElement.scrollTop = document.getElementById('content4').offsetTop
            }
        },
        toTop(){
            document.body.scrollTop = document.documentElement.scrollTop = 0
        },
        toDiscount(){
            this.$router.push({name: 'discountOne', params: {id: 216}});
        },
    }
}
</script>

<style lang="scss" scoped>
.euro-cup-content{
    width:100%;
    height: auto;
    background: #EEEEEE;
    position: relative;
    padding-bottom: .6rem;
    .euro-cup-toTop {
        position: fixed;
        bottom: 1.4rem;
        right: .6rem;
        width: 1rem;
    }
    .top-arrow {
        position: absolute;
        top: .4rem;
        left: .4rem;
        font-size: .5rem;
        font-weight: bold;
        color: #161717;
    }
    .top-img {
        width: 100%;
    }
    .tab-box {
        margin: -.1rem auto 0;
        width: 100%;
        overflow: hidden;
        position: relative;
        .tab-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            background: linear-gradient(to bottom,#FFFFFF,rgba(208,168,178,.3),#DDA6B3);
            .tab-top-left {
                width: 56%;
                display: flex;
                align-items: center;
                .tab-top-list {
                    width: 50%;
                    text-align: center;
                    position: relative;
                    height: 1.2rem;
                    color: #303030;
                    .line1 {
                        margin-top: .3rem;
                        font-size: .3rem;
                    }
                    .line2 {
                        margin-top: -.04rem;
                        font-size: .2rem;
                    }
                }
                .tab-top-list-active {
                    color: #9A1032;
                }
            }
            .top-nav-line {
                height: 0.6rem;
                margin: 0 .04rem 0 -.1rem;
            }
            .tab-top-right {
                width: 38%;
                height: 0.6rem;
                margin-right: .1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: .4rem;
                background: linear-gradient(86deg, #AE163B 0%, #CE1E4A 100%);
                .tab-top-list2 {
                    width: 1.2rem;
                    
                    text-align: center;
                    color: #FFFFFF;
                    font-size: .26rem;
                }
                .tab-top-list2-line {
                    margin: 0 .02rem;
                    width: 1px;
                    height: 0.3rem;
                    background: #FFFFFF;
                }
            }

        }
        .tab-bottom {
            // height: 1.3rem;
            overflow-x: auto;
            .tab-bottom-list-box {
                // width: 33rem;
                // display: flex;
                // align-items: center;
                border-bottom: #9A1032 1px solid;
                padding: .1rem .1rem;
                overflow-x: auto;
                width: 100%;
                display: -webkit-box;
                background: #FFFFFF;
                .tab-bottom-list {
                    width: 1.4rem;
                    height: .6rem;
                    background: #FFFFFF;
                    color: #9A1032;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-weight: bold;
                }
                .green-line2 {
                    width: 1px;
                    height: .4rem;
                    background: #FFFFFF;
                }
                .match-list-line {
                    height: 0.4rem;
                    margin: .1rem .06rem 0;
                }
                .tab-bottom-list:last-child {
                    margin-right: 0;
                }
                .tab-bottom-list-active {
                    background: linear-gradient(90deg, #B32447 0%, #CE1E4A 100%);
                    color: #FFFFFF;
                    border-radius: .4rem;
                }
            }
        }
        .tab-bottom::-webkit-scrollbar {
            display:none
        }
    }
    .match-content {
        margin: .3rem auto 0;
        width: 94%;
        position: relative;
        padding: .2rem .16rem;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.1);
        border-radius: .2rem;
        background: #FFFFFF;
        .match-content-title {
            display: block;
            width: 92%;
            margin: 0 auto 0;
        }
        .match-content-title-box {
            position: relative;
            .match-content-title-line {
                width: 0.05rem;
                height: 0.3rem;
                background: #9A1032;
                border-radius: .06rem;
            }
            .match-content-title-fonts {
                color: #2A2A2A;
                font-size: .3rem;
                margin-left: .1rem;
            }
            .match-content-title-time {
                position: absolute;
                color: #999999;
                font-size: .22rem;
                text-align: right;
                top: 50%;
                right: .16rem;
                transform: translateY(-50%) ;
            }
        }
        .match-content-list {
            // width: 92%;
            margin: 0 auto;
            .match-content-list-title {
                display: flex;
                align-items: center;
                margin-top: .2rem;
                height: 1rem;
                background: linear-gradient(180deg, #EEEEEE 0%, #FFFFFF 100%);
                border-radius: 10px 10px 0px 0px;
                padding: 0 .2rem;
                .title-right {
                    width: 100%;
                    position: relative;
                    .title-right-top {
                        max-width: 7rem;
                        color: #333333;
                        font-size: .28rem;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .question-title-left {
                            height: 0.3rem;
                            // margin-right: .1rem;
                        }
                    }
                    .title-right-bottom {
                        color: #999999;
                        font-size: .22rem;
                        text-align: right;
                        width: 1.4rem;
                        position: absolute;
                        top: 50%;
                        right: 0;
                        margin-right: -.28rem;
                        transform: scale(.8) translateY(-50%) ;
                        margin-top: -.04rem;
                    }
                }
            }
            .match-content-list-team {
                // width: 92%;
                margin: 0 auto 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(180deg, #FBFBFB 0%, #EEEEEE 100%);
                border-radius: 0px 0px 10px 10px;
                height: 1.4rem;
                padding: 0 .2rem;
                .team-side {
                    width: calc(50% - .1rem);
                    height: .8rem;
                    // background: url("../../../static/images/word-cup-btn-left.png") no-repeat;
                    // background-size: 100% 100%;
                    background: #FFFFFF;
                    border-radius: .46rem;
                    border: #9A1032 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9A1032;
                    position: relative;
                    .team-icon {
                        width: .5rem;
                        //margin-left: .3rem;
                    }
                    .team-name {
                        margin-left: .25rem;
                        //width: 2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .team-name-center {
                        text-align: center;
                    }
                    .win-lose {
                        position: absolute;
                        top: 50%;
                        right: .16rem;
                        transform: translateY(-50%);
                        height: .4rem;
                    }
                }
                .team-side:last-child {
                    justify-content: center;
                    // background: url("../../../static/images/word-cup-btn-right.png") no-repeat;
                    // background-size: 100% 100%;
                    .team-icon {
                        width: .5rem;
                        //margin-right: .3rem;
                        margin-left: 0;
                    }
                    .team-name {
                        margin-right: .25rem;
                        text-align: right;
                        //width: 2rem;
                    }
                    .team-name-center {
                        text-align: center;
                    }
                    .win-lose {
                        position: absolute;
                        top: 50%;
                        right: unset;
                        transform: translateY(-50%);
                        height: .4rem;
                    }
                    .win-lose2 {
                        left: .16rem;
                    }
                }
                .answer-chosed:first-child {
                    // background: url("../../../static/images/word-cup-btn-left2.png") no-repeat;
                    // background-size: 100% 100%;
                    background: linear-gradient(90deg, #B0465E 0%, #C74F6A 100%);
                    color: #FFFFFF;
                }
                .answer-chosed:last-child {
                    // background: url("../../../static/images/word-cup-btn-right2.png") no-repeat;
                    // background-size: 100% 100%;
                    background: linear-gradient(90deg, #B0465E 0%, #C74F6A 100%);
                    color: #FFFFFF;
                }
                .gray-bg:first-child {
                    // background: url("../../../static/images/word-cup-btn-left3.png") no-repeat;
                    // background-size: 100% 100%;
                    background: #E2E2E3;
                    color: #303030;
                    border: none;
                }
                .gray-bg:last-child {
                    // background: url("../../../static/images/word-cup-btn-right3.png") no-repeat;
                    // background-size: 100% 100%;
                    background: #E2E2E3;
                    color: #303030;
                    border: none;
                }
                .dark-gray-bg:first-child {
                    // background: url("../../../static/images/word-cup-btn-left4.png") no-repeat;
                    // background-size: 100% 100%;
                    color: #FFFFFF;
                    font-weight: bold;
                    background: #999999;
                    border: none;
                }
                .dark-gray-bg:last-child {
                    // background: url("../../../static/images/word-cup-btn-right4.png") no-repeat;
                    // background-size: 100% 100%;
                    color: #333333;
                    background: #999999;
                    border: none;
                    font-weight: bold;
                }
            }
        }
        .match-watting {
            text-align: center;
            margin-top: .2rem;
            .begin-date {
                // width: 92%;
                height: 0.68rem;
                margin: 0 auto;
                color: #303030;
                font-size: .32rem;
                background: linear-gradient(180deg, #EEEEEE 0%, #FFFFFF 100%);
                border-radius: 10px 10px 0px 0px;
            }
            .match-name {
                width: 100%;
                display: block;
                margin: .2rem auto 0;
                // height: 0.8rem;
            }
            .match-watting-bg {
                // width: 92%;
                margin: .3rem auto 0;
                padding-bottom: .4rem;
                .match-watting-title {
                    height: 0.6rem;
                    margin-top: .16rem;
                }
                .time-show {
                    margin-top: .26rem;
                    .number {
                        margin-right: .06rem;
                        width: 0.5rem;
                        height: 0.58rem;
                        color: #303030;
                        font-size: .32rem;
                    }
                    .fonts {
                        color: #303030;
                        font-size: .32rem;
                        margin-right: .06rem;
                    }
                    .fonts:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .result-area {
            // width: 94%;
            margin: .2rem auto 0;
            padding: 0 .26rem;
            text-align: left;
            background: linear-gradient(180deg, #FFF0F5 0%, #FFFCFD 100%);
            border-radius: .2rem;
            border: 1px solid #DBDADA;
            .result-area-line1 {
                font-size: .28rem;
                width: 1.78rem;
                height: 0.48rem;
                margin: 0 auto;
                color: #FFFFFF;
                background: #696869;
                border-radius: 0 0 .2rem .2rem;
            }
            .result-area-line2 {
                color: #9A1032;
                font-size: .4rem;
                // margin-top: .1rem;
                line-height: .68rem;
                border-bottom: #B7B5B6 1px solid;
                text-align: center;
                height: .88rem;
            }
            .result-area-line3 {
                display: flex;
                justify-content: center;
                align-items: center;
                // margin-top: .2rem;
                .result-area-fonts {
                    width: 50%;
                    font-size: .38rem;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    height: 0.88rem;
                }
                .result-area-fonts:nth-child(2){
                    .more-icon {
                        height: .34rem;
                        margin-left: .15rem;
                    }
                }
            }
        }
        .result-area2 {
            // width: 94%;
            margin: .2rem auto 0;
            padding: .2rem .26rem;
            text-align: left;
            background: linear-gradient(180deg, #FFF0F5 0%, #FFFCFD 100%);
            border-radius: .2rem;
            border: 1px solid #DBDADA;
            .result-area2-list-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .result-area2-list {
                    text-align: left;
                    .result-area2-list-top {
                        color: #696869;
                        font-size: .26rem;
                        display: flex;
                        align-items: center;
                        position: relative;
                        .more-icon {
                            height: .34rem;
                            margin-left: .1rem;
                        }
                        .status-fonts {
                            background: #882533;
                            padding: .08rem 0;
                            width: 1rem;
                            color: #FFFFFF;
                            border-radius: .25rem;
                            font-size: .22rem;
                            text-align: center;
                            transform: scale(0.9);
                            position: absolute;
                            top: -0.06rem;
                            right: -.24rem;
                        }
                        .status-fonts2 {
                            background: #D2C4C3;
                            color: #2F3030;
                        }
                        .status-fonts3 {
                            background: #CE3523;
                            color: #FFFFFF;
                        }
                    }
                    .result-area2-list-bottom {
                        color: #333333;
                        font-size: .4rem;
                        font-weight: bold;
                    }
                }
                .result-area2-list:first-child {
                    width: 45%;
                }
                .result-area2-list:last-child {
                    width: 52%;
                    margin-left: 2%;
                }
            }
            .result-area2-list-box:last-child {
                margin-top: .1rem;
            }
        }
        .logo-fonts-img {
            height: 1rem;
            display: block;
            margin: .4rem auto 0;
        }
        .update-fonts {
            position: absolute;
            width: 2rem;
            text-align: right;
            color: #303030;
            font-size: .24rem;
            right: .16rem;
            top: .26rem;            
        }
    }
    .match-content3 {
        .result-list-box {
            height: 3rem;
            overflow: hidden;
            padding: 0 .25rem;
            margin-top: .2rem;
            .prize-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                div {
                    width: 50%;
                    color: #666666;
                    font-size: .3rem;
                    height: .6rem;
                    line-height: .6rem;
                }
                div:last-child {
                    text-align: right;
                    font-weight: bold;
                    color: #333333;
                }
            }
            .no-data {
                width: 100%;
                height: 100%;
            }
        }
        .table-list-box {
            margin: .2rem auto 0;
            padding: .3rem;
            // background: linear-gradient(to bottom,#EBECF3,#FFFFFF);
            border: 1px solid #E5E5E5;
            background: linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%);
            border-radius: .1rem;
            .prize-results-scroll {
                width: 100%;
                overflow: hidden;
                height: 3rem;
                .scroll-list-box {
                    height: 100%;
                    overflow: hidden;
                    padding: .1rem .3rem;
                    // background: #FFFFFF;
                    border-radius: .1rem;
                }
            }
        }
    }
    .match-content4 {
        // margin-top: .8rem;
        // padding-top: 0;
        .match-content-title {
            margin-bottom: .1rem;
        }
        .rules-content-list {
            margin-top: .16rem;
            padding: 0 .25rem;
            color: #636263;
            align-items: flex-start;
            .fonts-left-bg {
                width: 0.3rem;
                height: 0.3rem;
                transform: rotate(45deg);
                background: #882533;
                margin: .06rem .1rem 0 0; 
                .fonts-left-num {
                    width: 0.3rem;
                    height: 0.3rem;
                    transform: rotate(-45deg);
                    color: #FFFFFF;
                    font-size: .24rem;
                }
            }
        }

    }

    .sub-popup {
        width: 4rem;
        border-radius: .05rem;
        text-align: center;
        overflow: unset;
        padding: .2rem;
        border-radius: .2rem;
        .popup-content {
            position: relative;
            height: 4rem;
            border: #882533 1px solid;
            border-radius: .2rem;
            .pop-top-img {
                position: absolute;
                width: 1.8rem;
                top: -1.2rem;
                left: 50%;
                margin-left: -.9rem;
            }
            .pop-top-logo {
                display: block;
                margin: 1rem auto 0;
                height: 0.6rem;
            }
            .popup-content-line1 {
                font-size: .32rem;
                margin-top: .2rem;
                color: #303030;
                .chosed-fonts {
                    max-width: 100%;
                    font-size: .4rem;
                    color: #9A1032;
                }
            }
            .popup-content-line2 {
                color: #E90619;
                font-size: .24rem;
                margin-top: .2rem;
            }
            .error-pop-line {
                margin-top: .2rem;
                height: 0.24rem;
            }
            .popup-content-line3 {
                color: #999999;
                font-size: .26rem;
                margin-top: .2rem;
            }
        }
        .pop-cancel {
            position: absolute;
            width: 1rem;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .pop-confirm {
            background: linear-gradient(to right, #D1304E 0%, #8A1831 100%);
            width: 2rem;
            height: 0.6rem;
            color: #FFFFFF;
            border-radius: .4rem;
            margin: .24rem auto 0;
            font-size: .32rem;
        }
        .pop-confirm2 {
            font-size: .3rem;
            width: 3.4rem;
        }
    }
    .rules-popup {
        width: 5.3rem;
        padding: .2rem;
        color: #333333;
        border-radius: .1rem;
        text-align: left;
        box-shadow: 0px 0px 14px 2px rgba(0,0,0,.3);
    }
    .bottom-links-box {
        position: fixed;
        left: 3%;
        bottom: .4rem;
        background: #882533;
        width: 94%;
        border: #FFFFFF 2px solid;
        border-radius: .4rem;
        color: #FFFFFF;
        padding: .1rem;
        box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.26);
        .bottom-links-list {
            width: 22%;
            font-size: .28rem;
            height: 0.48rem;
            border-radius: .4rem;
        }
        .bottom-links-line {
            width: 1px;
            height: 0.34rem;
            background: #FFFFFF;
            margin: 0 .04rem;
        }
        .bottom-links-list-avtiving {
            background: #FFFFFF;
            color: #9A1032;
        }
    }
}
.has-bottom-nav {
    padding-bottom: 1.6rem;
}
// 世界杯底部导航
.word-cup-nav {
    position: fixed;
    bottom: .1rem;
    // bottom: -80vh;
    width: 100%;
    // left: 3%;
    background: #9A1032;
    border: #FFFFFF 2px solid;
    border-radius: .46rem;
    height: 0.8rem;
    color: #FFFFFF;
    font-size: .24rem;
    padding: .06rem .06rem;
    z-index: 4;
    .nav-line {
        width: 1px;
        height: 0.3rem;
        margin: 0 .04rem;
        background: rgba(255,255,255,.6);
    }
    .nav-list {
        width: 19%;
        height: 100%;
        border-radius: .4rem;
    }
    .nav-list2 {
        width: 24%;
    }
    .nav-list3 {
        width: 22%;
    }
    .nav-list-chosed {
        background: #FFFFFF;
        color: #9A1032;
    }
}
</style>

