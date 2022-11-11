<template>
	<div class="search-match-content">
		<HeaderTop :title="`搜索`"></HeaderTop>
		<div class="search-nav-box flex-b">
            <div class="search-nav-left flex">
                <div class="left-blue-line"></div>
                <div class="game-name bold">足球</div>
            </div>
            <div class="search-nav-right flex" :class="searchValue.length > 0?'input-activing':''">
                <span class="search-icon el-icon-search"></span>
                <input v-model="searchValue" type="text" maxlength="12" @input="searchFn()" class="right-input-content" id='searchValue' placeholder="队伍、赛事名称搜索">
                <span class="del-icon el-icon-error" @click="delInput()"></span>
            </div>
        </div>
        <div class="top-line"></div>
        <div class="search-result-box">
            <!-- 无搜索结果状态 -->
            <div class="no-search-result-box" v-if='noResult'>
                <img src="images/no-search-result.png" alt="" class="no-search-result">
                <div class="no-result-fonts">- 暂无搜索结果 -</div>
            </div>
            <!-- 搜索成功状态 -->
            <div class="searching-box" v-if='hasResult'>
                <div class="result-content">
                    <div class="result-list flex-b" v-for="(item,index) in resultData">
                        <div class="list-left">
                            <div class="list-left-line1 flex-b">
                                <span>{{item.league}}</span> 
                                <span>{{item.time}}</span> 
                            </div>
                            <div class="list-left-line2">{{item.home}} VS {{item.away}}</div>
                        </div>
                        <div class="list-right el-icon-arrow-right"></div>
                    </div>
                </div>
            </div>
            <!-- 有搜索历史数据状态 -->
            <div class="histroy-box" v-if='searchValue.length === 0'>
                <div class="histroy-title flex-b">
                    <div class="histroy-title-left">历史搜索</div>
                    <div class="histroy-title-right flex" @click="clearFn()">
                        <div class="clear-histroy el-icon-delete-solid"></div>
                        <div class="clear-histroy-fonts f12">全部清除</div>
                    </div>
                </div>
                <div class="histroy-list-box flex">
                    <div class="histroy-list flex-c" v-for="(item,index) in histroyAll" :key="index" @click='quickSearchFn(item)'>{{item}}</div>
                </div>
            </div>
            <!-- 无历史搜索记录状态 -->
            <div class="no-histroy text-c" v-if='noHistroy'>暂无历史搜索记录</div>
        </div>
        
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {mapState} from 'vuex';
export default {
	name: 'searchMatch',
	components: {
		HeaderTop,
	},
	data() {
		return {
			searchValue:'',
            noResult:false,
            hasResult:false,
            noHistroy:false,
            lastTime:null,
            resultData:[
                {
                    league:'联赛名称1',
                    time:'10-08 14:30',
                    home:'球队名称1',
                    away:'球队名称2',
                },
                {
                    league:'联赛名称2',
                    time:'14-09 09:10',
                    home:'球队名称3',
                    away:'球队名称4',
                },
            ],
            lastTime:null,
            histroyAll:[],
		}
	},
	mounted() {
        this.initData()
	},
	created() {
	
	},
    computed: 
        mapState({
            navigator: state => state.common.navigator,
            tarbarIndex: state => state.common.tarbarIndex,
            hasUnread: state => state.common.unread,
        }),
	beforeRouteLeave(to, from, next) {  
		this.$destroy(true)
		next()
	},
	methods: {
        initData(){
            this.histroyAll = JSON.parse(sessionStorage.getItem('searchData'))
            console.log(this.histroyAll)
        },
        delInput(){
            this.searchValue = ''
            this.hasResult = false
        },
		searchFn(){
            let _this = this
            if(_this.searchValue !== ''){
                if(_this.lastTime === null){
                    setTimeout(function(){     
                        _this.lastTime = new Date().getTime()
                        _this.hasResult = true
                    },1000)
                }else{
                    _this.lastTime = new Date().getTime()
                    setTimeout(function(){     
                        if(new Date().getTime() - _this.lastTime > 1000) {
                            _this.hasResult = true
                        }
                    },1000)
                }
                setTimeout(() => {
                    if(_this.histroyAll.indexOf(_this.searchValue.trim()) === -1){
                        if(_this.searchValue.trim().length > 0){
                            _this.histroyAll.unshift(_this.searchValue)
                            sessionStorage.setItem('searchData',JSON.stringify(_this.histroyAll))
                        }
                    }
                }, 1300);
            }else{
                this.hasResult = false
            }
            
        },
		clearFn(){
            this.histroyAll = []
        },
        quickSearchFn(val){
            this.searchValue = val
            this.searchFn()
        },
        
		
	}
}
</script>
<style lang="scss" scoped>
.search-match-content {
    background: #EFEFEF;
    min-height: 100vh;
	.search-nav-box {
        padding: .24rem .3rem;
        // height: 1rem;
        font-size: .3rem;
        color: #393939;
        .search-nav-left {
            width: 15%;
            .left-blue-line {
                width: 4px;
                height: .4rem;
                background: linear-gradient(180deg, #78BDF2 0%, rgba(0,0,0,.0) 100%);
                margin-right: .1rem;
                border-radius: .1rem;
            }
            .game-name {
                font-size: .32rem;
            }
        }
        .search-nav-right {
            width: 85%;
            height: .6rem;
            background: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: .4rem;
            .search-icon {
                font-size: .3rem;
                margin: 0 .16rem;
            }
            .right-input-content {
                width: calc(100% - 1.1rem);
                font-size: .3rem;
                border: none;
                outline: none;
            }
            .del-icon {
                font-size: .3rem;
                color: #999999;
            }
        }
        .input-activing {
            border: 2px solid #1D9DFC;
        }
    }
    .top-line {
        height: 1px;
        width: calc(100% - .4rem);
        margin: 0 auto;
        background: #E0E0E0;
    }
    .search-result-box {
        .searching-box {
            .result-content {
                padding: .1rem 0;
                .result-list {
                    background: #FFFFFF;
                    border-radius: .08rem;
                    padding: .2rem;
                    .list-left {
                        width: calc(100% - .6rem);
                        .list-left-line1 {
                            color: #999999;
                            font-size: .22rem;
                        }
                        .list-left-line2 {
                            color: #333333;
                            font-size: .32rem;
                        }
                    }
                    .list-right {
                        color: #333333;
                        font-size: .3rem;
                        font-weight: bold;
                    }
                }
            }
        }
        .histroy-box {
            margin: .2rem auto 0;
            width: calc(100% - .48rem);
            .histroy-title {
                .histroy-title-left {
                    font-size: .28rem;
                }
                .histroy-title-right {
                    color: #666666;
                    .clear-histroy {
                        color: #999999;
                        margin-top: .02rem;
                    }
                    .clear-histroy-fonts {
                        font-size: .24rem;
                    }
                }
            }
            .histroy-list-box {
                margin-top: .2rem;
                flex-wrap: wrap;
                .histroy-list {
                    height: 0.48rem;
                    padding: 0 .16rem;
                    background: #FFFFFF;
                    border-radius: .4rem;
                    color: #666666;
                    font-size: .26rem;
                    margin: 0 0 .16rem .16rem;
                }
            }
            
        }
    }


}

</style>
