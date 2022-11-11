<template>
  <!-- :class="sportsIndex === 1 ? 'word-cup-entertainment' : ''" -->
  <div class="entertainment" style="padding: 0">
    <!-- 头部展示 -->
    <div class="word-cup-top-area top-area flex-b">
      <!-- <div class="flex word-cup-top-nav">
        <img
          src="../../../static/images/word-cup-emc-logo-2.png"
          v-if="sportsIndex === 0"
          alt=""
          class="top-emc-logo"
        />
        <img
          src="../../../static/images/word-cup-emc-logo.png"
          v-if="sportsIndex === 1"
          alt=""
          class="top-emc-logo"
        />
        <div class="top-nav-tab flex-c">
          <div
            class="top-sports-switch bold flex-c"
            :class="sportsIndex === 1 ? 'top-sports-switch-chosed' : ''"
            @click="switchNav(1)"
          >
            <img
              src="../../../static/images/word-cup-icon.png"
              alt=""
              class="nav-fonts-img"
            />
            <img
              src="../../../static/images/word-cup-fonts.png"
              v-if="sportsIndex === 1"
              alt=""
              class="nav-fonts-img2"
            />
            <img
              src="../../../static/images/word-cup-fonts-2.png"
              v-if="sportsIndex === 0"
              alt=""
              class="nav-fonts-img2"
            />
          </div>
          <div
            class="top-sports-switch bold flex-c"
            :class="sportsIndex === 0 ? 'top-sports-switch-chosed-blue' : ''"
            @click="switchNav(0)"
          >
            娱乐
          </div>
        </div>
      </div> -->
      <!-- 头部左侧图标 -->
      <div>
        <img
          src="../../../static/images/home-top-logo2.png"
          alt=""
          style="width: 2.3rem; height: 0.6688rem"
        />
      </div>
      <div class="top-right flex" v-if="loginStatus">
        <span
          class="el-icon-refresh"
          v-if="!refreshBalance"
          @click="getUserInfo"
        ></span>
        <span class="el-icon-loading" v-if="refreshBalance"></span>
        <div class="top-balance bold">{{ balance }}</div>
        <el-dropdown>
          <img
            src="../../../static/images/top-right-wallet.png"
            v-if="sportsIndex === 0"
            alt=""
            class="top-right-wallet"
          />
          <img
            src="../../../static/images/word-cup-top-wallet.png"
            v-if="sportsIndex === 1"
            alt=""
            class="top-right-wallet"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="flex menu-1" @click="toPush('pay_index')">
                <img
                  src="../../../static/images/home-deposit.png"
                  alt=""
                  class="top-menu-icon"
                  style="height: 0.34rem; margin-right: 0.2rem"
                />
                充值
              </div>
            </el-dropdown-item>
            <el-dropdown-item :divided="true">
              <div class="flex" @click="toPush('extract')">
                <img
                  src="../../../static/images/home-withdraw.png"
                  alt=""
                  class="top-menu-icon"
                  style="height: 0.34rem; margin-right: 0.2rem"
                />
                提现
              </div>
            </el-dropdown-item>
            <el-dropdown-item :divided="true">
              <div class="flex" @click="toPush('transferAccounts')">
                <img
                  src="../../../static/images/home-transfer.png"
                  alt=""
                  class="top-menu-icon"
                  style="height: 0.34rem; margin-right: 0.2rem"
                />
                转账
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="top-right flex" v-if="!loginStatus">
        <div
          class="top-right-btn top-right-btn1 flex-c"
          @click="routerFn('login')"
        >
          登录
        </div>
        <div
          class="top-right-btn top-right-btn2 flex-c"
          @click="routerFn('register')"
        >
          注册
        </div>
      </div>
    </div>
    <div class="entertainment_padding">
      <div
        class=""
        v-show="sportsIndex === 0"
        style="border-radius: 0.16rem; background: #fff"
      >
        <div class="home-sp" id="topSwiperHeight">
          <!--顶部优惠图片轮播图-->
          <van-swipe
            class="help-imgs my-swipe"
            :autoplay="10000"
            @change="swiperChange"
            :show-indicators="false"
          >
            <van-swipe-item
              class="van-swipe-item"
              v-for="(item, index) in bannerImg"
              :key="index"
              @click.native="discountDetial(item.openValue, item.openType)"
            >
              <img v-lazy="item.image" alt="" />
            </van-swipe-item>
          </van-swipe>
          <!--顶部优惠图片轮播图指示器插槽-->
          <!-- <template #="indicator">
                        <div class="custom-indicator-box">
                            <div class="custom-indicator" :class="k === indicatorsIndex ? 'custom-indicator-acitve':''"
                                v-for="(v,k) in indicatorsArr" :key="k"></div>
                        </div>
                    </template> -->
        </div>
        <!--走马灯消息轮播-->
        <div class="notice-box" @click="toNotice()">
          <van-notice-bar
            left-icon="volume"
            color="#7F8590"
            background="none"
            style="height: 0.5rem"
          >
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item
                v-for="(item, index) in noticeData"
                :key="index"
                style="width: 100%; height: 0.5rem"
                v-html="item.title + '：' + item.contentTitle"
              ></van-swipe-item>
            </van-swipe>
          </van-notice-bar>
          <div class="notice-box-none"></div>
        </div>
      </div>
      <!-- 主内容模块 -->
      <div class="" v-if="sportsIndex === 0">
        <div class="games-area">
          <!-- 游戏类别滑动导航部分-->
          <!-- <div class="games-nav" id="gamesNavHeight">
            <div
              class="games-nav-list"
              :class="gamesNavActive === 0 ? 'games-nav-list-active' : ''"
              @click="switchTitle(0)"
            >
              <div class="top-columns-icon">
                <img
                  src="../../../static/images/ty-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 0"
                />
                <img
                  src="../../../static/images/ty-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img top-columns-icon-img-activing"
                  v-if="gamesNavActive === 0"
                />
              </div>
              <div class="bottom-columns-fonts">体育</div>
            </div>
            <div class="divide-line"></div>
            <div
              class="games-nav-list"
              :class="gamesNavActive === 1 ? 'games-nav-list-active' : ''"
              @click="switchTitle(1)"
            >
              <div class="top-columns-icon">
                <img
                  src="../../../static/images/qp-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 1"
                />
                <img
                  src="../../../static/images/qp-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive === 1"
                />
              </div>
              <div class="bottom-columns-fonts">棋牌</div>
            </div>
            <div class="divide-line"></div>
            <div
              class="games-nav-list"
              :class="gamesNavActive === 2 ? 'games-nav-list-active' : ''"
              @click="switchTitle(2)"
            >
              <div class="top-columns-icon top-columns-icon2">
                <img
                  src="../../../static/images/dj-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 2"
                />
                <img
                  src="../../../static/images/dj-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img top-columns-icon-img2"
                  v-if="gamesNavActive === 2"
                />
              </div>
              <div class="bottom-columns-fonts">电竞</div>
            </div>
            <div class="divide-line"></div>
            <div
              class="games-nav-list"
              :class="gamesNavActive === 3 ? 'games-nav-list-active' : ''"
              @click="switchTitle(3)"
            >
              <div class="top-columns-icon">
                <img
                  src="../../../static/images/zr-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 3"
                />
                <img
                  src="../../../static/images/zr-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive === 3"
                />
              </div>
              <div class="bottom-columns-fonts">真人</div>
            </div>
            <div class="divide-line"></div>
            <div
              class="games-nav-list"
              :class="gamesNavActive === 4 ? 'games-nav-list-active' : ''"
              @click="switchTitle(4)"
            >
              <div class="top-columns-icon">
                <img
                  src="../../../static/images/dz-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 4"
                />
                <img
                  src="../../../static/images/dz-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive === 4"
                />
              </div>
              <div class="bottom-columns-fonts">电子</div>
            </div>
            <div class="divide-line"></div>
            <div
              class="games-nav-list"
              :class="gamesNavActive === 5 ? 'games-nav-list-active' : ''"
              @click="switchTitle(5)"
            >
              <div class="top-columns-icon">
                <img
                  src="../../../static/images/cp-game-icon.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive !== 5"
                />
                <img
                  src="../../../static/images/cp-game-icon-active.png"
                  alt=""
                  class="top-columns-icon-img"
                  v-if="gamesNavActive === 5"
                />
              </div>
              <div class="bottom-columns-fonts">彩票</div>
            </div>
          </div> -->
          <!--游戏类别滑动切换部分-->
          <!-- <van-swipe
            class="my-swipe"
            :autoplay="0"
            :show-indicators="false"
            @change="gameColumnsChange"
            ref="swipe"
          >
            <van-swipe-item>
              <div
                class="games-swiper-title flex-b"
                id="gamesSwiperTitleHeight"
              >
                <div class="games-swiper-title-left">
                  <img
                    src="../../../static/images/games-swiper-title-ty.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                  <div class="gray-part gray-part-ty">
                    <div class="gray-line"></div>
                    <div class="gray-part-fonts">
                      享<span class="red-fonts">100%</span>注单包赔
                    </div>
                  </div>
                </div>
                <div class="lottie-icon-box flex-c" @click="toDiscount(1)">
                  查看优惠
                  <van-icon name="arrow" color="#FFFFFF" size=".3rem" />
                </div>
              </div>
              <div class="games-swiper-content" id="bottomSwiperHeight">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-ybty-old.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(1, 62)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="ybTySwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-emcty.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(1, 30)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="EMCTySwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-ebty.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(1, 47)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="EBTySwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-imty.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(1, 56)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="imTySwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-aity.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(1, 60)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="ybTyNewSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="games-swiper-title flex-b">
                <div class="games-swiper-title-left">
                  <div class="blue-line"></div>
                  <img
                    src="../../../static/images/games-swiper-title-qp.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                  <div class="gray-part">
                    <div class="gray-line"></div>
                    <div class="gray-part-fonts">
                      返现比例高达<span class="red-fonts">50%</span>
                    </div>
                  </div>
                </div>
                <div class="lottie-icon-box flex-c" @click="toDiscount(2)">
                  查看优惠
                  <van-icon name="arrow" color="#FFFFFF" size=".3rem" />
                </div>
              </div>
              <div class="games-swiper-content">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-lxqp.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(23, 55)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="lxQpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-ybqp.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(23, 38)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="ebQpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-kxqp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(23, 53)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="kylcQpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-kyqp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(23, 18)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="kyQpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="games-swiper-title flex-b">
                <div class="games-swiper-title-left">
                  <div class="blue-line"></div>
                  <img
                    src="../../../static/images/games-swiper-title-dj.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                  <div class="gray-part">
                    <div class="gray-line"></div>
                    <div class="gray-part-fonts">
                      电竞返水最高<span class="red-fonts">1.2%</span>
                    </div>
                  </div>
                </div>
                <div class="lottie-icon-box flex-c" @click="toDiscount(3)">
                  查看优惠
                  <van-icon name="arrow" color="#FFFFFF" size=".3rem" />
                </div>
              </div>
              <div class="games-swiper-content">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-EBdj.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(2, 49)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="EBDjSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-emcdj.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(2, 8)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="EMCDjSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-skdj.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(2, 32)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="skDjSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="games-swiper-title flex-b">
                <div class="games-swiper-title-left">
                  <div class="blue-line"></div>
                  <img
                    src="../../../static/images/games-swiper-title-zr.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                  <div class="gray-part">
                    <div class="gray-line"></div>
                    <div class="gray-part-fonts">
                      返水最高<span class="red-fonts">1.0%</span>
                    </div>
                  </div>
                </div>
                <div class="lottie-icon-box flex-c" @click="toDiscount(4)">
                  查看优惠
                  <van-icon name="arrow" color="#FFFFFF" size=".3rem" />
                </div>
              </div>
              <div class="games-swiper-content">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-ebzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 43)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="EBZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-twzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 67)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="twZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-agzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 5)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="agZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-bbinzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 6)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="bbinZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-ebetzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 14)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="EBETZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-bgzr.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(3, 20)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="bgZrSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="games-swiper-title flex-b">
                <div class="games-swiper-title-left">
                  <div class="blue-line"></div>
                  <img
                    src="../../../static/images/games-swiper-title-dz.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                  <div class="gray-part">
                    <div class="gray-line"></div>
                    <div class="gray-part-fonts">
                      救援金返现<span class="red-fonts">50%</span>
                    </div>
                  </div>
                </div>
                <div class="lottie-icon-box flex-c" @click="toDiscount(5)">
                  查看优惠
                  <van-icon name="arrow" color="#FFFFFF" size=".3rem" />
                </div>
              </div>
              <div class="games-swiper-content">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-agby.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 12)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="agbyDzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-ebby.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 51)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="ebbyDzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-agdz.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 9)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="agDzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-i8dz.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 66)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="i8DzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-lhdb.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 13)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="lhdbDzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-pgdz.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(4, 68)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="pgDzSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="games-swiper-title">
                <div class="games-swiper-title-left">
                  <div class="blue-line"></div>
                  <img
                    src="../../../static/images/games-swiper-title-cp.png"
                    alt=""
                    class="left-fonts-blue"
                  />
                </div>
              </div>
              <div class="games-swiper-content">
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-ybcp.png"
                    alt=""
                    class="games-swiper-content-list-100"
                    @click="toGame(5, 37)"
                  />
                  <div
                    class="games-swiper-content-list-100 hover-100"
                    v-if="ybCpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-lbcp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(5, 64)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="lbCpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-vrcp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(5, 16)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="vrCpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
                <div class="games-swiper-content-list-100-box">
                  <img
                    src="../../../static/images/games-swiper-tccp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(5, 63)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-left-50"
                    v-if="tcCpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                  <img
                    src="../../../static/images/games-swiper-bbincp.png"
                    alt=""
                    class="games-swiper-content-list-50"
                    @click="toGame(5, 11)"
                  />
                  <div
                    class="games-swiper-content-list-50 hover-right-50"
                    v-if="bbinCpSwitch === false"
                  >
                    <img
                      src="../../../static/images/maintenance-icon.png"
                      alt=""
                      class="maintenance-icon"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe> -->

          <!-- 体育 -->
          <div class="Sports_body" v-for="item in [1, 2]" :key="item">
            <!-- 头部 -->
            <div class="Sports_body_dis">
              <div class="Sports_body_dis_L">
                <img src="" alt="" class="Sports_body_dis_img_L" /> 体育
              </div>
              <div style="display: flex; align-items: center">
                查看优惠
                <img
                  src="../../../static/images/home_right.png"
                  alt=""
                  class="Sports_body_dis_img"
                />
              </div>
            </div>
            <!-- 内容 -->
            <div class="Sports_body_content">1</div>
          </div>
        </div>
      </div>

      <van-popup v-model="showSelect2">
        <div class="select">
          <div class="sle-mian">
            <div class="select-title">温馨提示</div>
            <div class="ag-content">
              <div class="ag-intro">{{ agIntro }}</div>
              <div
                class="ag-select"
                v-for="(v, k) in agSelect"
                :key="k"
                @click="toAgGame(k)"
              >
                {{ v }}
              </div>
            </div>
            <div class="select-bottom">
              <div class="closeSelectList" @click="closeSelectList2">关闭</div>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 平台公告提醒弹框 -->
      <van-popup v-model="noticeShow">
        <div class="msg-show" v-if="noticeShow">
          <div class="msg-title"></div>
          <div class="msg-popup-title-fonts flex-c bold">
            <span class="left-blue-line"></span>
            <span>平台公告</span>
          </div>
          <div class="msg-time flex-c">
            <img
              src="../../../static/images/notice-hot.png"
              v-if="noticeHot"
              alt=""
              class="message-mark"
            />
            <img
              src="../../../static/images/notice-new.png"
              v-if="noticeNew"
              alt=""
              class="message-mark"
            />
            {{ msgTime }}
          </div>
          <div class="msg-content msg-content2">
            <div class="sle">{{ noticeTitle }}</div>
            <div class="sle2" id="noticeContent" v-html="replaceContent"></div>
          </div>
          <div
            class="msg-content msg-content2 notice-loading"
            v-if="noticeLoading"
          >
            <van-loading type="spinner" color="#0F94FF" />
          </div>
          <div class="bottom-area">
            <div
              class="confirm-btn confirm-btn3"
              @click="closeNotice()"
              v-if="isFirst"
            >
              关闭
            </div>
            <div class="confirm-btn" @click="toPre()" v-if="!isFirst">
              上一页
            </div>
            <div class="confirm-btn" @click="toNext()" v-if="!isLast">
              下一页
            </div>
            <div
              class="confirm-btn confirm-btn3"
              @click="closeNotice()"
              v-if="isLast"
            >
              关闭
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="showDownload">
        <div class="download-list" v-if="showDownload">
          <div class="top-line"></div>
          <div class="download-list-title flex-c">
            <div class="download-list-title-blue"></div>
            <div class="download-list-title-fonts bold">重要提醒</div>
          </div>
          <div class="download-list-content">
            <div class="download-list-content-top bold text-c">
              EMC下载地址，随时更新下载
            </div>
            <div class="download-list-box flex bold">
              <img
                src="../../../static/images/show-download-icon.png"
                alt=""
                class="download-list-icon"
              />
              <a
                :href="'https://www.' + downloadInfo.appXzUrl1"
                target="_blank"
                class="download-list-fonts"
                >{{ downloadInfo.appXzUrl1 }}</a
              >
            </div>
            <div class="download-list-box flex bold">
              <img
                src="../../../static/images/show-download-icon.png"
                alt=""
                class="download-list-icon"
              />
              <a
                :href="'https://www.' + downloadInfo.appXzUrl2"
                target="_blank"
                class="download-list-fonts"
                >{{ downloadInfo.appXzUrl2 }}</a
              >
            </div>
            <div class="download-list-box flex bold">
              <img
                src="../../../static/images/show-download-icon.png"
                alt=""
                class="download-list-icon"
              />
              <a
                :href="'https://www.' + downloadInfo.appXzUrl3"
                target="_blank"
                class="download-list-fonts"
                >{{ downloadInfo.appXzUrl3 }}</a
              >
            </div>
            <div class="download-list-box flex bold">
              <img
                src="../../../static/images/show-download-icon.png"
                alt=""
                class="download-list-icon"
              />
              <a
                :href="'https://www.' + downloadInfo.appXzUrl4"
                target="_blank"
                class="download-list-fonts"
                >{{ downloadInfo.appXzUrl4 }}</a
              >
            </div>
          </div>
          <div class="reminds-box flex-c">
            <van-checkbox
              v-model="downloadCheck"
              shape="square"
              checked-color="#77BCEE"
            ></van-checkbox>
            <div class="reminds-fonts">24小时内不再提醒</div>
          </div>
          <div class="close-btn text-c bold" @click="closeDownload()">关闭</div>
        </div>
      </van-popup>
      <!--loading-new-->
      <div class="loading-new" v-if="showLoading">
        <img src="../../../static/images/allLoading.gif" alt="" />
      </div>
      <van-popup v-model="withdrawPop">
        <div class="confirm-sub-box">
          <div class="confirm-sub-line confirm-sub-line-yellow"></div>
          <div class="confirm-sub-title">
            <img
              src="../../../static/images/alert-icon.png"
              alt=""
              class="confirm-sub-title-left"
            />
            提现尚未完成
          </div>
          <div class="confirm-sub-content bold">
            <div class="confirm-sub-content-list flex-b">
              <div class="confirm-sub-content-list-left">时间：</div>
              <div class="confirm-sub-content-list-right">
                {{ withdrawPopTime }}
              </div>
            </div>
            <div class="confirm-sub-content-list flex-b">
              <div class="confirm-sub-content-list-left">提现金额：</div>
              <div
                class="confirm-sub-content-list-right confirm-sub-content-list-blue"
              >
                {{ withdrawPopCash }}
              </div>
            </div>
            <div class="confirm-sub-content-list flex-b">
              <div class="confirm-sub-content-list-left">提现方式：</div>
              <div class="confirm-sub-content-list-right">极速提现</div>
            </div>
            <div class="confirm-sub-content-list flex-b">
              <div class="confirm-sub-content-list-left">提现状态：</div>
              <div class="confirm-sub-content-list-right">尚未确认是否到账</div>
            </div>
          </div>
          <div class="confirm-sub-bottom">
            <div
              class="confirm-sub-btn confirm-sub-btn2"
              @click="toWithdrawPage()"
            >
              前往处理 >
            </div>
          </div>
        </div>
      </van-popup>
      <div class="" v-if="sportsIndex === 1">
        <betComponent></betComponent>
      </div>
    </div>
  </div>
</template>

<script>
import betComponent from "../../../src/pages/home/betComponent.vue";
// import {Toast} from 'vant';
import Btn from "@/assets/lottie/btn.json";
import { mobileModel } from "mobile-device-detect";
import { mapState } from "vuex";
export default {
  name: "entertainment",
  components: {
    Btn,
    betComponent,
  },
  data() {
    return {
      bannerImg: [],
      gameColumns: [],
      TYgames: [],
      ZRgames: [],
      QPgames: [],
      DJgames: [],
      DZgames: [],
      CPgames: [],
      showImg3: false,
      realGameId: [],
      gameIntroduce: [],
      agGameArr: [],
      dzGameArr: [],
      agDzUrl: "",
      agSelect: [],
      agGameIn: [],
      gameURL: [],
      slotGame: [],
      showSelect2: false,
      agIntro: "",
      queryUrl: "",
      index: 0,
      value: 0,
      showIntro: "",
      refreshBalance: false,
      balanceShow: 0,
      operatMenu: false,
      isEntertainment: true,
      noticeData: [],
      gamesNavActive: 0,
      current: 0,
      indicators: [0, 1, 2, 3, 4, 5],
      indicatorsArr: [],
      indicatorsIndex: 0,
      showMsg: false,
      noticeShow: false,
      noticeIndex: 0,
      noticeTitle: "",
      noticeContent: "",
      replaceContent: "",
      isFirst: true,
      isLast: false,
      showDownload: false,
      noticeLoading: false,
      showLoading: false,
      downloadCheck: true,
      withdrawPop: false,
      withdrawPopTime: "",
      withdrawPopCash: 0,
      gameName: "",

      ybTySwitch: true,
      ybTyNewSwitch: true,
      EMCTySwitch: true,
      imTySwitch: true,
      EBTySwitch: true,
      ppTySwitch: true,
      ebQpSwitch: true,
      kylcQpSwitch: true,
      kyQpSwitch: true,
      gdQpSwitch: true,
      lxQpSwitch: true,
      EBDjSwitch: true,
      ybDjSwitch: true,
      EMCDjSwitch: true,
      skDjSwitch: true,
      agZrSwitch: true,
      bbinZrSwitch: true,
      EBZrSwitch: true,
      twZrSwitch: true,
      WMZrSwitch: true,
      EBETZrSwitch: true,
      bgZrSwitch: true,
      agbyDzSwitch: true,
      ebbyDzSwitch: true,
      lhdbDzSwitch: true,
      pgDzSwitch: true,
      agDzSwitch: true,
      i8DzSwitch: true,
      ybCpSwitch: true,
      bbinCpSwitch: true,
      vrCpSwitch: true,
      tcCpSwitch: true,
      lbCpSwitch: true,

      defaultOptions: { animationData: Btn, loop: true, autoplay: true },
      defaultAnim: "",

      mobileModel: this.mobileModel,

      downloadInfo: {},
      quickTimer: null,
      msgTime: "",
      sportsIndex: 0, //判断是否登录

      msgTitle: "",
      msgContent: "",
      msgId: -1,
      balance: 0,
      noticeHot: false,
      noticeNew: false,
      loginStatus: true,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next();
  },
  mounted() {
    this.initNav();
    this.checkLoginStatus();
    // if(sessionStorage.getItem('showDownload') === '1') {
    //     this.checkShowNotice()
    // }else{
    //     this.checkWithdraw()
    // }
    this.handleLoginMark();
  },
  created() {
    this.$Lazyload.options.loading = "static/images/home-banner-lazy.jpg";
    this.$Lazyload.options.error = "static/images/home-banner-lazy.jpg";
    this.loadTop();
  },
  computed: mapState({
    navigator: (state) => state.common.navigator,
    tarbarIndex: (state) => state.common.tarbarIndex,
  }),
  methods: {
    initCheckFn() {
      if (sessionStorage.getItem("showDownload") === "1") {
        this.checkShowNotice();
      } else {
        this.checkWithdraw();
      }
    },
    initNav() {
      if (sessionStorage.getItem("homeNavIndex") === "1") {
        this.sportsIndex = 1;
      } else {
        this.switchNav(1);
      }
    },
    switchNav(val) {
      // sessionStorage.setItem('homeNavIndex',val)
      this.sportsIndex = val;
      if (val === 0) {
        if (sessionStorage.getItem("showDownload") === "1") {
          this.checkShowNotice();
        } else {
          this.checkWithdraw();
        }
      }
    },
    routerFn(val) {
      this.$router.push("/" + val);
    },
    checkLoginStatus() {
      if (localStorage.getItem("login_flag") !== "true") {
        this.loginStatus = false;
        this.sportsIndex = 0;
      }
    },
    checkWithdraw() {
      let status = sessionStorage.getItem("showWithdraw");
      if (status === "1") {
        let params = {
          version: this.API.paramVersion,
        };
        this.ServerAPI.postAPI(
          this.API.withdrawLogin,
          params,
          (success, data) => {
            if (success) {
              sessionStorage.setItem("showWithdraw", "0");
              if (data.code == "0000") {
                this.withdrawPop = true;
                this.withdrawPopTime = data.data.depositTime.slice(0, 10);
                this.withdrawPopCash = data.data.cash;
              }
            }
          }
        );
      }
    },
    toWithdrawPage() {
      sessionStorage.setItem("initIndex", "quick");
      this.$router.push("/extract");
    },
    handleAnimation(anim) {
      this.defaultAnim = anim;
    },
    handleLoginMark() {
      if (sessionStorage.getItem("loginMark") === "1") {
        sessionStorage.setItem("loginMark", "0");
        location.reload();
      }
    },
    getHeight() {
      let totalHeight = document.body.clientHeight;
      let heightA = document.getElementById("headHeight").offsetHeight * 2;
      let heightB = document.getElementById("topSwiperHeight").offsetHeight;
      let heightC = document.getElementById("gamesNavHeight").offsetHeight;
      let heightD = document.getElementById(
        "gamesSwiperTitleHeight"
      ).offsetHeight;
      document.getElementById("bottomSwiperHeight").style.height =
        totalHeight - heightA - heightB - heightC - heightD - 15 + "px";
    },
    discountDetial(value, type) {
      let loginMark = this.loginToastFn();
      if (loginMark !== false) {
        console.log(type);
        if (type === "discount") {
          sessionStorage.setItem("discountFromHome", true);
          if (value === "discount170") {
            this.$router.push("/EuroCup");
          } else if (value === "226") {
            this.$router.push("/inviteFriends");
          } else if (value === "218") {
            this.$router.push("/worldCup");
          } else if (value === "24") {
            this.$router.push("/discountDetail24");
          } else if (value === "130") {
            this.$router.push("/discountDetail130");
          } else {
            if (value !== null) {
              this.$router.push({ name: "discountOne", params: { id: value } });
            }
          }
        } else if (type === "game") {
          let tempData = this.gameColumns.find((item) =>
            item.childList.find((ele) => ele.gameId === parseInt(value))
          );
          this.toGame(tempData.homeId, parseInt(value));
        } else if (type === "hongbao") {
          this.$store.commit("TARBAR", 3);
        } else if (type === "url") {
          sessionStorage.setItem("hotMark", 1);
          this.$router.push({
            name: "sponsorshipOne_worldcup",
            query: { url: value, type: "url" },
          });
        } else {
        }
      }
    },
    toNotice() {
      let loginMark = this.loginToastFn();
      if (loginMark !== false) {
        this.$router.push({ name: "notice", params: { tabNum: 2 } });
      }
    },
    //轮播图指示器样式切换
    swiperChange(index) {
      this.indicatorsIndex = index;
    },
    //顶部资金操作快捷入口关闭方法
    closeOperaMenu() {
      this.operatMenu = false;
    },
    // 切换
    switchTitle(value) {
      this.gamesNavActive = value;
      this.$refs.swipe.swipeTo(value);
    },
    gameColumnsChange(index) {
      this.gamesNavActive = index;
      this.current = index;
    },
    toDiscount(value) {
      let loginMark = this.loginToastFn();
      if (loginMark !== false) {
        sessionStorage.setItem("discountNum", value);
        this.$router.push("/discountActive");
      }
    },
    loadTop() {
      let params = {
        visitType: "APP",
        version: this.API.paramVersion,
        visitSource: "h5",
      };
      this.ServerAPI.postAPI(this.API.bannerList, params, this.bannerList);
      this.ServerAPI.postAPI(this.API.homeList, params, this.homeList);
      this.ServerAPI.postAPI(this.API.webnotice, params, this.webnotice);
      this.getUserInfo();
      // this.ServerAPI.postAPI(this.API.errorLog2, params, this.testAxios)
    },
    testAxios(success, data) {
      if (success) {
      }
    },
    bannerList(success, data) {
      if (success) {
        if (data.code == "0000") {
          this.bannerImg = data.data;
          let imgsLength = this.bannerImg.length;
          for (let i = 0; i < imgsLength; i++) {
            this.indicatorsArr.push(1);
          }
        }
      }
    },
    webnotice(success, data) {
      if (success) {
        if (data.code == "0000") {
          this.noticeData = data.data;
          this.noticeData.forEach((item) => {
            item.contentTitle = item.contentTitle.replace(/\\n/g, "");
            item.contentTitle = item.contentTitle.replace(
              new RegExp("</b>", "g"),
              ""
            );
          });
        }
      }
    },
    homeList(success, data) {
      if (success) {
        if (data.code == "0000") {
          this.gameColumns = data.data;
          this.gameColumns.forEach((item) => {
            if (item.homeId === 1) {
              this.TYgames = item.childList;
            } else if (item.homeId === 23) {
              this.QPgames = item.childList;
            } else if (item.homeId === 3) {
              this.ZRgames = item.childList;
            } else if (item.homeId === 2) {
              this.DJgames = item.childList;
            } else if (item.homeId === 4) {
              this.DZgames = item.childList;
            } else if (item.homeId === 5) {
              this.CPgames = item.childList;
            }
          });
          this.gamesSwitchHandle();
        }
      }
    },
    gamesSwitchHandle() {
      this.TYgames.forEach((item) => {
        if (item.gameId === 62 && item.switch !== true) {
          this.ybTySwitch = false;
        } else if (item.gameId === 30 && item.switch !== true) {
          this.EMCTySwitch = false;
        } else if (item.gameId === 47 && item.switch !== true) {
          this.EBTySwitch = false;
        } else if (item.gameId === 60 && item.switch !== true) {
          this.ybTyNewSwitch = false;
        } else if (item.gameId === 56 && item.switch !== true) {
          this.imTySwitch = false;
        } else if (item.gameId === 61 && item.switch !== true) {
          this.ppTySwitch = false;
        }
      });
      this.QPgames.forEach((item) => {
        if (item.gameId === 38 && item.switch === false) {
          this.ebQpSwitch = false;
        } else if (item.gameId === 53 && item.switch !== true) {
          this.kylcQpSwitch = false;
        } else if (item.gameId === 18 && item.switch !== true) {
          this.kyQpSwitch = false;
        } else if (item.gameId === 45 && item.switch !== true) {
          this.gdQpSwitch = false;
        } else if (item.gameId === 55 && item.switch !== true) {
          this.lxQpSwitch = false;
        }
      });
      this.DJgames.forEach((item) => {
        if (item.gameId === 49 && item.switch !== true) {
          this.EBDjSwitch = false;
        } else if (item.gameId === 26 && item.switch !== true) {
          this.ybDjSwitch = false;
        } else if (item.gameId === 8 && item.switch !== true) {
          this.EMCDjSwitch = false;
        } else if (item.gameId === 32 && item.switch !== true) {
          this.skDjSwitch = false;
        }
      });
      this.ZRgames.forEach((item) => {
        if (item.gameId === 5 && item.switch !== true) {
          this.agZrSwitch = false;
        } else if (item.gameId === 6 && item.switch !== true) {
          this.bbinZrSwitch = false;
        } else if (item.gameId === 43 && item.switch !== true) {
          this.EBZrSwitch = false;
        } else if (item.gameId === 22 && item.switch !== true) {
          this.WMZrSwitch = false;
        } else if (item.gameId === 14 && item.switch !== true) {
          this.EBETZrSwitch = false;
        } else if (item.gameId === 67 && item.switch !== true) {
          this.twZrSwitch = false;
        } else if (item.gameId === 20 && item.switch !== true) {
          this.bgZrSwitch = false;
        }
      });
      this.DZgames.forEach((item) => {
        if (item.gameId === 12 && item.switch !== true) {
          this.agbyDzSwitch = false;
        } else if (item.gameId === 51 && item.switch !== true) {
          this.ebbyDzSwitch = false;
        } else if (item.gameId === 13 && item.switch !== true) {
          this.lhdbDzSwitch = false;
        } else if (item.gameId === 68 && item.switch !== true) {
          this.pgDzSwitch = false;
        } else if (item.gameId === 9 && item.switch !== true) {
          this.agDzSwitch = false;
        } else if (item.gameId === 66 && item.switch !== true) {
          this.i8DzSwitch = false;
        }
      });
      this.CPgames.forEach((item) => {
        if (item.gameId === 37 && item.switch !== true) {
          this.ybCpSwitch = false;
        } else if (item.gameId === 11 && item.switch !== true) {
          this.bbinCpSwitch = false;
        } else if (item.gameId === 16 && item.switch !== true) {
          this.vrCpSwitch = false;
        } else if (item.gameId === 63 && item.switch !== true) {
          this.tcCpSwitch = false;
        } else if (item.gameId === 64 && item.switch !== true) {
          this.lbCpSwitch = false;
        }
      });
    },
    toGame(homeId, gameId, gameName) {
      let loginMark = this.loginToastFn();
      if (loginMark !== false) {
        sessionStorage.setItem("gameId", gameId);
        this.gameColumns.forEach((item) => {
          // 先匹配游戏类别homeId
          if (homeId === item.homeId) {
            item.childList.forEach((k) => {
              // 根据gameId匹配游戏
              if (gameId === k.gameId) {
                // ‘易倍’体育需单独筛选出type为api的子元素
                if (
                  gameId === 2 ||
                  gameId === 56 ||
                  gameId === 11 ||
                  gameId === 6 ||
                  gameId === 64 ||
                  gameId === 16 ||
                  gameId === 67
                ) {
                  k.menu.forEach((v) => {
                    if (v.type === "api") {
                      this.queryUrl = v.url + "&platform=h5";
                      // sessionStorage.setItem('queryData', JSON.stringify(this.queryUrl))
                      // this.$router.push('/gameModel')
                      this.showLoading = true;
                      this.winRef = window.open("", "_blank");
                      this.newWindowGame();
                    }
                  });
                  // }else if(gameId === 55){
                  //     this.recData = k.menu[0].url + '&platform=h5'
                  //     this.showLoading = true
                  //     this.toLxGame()

                  // ‘ag真人’单独处理
                } else if (gameId === 5) {
                  this.agSelect = [];
                  this.agGameArr = [];
                  this.showSelect2 = true;
                  this.agIntro = k.gameIntroduce;
                  k.menu.forEach((v) => {
                    this.agSelect.push(v.name);
                    this.agGameArr.push(v.url + "&platform=h5");
                  });
                } else if (
                  gameId === 13 ||
                  gameId === 7 ||
                  gameId === 9 ||
                  gameId === 66 ||
                  gameId === 68
                ) {
                  this.queryUrl = k.menu[0].url + "&platform=h5";
                  sessionStorage.setItem(
                    "queryData",
                    JSON.stringify(this.queryUrl)
                  );
                  // sessionStorage.setItem('gameName', k.menu[0].name)
                  this.$router.push("/gameModelList");
                } else {
                  this.queryUrl = k.menu[0].url + "&platform=h5";
                  // this.queryUrl = k.menu[0].url
                  sessionStorage.setItem(
                    "queryData",
                    JSON.stringify(this.queryUrl)
                  );
                  this.$router.push("/gameModel");
                }
              }
            });
          }
        });
        //处理游戏名称获取
        if (homeId === 1) {
          this.TYgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        } else if (homeId === 23) {
          this.QPgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        } else if (homeId === 2) {
          this.DJgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        } else if (homeId === 3) {
          this.ZRgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        } else if (homeId === 4) {
          this.DZgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        } else if (homeId === 5) {
          this.CPgames.forEach((i, t) => {
            if (i.gameId === gameId) {
              this.gameName = i.name;
            }
          });
        }
        sessionStorage.setItem("gameName", this.gameName);
      }
    },
    newWindowGame() {
      this.ServerAPI.postAPI(this.queryUrl, "", (success, data) => {
        this.showLoading = false;
        if (success) {
          if (data.code === "0000") {
            this.winRef.location = data.data;
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("似乎已断开与互联网的连接", 2);
          this.$router.push("/");
        }
      });
    },
    toLxGame() {
      this.ServerAPI.postAPI(this.recData, "", (success, data) => {
        this.showLoading = false;
        if (success) {
          if (data.code === "0000") {
            this.winRef = window.open("", "_blank");
            this.winRef.location = data.data;
          }
        }
      });
    },
    toAgGame(k) {
      this.showSelect2 = false;
      sessionStorage.setItem("queryData", JSON.stringify(this.agGameArr[k]));
      this.$router.push("/gameModel");
    },
    closeSelectList() {
      this.showSelect = false;
    },
    closeSelectList2() {
      this.showSelect2 = false;
    },
    refreshButton() {},
    getUserInfo() {
      this.refreshBalance = true;
      let params = {
        visitType: "APP",
        version: this.API.paramVersion,
        visitSource: "h5",
      };
      this.ServerAPI.postAPI(this.API.userInfo, params, (success, data) => {
        this.refreshBalance = false;
        if (success) {
          if (data.code == "0000") {
            sessionStorage.setItem("userName", data.data.loginName);
            sessionStorage.setItem("cashPwd", data.data.haveCashPass);
            this.balance = data.data.cash;
          }
        }
      });
    },
    showOperate() {
      this.operatMenu = true;
    },
    toPay() {
      this.$router.push("/pay");
    },
    toExtract() {
      this.$router.push("/extract");
    },
    toTransferAccounts() {
      this.$router.push("/transferAccounts");
    },
    //获取平台公告方法
    showNotice() {
      this.noticeLoading = true;
      let params = {
        limit: 5,
      };
      this.ServerAPI.postAPI(this.API.webnotice, params, (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.noticeLoading = false;
            this.noticeList = data.data;
            this.noticeTitle = this.noticeList[0].title;
            this.msgTime = this.noticeList[0].addTime;
            this.noticeContent = this.noticeList[0].content;
            this.replaceContent = this.noticeContent.replace(/\\n/g, "<br>");
            if (this.noticeList[0].label === "HOT") {
              this.noticeHot = true;
            } else {
              this.noticeHot = false;
            }
            if (this.noticeList[0].label === "NEW") {
              this.noticeNew = true;
            } else {
              this.noticeNew = false;
            }
            // this.replaceContent = this.replaceContent.replace(/\\t/g, "&emsp;")
          }
        }
      });
    },
    // 一键阅读所有站内信
    msgReaded() {
      let params = {
        visitType: "APP",
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(
        this.API.changMsgStatus,
        params,
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
            }
          }
        }
      );
    },
    // 站内信‘上一页’方法
    toPre() {
      this.noticeIndex--;
      this.noticeTitle = this.noticeList[this.noticeIndex].title;
      this.noticeContent = this.noticeList[this.noticeIndex].content;
      this.msgTime = this.noticeList[this.noticeIndex].addTime;
      this.replaceContent = this.noticeContent.replace(/\\n/g, "<br>");
      this.replaceContent = this.replaceContent.replace(/\\t/g, "&emsp;");
      if (this.noticeList[this.noticeIndex].label === "HOT") {
        this.noticeHot = true;
      } else {
        this.noticeHot = false;
      }
      if (this.noticeList[this.noticeIndex].label === "NEW") {
        this.noticeNew = true;
      } else {
        this.noticeNew = false;
      }
      if (this.noticeIndex === 0) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
      if (this.noticeIndex === this.noticeList.length - 1) {
        this.isLast = true;
      } else {
        this.isLast = false;
      }
    },
    // 站内信‘下一页’方法
    toNext() {
      this.noticeIndex++;
      this.noticeTitle = this.noticeList[this.noticeIndex].title;
      this.noticeContent = this.noticeList[this.noticeIndex].content;
      this.msgTime = this.noticeList[this.noticeIndex].addTime;
      this.replaceContent = this.noticeContent.replace(/\\n/g, "<br>");
      this.replaceContent = this.replaceContent.replace(/\\t/g, "&emsp;");
      if (this.noticeList[this.noticeIndex].label === "HOT") {
        this.noticeHot = true;
      } else {
        this.noticeHot = false;
      }
      if (this.noticeList[this.noticeIndex].label === "NEW") {
        this.noticeNew = true;
      } else {
        this.noticeNew = false;
      }
      if (this.noticeIndex < this.noticeList.length - 1) {
        this.isLast = false;
      } else {
        this.isLast = true;
      }
      if (this.noticeIndex === 0) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
    },
    // 平台公告‘关闭’点击方法
    closeNotice() {
      this.noticeShow = false;
      this.checkWithdraw();
      // this.checkMsgNum()
      // this.checkWithdraw()
    },
    // 关闭下载弹框并展示平台公告弹框
    closeDownload() {
      this.showDownload = false;
      this.showNotice();
      this.noticeShow = true;
      sessionStorage.setItem("showDownload", "0");
    },
    // 判断站内信是否需要展示
    checkShowNotice() {
      this.getDownloadInfo();
      this.showDownload = true;
    },
    getDownloadInfo() {
      this.ServerAPI.postAPI(this.API.setting, "", (success, data) => {
        if (success) {
          if (data.code === "0000") {
            this.downloadInfo = data.data;
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("获取下载链接失败，请稍后尝试", 2);
        }
      });
    },
    toPush(val) {
      this.$router.push("/" + val);
    },
  },
};
</script>

<style lang="scss" scoped>
.entertainment {
  background: #fff;
  height: 100%;

  .entertainment_padding {
    height: calc(100vh - 2rem);
    overflow-y: scroll;
    padding: 0 0.26rem;
    background: #f5f5f5;
    padding-top: 0.16rem;
  }
  .top-area {
    height: 0.8rem;
    .top-left-logo {
      height: 0.58rem;
    }
    .sports-switch {
      width: 1rem;
      height: 0.44rem;
      font-size: 0.26rem;
      border-radius: 0.4rem;
      margin-left: 0.2rem;
      color: #494949;
    }
    .sports-switch-chosed {
      color: #ffffff;
      background: linear-gradient(to right, #5ca7fb, #4885fa);
    }
    .top-right {
      .el-icon-refresh {
        font-size: 0.34rem;
        color: #aeb2bb;
        margin-right: 0.1rem;
      }
      .el-icon-loading {
        font-size: 0.34rem;
        color: #aeb2bb;
        margin-right: 0.1rem;
      }
      .top-balance {
        font-family: DIN Alternate;
        color: #464646;
        font-size: 0.3rem;
        margin-right: 0.1rem;
      }
      .top-right-wallet {
        height: 0.48rem;
      }
      .top-right-btn {
        width: 1.1rem;
        height: 0.48rem;
        border-radius: 0.4rem;
        font-size: 0.28rem;
      }
      .top-right-btn1 {
        background: linear-gradient(90deg, #20a9ff 0%, #1884ff 100%);
        color: #ffffff;
        margin-right: 0.2rem;
      }
      .top-right-btn2 {
        border: 1px solid #1d9dfc;
        color: #1d9dfc;
      }
    }
  }
  .home-sp {
    width: 100%;
    height: 3.5rem;
    background: #e1e2e6;
    position: relative;
    margin-top: 0.06rem;
    border-radius: 0.16rem 0.16rem 0 0;
    overflow: hidden;
    .van-swipe-item {
      img {
        width: 100%;
        height: 3.5rem;
      }
    }
    .custom-indicator-box {
      position: absolute;
      bottom: 0.6rem;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      .custom-indicator {
        width: 0.2rem;
        height: 0.06rem;
        background: rgba(255, 255, 255, 0.6);
        margin-left: 0.1rem;
      }
      .custom-indicator-acitve {
        width: 0.4rem;
      }
    }
  }
  .notice-box {
    // position: absolute;
    // bottom: 0;
    height: 0.89rem;
    width: 100%;
    display: flex;
    align-items: center;
    // margin-top: 0.16rem;
    padding: 0 0.08rem;
    // background: url("../../../static/images/index-notice-bg.png") no-repeat;
    // background-size: 100% 100%;
    .van-notice-bar {
      padding: 0;
    }
    .notice-swipe {
      height: 0.5rem;
      line-height: 0.48rem;
      .van-swipe-item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.22rem;
      }
    }
  }
  .games-area {
    // background: #FFFFFF;
    margin-top: 0.1rem;
    padding-bottom: 1rem;
    position: relative;
    .games-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.6rem;
      background: #ffffff;
      // width: 96%;
      margin: 0 auto;
      border-radius: 0.16rem;
      overflow: hidden;
      box-shadow: 0px 0px 3px rgba(88, 94, 96, 0.2);
      padding: 0.08rem;
      .games-nav-list {
        width: 16%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top-columns-icon {
          height: 65%;
          margin-top: 0.05rem;
          .top-columns-icon-img {
            height: 1.4rem;
          }
          .top-columns-icon-img-activing {
            height: 1.4rem;
          }
        }
        .bottom-columns-fonts {
          height: 35%;
          // font-size: .2rem;
          // margin-top: -.05rem;
          font-size: 0.26rem;
          color: #151515;
        }
      }
      .games-nav-list-active {
        background: #ecf0f4;
        border-radius: 0.16rem;
        .top-columns-icon {
          .top-columns-icon-img2 {
            // margin-top: -.08rem;
          }
        }
        .top-columns-icon2 {
          // margin-top: 0;
        }
        .bottom-columns-fonts {
          font-weight: bold;
          // height: 35%;
          // font-size: .26rem;
        }
      }
      .divide-line {
        width: 1px;
        height: 0.3rem;
        // margin: 0 .04rem;
        background: #e6e8ee;
      }
    }
    .my-swipe {
      margin-top: 0.2rem;
      position: relative;
      .van-swipe-item {
        color: #fff;
        text-align: center;
        .games-swiper-title {
          height: 0.85rem;
          background: #ffffff;
          border-radius: 0.1rem;
          // box-shadow: 0px 3px 9px -4px rgba(0, 0, 0, 0.5);
          .games-swiper-title-left {
            display: flex;
            align-items: center;
            height: 100%;
            .left-fonts-blue {
              height: 50%;
            }
            .gray-part {
              height: 0.34rem;
              font-size: 0.28rem;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              color: #3d3737;
              margin-left: 0.16rem;
              .gray-line {
                width: 0.06rem;
                height: 0.24rem;
                background: #78bdf2;
                border-radius: 0.04rem;
                margin-right: 0.16rem;
              }
              .gray-part-fonts {
                margin-bottom: -0.06rem;
                .red-fonts {
                  color: #e49d31;
                }
              }
            }
          }
          .lottie-icon-box {
            background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
            height: 0.58rem;
            border-radius: 0.4rem;
            color: #ffffff;
            font-size: 0.3rem;
            padding: 0 0.1rem 0 0.2rem;
          }
        }

        .games-swiper-content {
          // width: 98%;
          margin: 0.1rem auto 0;
          position: relative;
          .games-swiper-content-list-100 {
            width: 100%;
          }
          .hover-100 {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.1rem;
            .maintenance-icon {
              width: 2.5rem;
            }
          }
          .games-swiper-content-list-100-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
            // margin-top: .15rem;
            z-index: 2;
            .hover-right-50 {
              position: absolute;
              height: 100%;
              right: 0;
              background: rgba(0, 0, 0, 0.3);
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0.1rem;
              z-index: 3;
              .maintenance-icon {
                width: 2.5rem;
              }
            }
            .hover-left-50 {
              position: absolute;
              height: 100%;
              left: 0;
              background: rgba(0, 0, 0, 0.3);
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0.1rem;
              .maintenance-icon {
                width: 2.5rem;
              }
            }
            .games-swiper-content-list-50 {
              width: 49%;
            }
            .games-swiper-content-list-33 {
              width: 33.3%;
            }
            .list-33-box {
              width: 33.3%;
              position: relative;
              .games-swiper-content-list-33-img {
                width: 100%;
                height: 100%;
              }
              .hover-left-33 {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.3);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.1rem;
                .maintenance-icon {
                  width: 2.5rem;
                }
              }
            }
            .game-hot-mark {
              position: absolute;
              top: 0.2rem;
              left: 0.1rem;
              width: 0.8rem;
            }
          }
          .games-swiper-content-list-100-box:not(:first-child) {
            margin-top: 0.16rem;
          }
        }
      }
    }
    .custom-indicators {
      position: absolute;
      bottom: 1.3rem;
      left: 50%;
      width: 2.5rem;
      margin-left: -1.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .custom-indicator {
        height: 0.08rem;
        width: 0.3rem;
        background: #ededed;
        margin-left: 0.05rem;
      }
      .custom-indicator-active {
        background: #167cff;
        width: 0.6rem;
      }
    }
  }
}
.select {
  // width: 100%;
  // height: 100%;
  background: rgba(0, 0, 0, 0.5);
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // z-index: 9999;
  .sle-mian {
    // position: absolute;
    // top: 20%;
    // right: 0;
    // left: 0;
    width: 6.4rem;
    // margin: 0 7%;
    border-radius: 0.1rem;
    overflow: hidden;
    .select-title {
      height: 1rem;
      width: 100%;
      background: url("../../../static/images/alert-title-bg.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
      font-size: 0.3rem;
      line-height: 1rem;
      text-align: center;
      span {
        display: inline-block;
        margin: 0.15rem 0 0 0.3rem;
      }
    }
    .ag-content {
      padding: 0.25rem 0.2rem;
      background: #ffffff;
      color: #111111;
      text-align: center;
      .ag-intro {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        font-size: 0.2rem;
      }
      .ag-select {
        width: 80%;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #38b4ff;
        color: #ffffff;
        margin: 0.2rem auto 0;
        text-align: center;
      }
    }
    .select-bottom {
      background: #ffffff;
      color: #111111;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
      border-top: #d8e0e8 1px solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .middle-line {
        width: 1px;
        height: 100%;
        background: #d8e0e8;
      }
      .closeSelectList {
        width: 50%;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
}

.msg-show {
  // position: fixed;
  // top: 30%;
  // left: 50%;
  // margin-left: -2.8rem;
  width: 5.6rem;
  // height: 3.2rem;
  z-index: 9990;
  border-radius: 0.1rem;
  background: #ffffff;
  overflow: hidden;
  .msg-title {
    width: 100%;
    height: 0.15rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.3rem;
    color: #ffffff;
    background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
  }
  .msg-popup-title-fonts {
    font-size: 0.34rem;
    margin-top: 0.2rem;
    .left-blue-line {
      width: 0.08rem;
      height: 0.4rem;
      background: linear-gradient(to bottom, #167bff, #ffffff);
      margin-right: 0.1rem;
    }
  }
  .msg-time {
    color: #a8b3c3;
    font-size: 0.2rem;
    margin-top: 0.1rem;
    .message-mark {
      height: 0.24rem;
      margin-right: 0.1rem;
    }
  }
  .msg-content {
    background: #ffffff;
    height: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    overflow: auto;
  }
  .msg-content2 {
    height: auto;
    max-height: 4rem;
    overflow-y: auto;
    .sle {
      width: 100%;
      font-size: 0.3rem;
      text-align: center;
      color: #0f94ff;
      font-weight: bold;
      padding: 0 0.2rem;
    }
    .sle2 {
      width: 100%;
      height: auto;
      overflow-y: scroll;
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      word-wrap: break-word;
      line-height: 0.6rem;
      // margin-top: -.2rem;
      p {
        color: rgba(0, 0, 0, 0.87);
        font-size: 0.26rem;
        height: 0.28rem;
      }
    }
    .new-msg-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .new-msg-content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #666666;
    }
  }
  .notice-loading {
    text-align: center;
    padding-top: 0;
  }
  .bottom-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    overflow: hidden;
    .confirm-btn {
      width: 50%;
      height: 0.9rem;
      line-height: 0.9rem;
      // background: #AFB6C5;
      color: #afb6c5;
      border-top: rgba(0, 0, 0, 0.1) 1px solid;
    }
    .confirm-btn2 {
      color: #333333;
    }
    .confirm-btn3 {
      color: #333333;
    }
    .confirm-btn:first-child {
      border-right: rgba(0, 0, 0, 0.1) 1px solid;
    }
  }
}
.download-list {
  // position: fixed;
  // top: 10%;
  // left: 50%;
  // margin-left: -3rem;
  width: 6rem;
  // height: 8.1rem;
  z-index: 9999;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #ffffff;
  .top-line {
    background: linear-gradient(90deg, #78bdf2, #2383fc);
    height: 0.2rem;
  }
  .download-list-title {
    font-size: 0.34rem;
    height: 1rem;
    border-bottom: #e3e6eb 1px solid;
    position: relative;
    .download-list-title-blue {
      width: 0.1rem;
      height: 0.34rem;
      background: #78bdf2;
      margin-right: 0.1rem;
    }
  }
  .download-list-title::after {
    position: absolute;
    content: "";
    width: 1rem;
    bottom: 0;
    left: 50%;
    margin-left: -0.5rem;
    height: 1px;
    background: #78bdf2;
  }
  .download-list-content {
    .download-list-content-top {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.3rem;
      color: #7c8591;
    }
    .download-list-box {
      background: #f0f2f7;
      border-radius: 0.25rem;
      height: 0.6rem;
      margin: 0 auto 0.2rem;
      width: 4rem;
      .download-list-icon {
        height: 0.3rem;
        margin-right: 0.2rem;
        margin-top: 0.05rem;
        margin-left: 1rem;
      }
      .download-list-fonts {
        color: #303030;
        font-size: 0.26rem;
      }
    }
  }
  .reminds-box {
    height: 0.8rem;
    border: #e3e6eb 1px solid;
    color: #3d3737;
    margin-top: 0.3rem;
    .van-checkbox {
      margin-right: 0.15rem;
    }
  }
  .close-btn {
    height: 1rem;
    line-height: 1rem;
    color: #a8b3c3;
    font-size: 0.34rem;
  }
}
.van-popup {
  background: none;
  .confirm-sub-box {
    width: 5.5rem;
    border-radius: 0.1rem;
    overflow: hidden;
    background: #ffffff;
    .confirm-sub-line {
      height: 0.15rem;
      background: linear-gradient(90deg, #78bdf2 0%, #2383fc 100%);
    }
    .confirm-sub-line-yellow {
      background: linear-gradient(90deg, #ffba00 0%, #e78800 100%);
    }
    .confirm-sub-line-red {
      background: #e90619;
    }
    .confirm-sub-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.34rem;
      font-weight: bold;
      color: #303030;
      margin-top: 0.3rem;
      .confirm-sub-title-left {
        width: 0.35rem;
        margin-right: 0.1rem;
        border-radius: 50%;
      }
      .confirm-title-icon {
        height: 0.3rem;
        margin-right: 0.1rem;
      }
    }
    .confirm-sub-content {
      font-size: 0.28rem;
      color: #303030;
      width: 3.8rem;
      margin: 0.2rem auto 0;
      .confirm-sub-content-list {
        text-align: left;
        .confirm-sub-content-list-left {
          color: #7c8591;
          width: 1.4rem;
        }
        .confirm-sub-content-list-right {
          width: 2.4rem;
          text-align: left;
        }
        .confirm-sub-content-list-blue {
          color: #1d9dfc;
        }
      }
    }
    .confirm-sub-bottom {
      border-top: #e6e8ee 1px solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      .confirm-sub-btn {
        height: 0.8rem;
        width: 100%;
        font-size: 0.3rem;
        color: #a8b3c3;
        text-align: center;
        line-height: 0.8rem;
        border-right: #e6e8ee 1px solid;
        cursor: pointer;
      }
      .confirm-sub-btn2 {
        color: #303030;
        border-right: none;
      }
    }
  }
}
.cover-show {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2020;
}
.word-cup-top-area {
  padding: 0 0.11rem;

  margin: 0.2rem 0;
  .word-cup-top-nav {
    .top-emc-logo {
      height: 0.98rem;
      margin-top: 0.2rem;
    }
    .top-nav-tab {
      height: 0.6rem;
      background: #eeeeee;
      border-radius: 0.4rem;
      width: 2.94rem;
      .top-sports-switch {
        height: 0.48rem;
        width: 1.4rem;
        border-radius: 0.4rem;
        font-size: 0.28rem;
        color: #494949;
        .nav-fonts-img {
          height: 0.34rem;
        }
        .nav-fonts-img2 {
          height: 0.3rem;
        }
      }
      .top-sports-switch-chosed {
        background: linear-gradient(90deg, #c92c48 0%, #872634 100%);
        color: #ffffff;
      }
      .top-sports-switch-chosed-blue {
        background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
        color: #ffffff;
      }
    }
  }
}
.word-cup-entertainment {
  background: url(../../../static/images/word-cup-top-bg.png) center top
    no-repeat;
  background-size: 100% 3.58rem;
  // background-color: #FFFFFF;
}
.Sports_body {
  margin-top: 0.24rem;
  padding: 0.1rem;
  height: 3.64rem;
  background: #ffffff;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .Sports_body_dis {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.24rem;
    font-family: PingFang SC-Regular, PingFang SC;
    color: #4282f5;
    padding-top: 0.1rem;
    .Sports_body_dis_L {
      display: flex;
      align-items: center;

      .Sports_body_dis_img_L {
      }
    }

    .Sports_body_dis_img {
      width: 0.1222rem;
      height: 0.18rem;
      margin-left: 0.1rem;
    }
  }
  .Sports_body_content {
    height: 2.88rem;
    border: 1px solid #707070;
    border-radius: 0px 0px 0.16rem 0.16rem;
  }
}
</style>
