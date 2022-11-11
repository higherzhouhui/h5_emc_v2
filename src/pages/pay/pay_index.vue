<template>
  <div class="pay-body">
    <div class="replace-header">
      <div class="goBack" @click="goBack()">
        <img
          src="../../../static/images/back-icon.png"
          alt=""
          class="back-icon"
        />
      </div>
      <div class="header-title">虚拟币充值</div>
      <!-- <div class="header-title" @click="toQuickDeposit()">充值</div> -->
      <div class="header-right" @click="getHelpInfo()">
        <img src="../../../static/images/head-help-icon.png" alt="" />
      </div>
    </div>
    <div class="main-content">
      <div class="top-pay-type-box">
        <div class="pay-type-list-box flex-b" ref="navBox"></div>
      </div>
      <van-swipe
        class="my-swipe"
        ref="swiper"
        @change="swiperChange"
        :show-indicators="false"
        :touchable="false"
      >
        <!-- 虚拟币模块 -->
        <van-swipe-item v-if="virtualData.length > 0">
          <div
            class="main-box main-box-virtual"
            id="virtualHeight"
            ref="itemHeight_2"
          >
            <div class="bank-type-content">
              <div class="second-title-box flex">
                <div class="left-blue-line"></div>
                <div class="second-title-fonts">充值方式</div>
              </div>
              <div class="pay-channel-box">
                <transition name="fade-transform" mode="out-in">
                  <div
                    class="pay-channel-line pay-channel-line-top flex relative animated fadeInLeftBig"
                    v-if="switchVirtualChannels1"
                  >
                    <div
                      class="pay-channel-list relative"
                      v-for="(item, index) in virtualData1"
                      :key="index"
                      :class="
                        virtualChannels === index
                          ? 'virtual-channel-avtived'
                          : ''
                      "
                      @click="virtualChannelSwitch(index, 1)"
                    >
                      <img :src="item.payImage" alt="" class="top-icon" />
                      <div
                        class="pay-channel-name bold flex-c pay-channel-name-gray"
                      >
                        {{ item.payName }}
                        <img
                          v-if="item.hot === true"
                          src="../../../static/images/pay-channel-hot-icon.png"
                          alt=""
                          class="pay-channel-hot"
                        />
                      </div>
                      <div class="pay-channel-limit bold">
                        限额:{{ item.cashMin }}-{{ item.cashMax }}
                      </div>
                      <img
                        v-if="virtualChannels === index"
                        src="../../../static/images/channel-side-mark-icon.png"
                        alt=""
                        class="channel-side-mark"
                      />
                    </div>
                    <div
                      class=""
                      v-if="virtualData.length > 9"
                      @click="switchVirtualChannelsShow(1)"
                    >
                      <lottie
                        class="pay-channel-more"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                  </div>
                </transition>
                <transition name="fade-transform2" mode="out-in">
                  <div
                    class="pay-channel-line pay-channel-line-top flex relative animated fadeInLeftBig"
                    v-if="switchVirtualChannels2 && virtualData.length > 9"
                  >
                    <div
                      class="pay-channel-list relative"
                      v-for="(item, index) in virtualData2"
                      :key="index"
                      :class="
                        virtualChannels2 === index
                          ? 'virtual-channel-avtived'
                          : ''
                      "
                      @click="virtualChannelSwitch(index, 2)"
                    >
                      <img :src="item.payImage" alt="" class="top-icon" />
                      <div
                        class="pay-channel-name bold flex-c pay-channel-name-gray"
                      >
                        {{ item.payName }}
                        <img
                          v-if="item.hot === true"
                          src="../../../static/images/pay-channel-hot-icon.png"
                          alt=""
                          class="pay-channel-hot"
                        />
                      </div>
                      <div class="pay-channel-limit bold">
                        限额:{{ item.cashMin }}-{{ item.cashMax }}
                      </div>
                      <img
                        v-if="virtualChannels2 === index"
                        src="../../../static/images/channel-side-mark-icon.png"
                        alt=""
                        class="channel-side-mark"
                      />
                    </div>
                    <div class="" @click="switchVirtualChannelsShow(2)">
                      <lottie
                        class="pay-channel-more2"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div
              class="bank-type-content bank-type-content2 bank-type-content3"
            >
              <div class="second-title-box flex-b">
                <div class="second-title-left flex">
                  <div class="left-blue-line"></div>
                  <div class="second-title-fonts">充值金额</div>
                </div>
                <div
                  class="second-title-right gray-fonts"
                  v-if="payType !== 'ToPay'"
                >
                  参考汇率：1 USDT≈ {{ virtualRate }}CNY
                </div>
                <div
                  class="right-help"
                  v-if="payType === 'ToPay'"
                  @click="toHelpPage()"
                >
                  ToPay充值教程>
                </div>
              </div>
              <div class="pay-channel-box">
                <div class="pay-channel-line flex">
                  <div
                    class="bank-quick-list flex-c"
                    :class="
                      aliwechatQuickIndex === index
                        ? 'bank-quick-list-activing'
                        : ''
                    "
                    v-for="(item, index) in virtualQuickAmount"
                    @click="virtualQuickSelect(item, index)"
                  >
                    ￥{{ item }}
                    <img
                      src="../../../static/images/channel-side-mark-icon.png"
                      v-if="virtualQuickIndex === index"
                      alt=""
                      class="bank-quick-list-icon"
                    />
                  </div>
                </div>
              </div>
              <div class="input-amount-box flex-b">
                <div class="input-amount-left">
                  <div class="input-amount-fonts1 flex">
                    <div class="">充值金额:</div>
                    <input
                      ref="virtualInputAmount"
                      type="number"
                      oninput="if(value.length>10)value=value.slice(0,10)"
                      class="amount-input"
                      :placeholder="
                        '※单笔限额￥' +
                        inputMinVirtual +
                        '~￥' +
                        inputMaxVirtual
                      "
                      @input="virtualInputCheck()"
                    />
                  </div>
                  <div
                    class="input-amount-fonts2 red-fonts"
                    v-if="!virtualInputRight"
                  >
                    ※单笔限额￥{{ inputMinVirtual }} ~￥{{ inputMaxVirtual }}
                  </div>
                </div>
                <van-icon
                  v-if="virtualInputting"
                  @click="deleteVirtualInput()"
                  class="input-amount-right"
                  name="cross"
                />
              </div>
              <div class="input-amount-box flex-b" v-if="showAddress">
                <div class="input-amount-left">
                  <div class="input-amount-fonts1 input-amount-fonts2 flex-b">
                    <div class="" style="width: 1.6rem">充值地址:</div>
                    <!-- <input ref='virtualAddressInput' type="text" class="amount-input" placeholder="请输入虚拟币地址" @input='virtualInputCheck()'> -->
                    <div
                      class="virtual-address-fonts flex-b"
                      @click="showVirtualAcc()"
                    >
                      <span>{{ showVirtualCion }}</span>
                      <van-icon name="arrow-down" color="#A8B3C3" />
                    </div>
                  </div>
                </div>
                <!-- <van-icon v-if='virtualAddressInputting' @click="deleteVirtualAddressInput()" class="input-amount-right" name="cross"/> -->
              </div>
              <div class="virtual-bottom-fonts-box flex-b">
                <div class="">实际到账金额将以支付时汇率计算</div>
                <div class="blue-fonts" @click="toVirtualHelp()">
                  了解虚拟币 >
                </div>
              </div>
            </div>
            <div class="btn-area">
              <van-button
                v-if="virtualSubCheck"
                class="main-btn"
                color="#D7D7D8"
                block
                ><span class="disable-fonts">立即充值</span></van-button
              >
              <van-button
                v-if="!virtualSubCheck"
                class="main-btn"
                color="linear-gradient(to right, #78BDF2, #167BFF)"
                block
                @click="subDeposit('virtual')"
                >立即充值(约 {{ virtualSubUSDT }} USDT)</van-button
              >
              <div class="sub-reminds flex-a-s" v-if="hasExplainVirtual">
                <img
                  src="../../../static/images/login-verify-icon.png"
                  alt=""
                  class="sub-reminds-left"
                />
                <div class="sub-reminds-right">
                  <div
                    class="sub-reminds-right-list"
                    v-html="explainDataVirtual.replace(/\\n/g, '<br>')"
                  ></div>
                </div>
              </div>
            </div>
            <div class="virtual-discount flex-b">
              <img
                src="../../../static/images/virtual-deposit-discount-img1.png"
                alt=""
                @click="toDiscount(194)"
                class="virtual-discount-img"
              />
              <img
                src="../../../static/images/virtual-deposit-discount-img2.png"
                alt=""
                @click="toDiscount(168)"
                class="virtual-discount-img"
              />
            </div>
          </div>
        </van-swipe-item>
        <!-- '微信支付宝'模块 -->
        <van-swipe-item v-if="aliwechatData.length > 0">
          <div class="main-box" ref="itemHeight_3">
            <div class="bank-type-content">
              <div class="second-title-box flex">
                <div class="left-blue-line"></div>
                <div class="second-title-fonts">充值方式</div>
              </div>
              <div class="pay-channel-box">
                <transition name="fade-transform" mode="out-in">
                  <div
                    class="pay-channel-line pay-channel-line-top flex relative"
                    v-if="switchAliwechatChannels1"
                  >
                    <div
                      class="pay-channel-list relative"
                      v-for="(item, index) in aliwechatData1"
                      :key="index"
                      :class="
                        aliwechatChannels === index
                          ? 'alipay-channel-avtived'
                          : ''
                      "
                      @click="aliwechatChannelSwitch(index, 1)"
                    >
                      <img :src="item.payImage" alt="" class="top-icon" />
                      <div class="pay-channel-name bold pay-channel-name-gray">
                        {{ item.payName }}
                        <img
                          v-if="item.hot === true"
                          src="../../../static/images/pay-channel-hot-icon.png"
                          alt=""
                          class="pay-channel-hot"
                        />
                      </div>
                      <div class="pay-channel-limit bold">
                        限额:{{ item.cashMin }}-{{ item.cashMax }}
                      </div>
                      <img
                        v-if="aliwechatChannels === index"
                        src="../../../static/images/channel-side-mark-icon.png"
                        alt=""
                        class="channel-side-mark"
                      />
                    </div>
                    <div
                      class=""
                      v-if="aliwechatData.length > 9"
                      @click="switchAlichatChannelsShow(1)"
                    >
                      <lottie
                        class="pay-channel-more"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                  </div>
                </transition>
                <transition
                  :name="
                    aliwechatAni === 1 ? 'fade-transform2' : 'fade-transform'
                  "
                  mode="out-in"
                >
                  <div
                    class="pay-channel-line pay-channel-line-top flex relative"
                    v-if="switchAliwechatChannels2 && aliwechatData.length > 9"
                  >
                    <div
                      class="pay-channel-list relative"
                      v-for="(item, index) in aliwechatData2"
                      :key="index"
                      :class="
                        aliwechatChannels2 === index
                          ? 'alipay-channel-avtived'
                          : ''
                      "
                      @click="aliwechatChannelSwitch(index, 2)"
                    >
                      <img :src="item.payImage" alt="" class="top-icon" />
                      <div class="pay-channel-name bold pay-channel-name-gray">
                        {{ item.payName }}
                        <img
                          v-if="item.hot === true"
                          src="../../../static/images/pay-channel-hot-icon.png"
                          alt=""
                          class="pay-channel-hot"
                        />
                      </div>
                      <div class="pay-channel-limit bold">
                        限额:{{ item.cashMin }}-{{ item.cashMax }}
                      </div>
                      <img
                        v-if="aliwechatChannels2 === index"
                        src="../../../static/images/channel-side-mark-icon.png"
                        alt=""
                        class="channel-side-mark"
                      />
                    </div>
                    <div
                      class=""
                      v-if="aliwechatData.length > 18"
                      @click="switchAlichatChannelsShow(3)"
                    >
                      <lottie
                        class="pay-channel-more"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                    <div class="" @click="switchAlichatChannelsShow(2)">
                      <lottie
                        class="pay-channel-more2"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                  </div>
                </transition>
                <transition name="fade-transform2" mode="out-in">
                  <div
                    class="pay-channel-line pay-channel-line-top flex relative"
                    v-if="switchAliwechatChannels3 && aliwechatData.length > 18"
                  >
                    <div
                      class="pay-channel-list relative"
                      v-for="(item, index) in aliwechatData3"
                      :key="index"
                      :class="
                        aliwechatChannels3 === index
                          ? 'alipay-channel-avtived'
                          : ''
                      "
                      @click="aliwechatChannelSwitch(index, 3)"
                    >
                      <img :src="item.payImage" alt="" class="top-icon" />
                      <div class="pay-channel-name bold pay-channel-name-gray">
                        {{ item.payName }}
                        <img
                          v-if="item.hot === true"
                          src="../../../static/images/pay-channel-hot-icon.png"
                          alt=""
                          class="pay-channel-hot"
                        />
                      </div>
                      <div class="pay-channel-limit bold">
                        限额:{{ item.cashMin }}-{{ item.cashMax }}
                      </div>
                      <img
                        v-if="aliwechatChannels3 === index"
                        src="../../../static/images/channel-side-mark-icon.png"
                        alt=""
                        class="channel-side-mark"
                      />
                    </div>
                    <div class="" @click="switchAlichatChannelsShow(4)">
                      <lottie
                        class="pay-channel-more2"
                        style="width: 0.68rem; height: unset"
                        :options="defaultOptions"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div class="bank-type-content bank-type-content2">
              <div class="second-title-box flex-b">
                <div class="flex">
                  <div class="left-blue-line"></div>
                  <div class="second-title-fonts">充值金额</div>
                </div>
                <div
                  class="right-help"
                  v-if="payType === 'ToPay'"
                  @click="toHelpPage()"
                >
                  ToPay充值教程>
                </div>
              </div>
              <div class="pay-channel-box">
                <div class="pay-channel-line flex">
                  <div
                    class="bank-quick-list flex-c"
                    :class="
                      aliwechatQuickIndex === index
                        ? 'bank-quick-list-activing'
                        : ''
                    "
                    v-for="(item, index) in aliwechatQuickAmount"
                    @click="alichatQuickSelect(item, index)"
                  >
                    ￥{{ item }}
                    <img
                      src="../../../static/images/channel-side-mark-icon.png"
                      v-if="aliwechatQuickIndex === index"
                      alt=""
                      class="bank-quick-list-icon"
                    />
                  </div>
                </div>
              </div>
              <div class="input-amount-box flex-b">
                <div class="input-amount-left">
                  <div class="input-amount-fonts1 flex">
                    <div class="">充值金额:</div>
                    <input
                      ref="aliwechatInputAmount"
                      type="number"
                      oninput="if(value.length>10)value=value.slice(0,10)"
                      class="amount-input"
                      :placeholder="
                        '※单笔限额￥' +
                        inputMinAliwechat +
                        '~￥' +
                        inputMaxAliwechat
                      "
                      @input="alichatInputCheck()"
                    />
                  </div>
                  <div
                    class="input-amount-fonts2 red-fonts"
                    v-if="!aliwechatInputRight"
                  >
                    ※单笔限额￥{{ inputMinAliwechat }} ~￥{{
                      inputMaxAliwechat
                    }}
                  </div>
                </div>
                <van-icon
                  v-if="aliwechatInputting"
                  @click="deleteAlichatInput()"
                  class="input-amount-right"
                  name="cross"
                />
              </div>
            </div>
            <div class="btn-area">
              <van-button
                v-if="aliwechatSubCheck"
                class="main-btn"
                color="#D7D7D8"
                block
                ><span class="disable-fonts">立即充值</span></van-button
              >
              <van-button
                v-if="!aliwechatSubCheck"
                class="main-btn"
                color="linear-gradient(to right, #78BDF2, #167BFF)"
                block
                @click="subDeposit('aliwechat')"
                >立即充值</van-button
              >
              <div class="sub-reminds flex-a-s" v-if="hasExplainAliwechat">
                <img
                  src="../../../static/images/login-verify-icon.png"
                  alt=""
                  class="sub-reminds-left"
                />
                <div class="sub-reminds-right">
                  <div
                    class="sub-reminds-right-list"
                    v-html="explainDataAliwechat.replace(/\\n/g, '<br>')"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 银行卡付款信息弹框 -->
    <van-popup v-model="depositInfoPop">
      <div class="deposit-info-content">
        <div class="deposit-info-top-line"></div>
        <div class="deposit-info-title-box flex-c">
          <div class="left-blue-line"></div>
          <div class="second-title-fonts bold">付款通知</div>
        </div>
        <div class="deposit-input-area">
          <div class="input-title bold">【付款资料】</div>
          <div class="input-list2 flex" ref="nameFocus">
            <div class="input-list-left">付款人姓名：</div>
            <input
              ref="nameValue"
              type="text"
              maxlength="16"
              placeholder="请输入付款人姓名"
              @input="checkInfoInput()"
              @blur="inputActiving(1)"
              @focus="inputFinish(1)"
            />
          </div>
          <div class="input-list flex" ref="cardFocus">
            <div class="input-list-left">付款人卡号：</div>
            <input
              ref="cardNumValue"
              class="card-num-input"
              placeholder="请输入卡号末尾4位"
              type="number"
              @input="checkInfoInput(2)"
              @blur="inputActiving(2)"
              @focus="inputFinish(2)"
            />
          </div>
          <div class="bottom-info-box">
            <div class="bottom-info-title flex">
              <div class="blue-point"></div>
              <div class="">温馨提示</div>
            </div>
            <div class="bottom-info-content">
              请勿自行存款至旧账户，若存款至旧账户，本公司将无法查收，恕不负责。如有任何疑问，请联系在线客服获取帮助。
            </div>
          </div>
        </div>
        <div class="bottom-btn-box flex-b">
          <div
            class="bottom-btn bottom-btn1"
            :class="depositInputFinish === true ? 'btn-activing1' : ''"
            @click="depositInfoPop = false"
          >
            关闭
          </div>
          <div
            class="bottom-btn bottom-btn2"
            :class="depositInputFinish === true ? 'btn-activing2' : ''"
            @click="subBankInfo()"
          >
            确定
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 银行卡收款资料弹框 -->
    <van-popup v-model="sysbankInfoPop">
      <div class="deposit-info-content" ref="screenBoxBank">
        <div class="deposit-info-top-line"></div>
        <div class="deposit-info-title-box flex-c">
          <div class="left-blue-line"></div>
          <div class="second-title-fonts bold">收款资料</div>
        </div>
        <div class="deposit-input-area">
          <div class="input-title bold">【收款资料】</div>
          <div class="virtual-info-list-box">
            <div class="virtual-address-box flex-b">
              <div class="gray-fonts">收款银行: {{ sysbankData.bankName }}</div>
            </div>
            <div class="virtual-address-box sys-bank-info flex-b">
              <div class="gray-fonts">收 款 人:{{ sysbankData.realName }}</div>
              <img
                src="../../../static/images/copy-icon.png"
                alt=""
                class="copy-icon"
                @click="copyContent('name')"
              />
            </div>
            <div class="virtual-address-box sys-bank-info flex-b">
              <div class="gray-fonts">
                收款卡号:{{ sysbankData.cardNumber }}
              </div>
              <img
                src="../../../static/images/copy-icon.png"
                alt=""
                class="copy-icon"
                @click="copyContent('cardNum')"
              />
            </div>
            <div class="virtual-address-box sys-bank-info flex-b">
              <div class="gray-fonts">收款支行:{{ sysbankData.address }}</div>
              <img
                src="../../../static/images/copy-icon.png"
                alt=""
                class="copy-icon"
                @click="copyContent('adress')"
              />
            </div>
            <div class="virtual-address-box sys-bank-info flex-b">
              <div class="gray-fonts">收款金额:{{ subBankAmount }}</div>
              <img
                src="../../../static/images/copy-icon.png"
                alt=""
                class="copy-icon"
                @click="copyContent('cash')"
              />
            </div>
          </div>
          <div class="bottom-info-box">
            <div class="bottom-info-title flex">
              <div class="blue-point"></div>
              <div class="">温馨提示</div>
            </div>
            <div class="bottom-info-content">
              1.请使用和注册姓名一致的银行卡进行转账存款，使用其他非您注册姓名一致的银行卡进行转账存款将无法即时到账。
            </div>
            <div class="bottom-info-content">
              2.每次存款前，请先至本页面最新的收款账户。请勿自行存款至旧账户，若存款至旧账户，本公司将无法查收，恕不负责。
            </div>
          </div>
        </div>
        <div class="bottom-btn-box flex-b">
          <div
            class="bottom-btn bottom-btn1 bottom-btn3"
            @click="sysbankInfoPop = false"
          >
            关闭
          </div>
          <div class="bottom-btn blue-fonts bold" @click="screenshots(2)">
            一键截图
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 虚拟币收款资料弹框 -->
    <van-popup v-model="virtualInfoPop">
      <div class="deposit-info-content" ref="screenBox">
        <div class="deposit-info-top-line"></div>
        <div class="deposit-info-title-box flex-c">
          <div class="left-blue-line"></div>
          <div class="second-title-fonts bold">收款资料</div>
        </div>
        <div class="deposit-input-area">
          <div class="input-title bold">【收款资料】</div>
          <div class="virtual-info-list-box">
            <div class="virtual-info-list">
              充值人民币: <span class="bold">{{ virtualSubAmount }}</span>
            </div>
            <div class="virtual-info-list">
              充值USDT:<span class="bold blue">{{ virtualSubUSDT }}</span>
            </div>
            <div class="virtual-info-list">
              发起时间:<span class="bold">{{ virtualSubTime }}</span>
            </div>
            <div class="virtual-info-list virtual-info-list2 bold">
              【{{ virtualType }}地址】
            </div>
            <div class="virtual-address-box flex-b">
              <div class="blue-fonts">{{ virtualAddress }}</div>
              <img
                src="../../../static/images/copy-icon.png"
                alt=""
                class="copy-icon"
                @click="copyContent('virtual')"
              />
            </div>
            <div ref="qrValue" class="qr-img-box flex-c" id="qrcodeImg"></div>
          </div>

          <div class="bottom-info-box">
            <div class="bottom-info-title flex">
              <div class="blue-point"></div>
              <div class="">温馨提示</div>
            </div>
            <div class="bottom-info-content">
              请勿自行存款至旧账户，若存款至旧账户，本公司将无法查收，恕不负责。如有任何疑问，请联系在线客服获取帮助。
            </div>
          </div>
        </div>
        <div class="bottom-btn-box flex-b">
          <div
            class="bottom-btn bottom-btn1 bottom-btn3"
            @click="closeVirtualSub()"
          >
            关闭
          </div>
          <div class="bottom-btn blue-fonts bold" @click="screenshots(1)">
            一键截图
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 虚拟币账户选择 -->
    <van-popup class="popup-content" v-model="showSelect2" position="bottom">
      <van-picker
        show-toolbar
        :columns="pickerListErc"
        :title="'请选择虚拟币帐户'"
        @confirm="onConfirmErc"
        @cancel="showSelect2 = false"
        swipe-duration="500"
      />
    </van-popup>
    <van-popup class="popup-content" v-model="showSelect3" position="bottom">
      <van-picker
        show-toolbar
        :columns="pickerListTrc"
        :title="'请选择虚拟币帐户'"
        @confirm="onConfirmTrc"
        @cancel="showSelect3 = false"
        swipe-duration="500"
      />
    </van-popup>
    <!-- 第一次极速充值 -->
    <van-popup v-model="firstDeposit" :close-on-click-overlay="false">
      <div class="confirm-sub-box">
        <div class="confirm-sub-line"></div>
        <div class="confirm-sub-title">
          <span class="confirm-sub-title-left"></span>极速充值注意事项
        </div>
        <div class="confirm-sub-content">
          <div class="confirm-sub-content-red text-c">
            请遵守下方规则<br />
            若不当操作导致资金损失，平台概不负责
          </div>
          <div class="confirm-sub-content-normal">
            1. 请在<span class="red-fonts bold">30分钟</span>内进行充值。<br />
            2. 并且于<span class="red-fonts bold">30分钟</span>内提供存款凭证
            (图片)。<br />
            3. 请依照选择金额充值，禁止修改充值金额。
          </div>
        </div>
        <div
          class="confirm-sub-content-gray flex-c"
          @click="radioChecked = !radioChecked"
        >
          <div class="check-box">
            <img
              v-if="!radioChecked"
              src="../../../static/images/check-box-uncheck.png"
              alt=""
              class="check-box-icon"
            />
            <img
              v-if="radioChecked"
              src="../../../static/images/check-box-checked.png"
              alt=""
              class="check-box-icon"
            />
            <span>我已清楚明白注意事项</span>
          </div>
        </div>
        <div
          class="confirm-sub-content-gray confirm-sub-content-gray2 flex-c"
          @click="radioChecked2 = !radioChecked2"
        >
          <div class="check-box">
            <img
              v-if="!radioChecked2"
              src="../../../static/images/check-box-uncheck.png"
              alt=""
              class="check-box-icon"
            />
            <img
              v-if="radioChecked2"
              src="../../../static/images/check-box-checked.png"
              alt=""
              class="check-box-icon"
            />
            <span>24小时内不再提醒</span>
          </div>
        </div>
        <div class="confirm-sub-bottom">
          <div class="confirm-sub-btn" v-if="!radioChecked">确认</div>
          <div
            class="confirm-sub-btn confirm-sub-btn2"
            v-if="radioChecked"
            @click="setFirstFn()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 客服选择弹框 -->
    <van-action-sheet v-model="helpList">
      <div class="help-list-box">
        <img
          src="../../../static/images/help-list-img1.png"
          alt=""
          class="help-list"
          @click="showNoticeFn(1)"
          v-if="showHelp1"
        />
        <img
          src="../../../static/images/help-list-img2.png"
          alt=""
          class="help-list"
          @click="showNoticeFn(2)"
          v-if="showHelp2"
        />
        <div class="help-close-btn">
          <div class="help-close-btn-fonts flex-c" @click="helpList = false">
            取消
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 客服平台公告弹框 -->
    <van-popup
      v-model="showNotice"
      class="notice-pop"
      :close-on-click-overlay="false"
    >
      <div class="notice-line"></div>
      <div class="notice-title bold flex-c">
        <div class="title-left"></div>
        客服公告
      </div>
      <div class="notice-time flex-c">{{ helpData.windowBeginTime }}</div>
      <div class="notice-title-2 text-c">{{ helpData.windowTitle }}</div>
      <div class="notice-content" v-html="helpData.windowContent"></div>
      <div class="bottom-btn flex-c" @click="toHelpMode(helpIndex)">
        我已了解
      </div>
    </van-popup>
    <input
      id="copy_content"
      type="text"
      value=""
      style="position: absolute; top: 0; left: 0; opacity: 0; z-index: -10"
      readonly
    />
    <van-popup v-model="uploading" :close-on-click-overlay="false">
      <van-loading type="spinner" color="#1989fa" size="40px" />
    </van-popup>
    <van-popup
      v-model="uploadImgShow"
      class="check-upload-img-box"
      :close-on-click-overlay="false"
    >
      <img :src="imgSrc" alt="" class="check-upload-img" />
      <div class="img-close-box" @click="uploadImgShow = false">
        <van-icon class="img-close-icon" name="clear" size=".5rem" />
      </div>
    </van-popup>
    <!-- 充值前提醒弹框 -->
    <van-popup
      v-model="everyDeposit"
      :close-on-click-overlay="false"
      get-container=".main-content"
    >
      <div class="confirm-sub-box">
        <div class="confirm-sub-line every-top-line"></div>
        <div class="confirm-sub-title">
          <img
            src="../../../static/images/alert-icon.png"
            alt=""
            class="left-icon"
          />
          重要提醒
        </div>
        <div class="confirm-sub-content confirm-sub-content2">
          <div class="">
            为了避免延迟上分<br />
            -<span class="red bold">请勿修改金额、保存支付、延迟支付。</span>
          </div>
        </div>
        <div class="confirm-sub-content confirm-sub-content2">
          <div class="">【未按提示操作，造成损失概不负责！】</div>
        </div>
        <div
          class="confirm-sub-content-gray confirm-sub-content-gray3 flex-c"
          @click="radioCheckedEvery = !radioCheckedEvery"
        >
          <div class="check-box flex">
            <img
              v-if="!radioCheckedEvery"
              src="../../../static/images/check-box-uncheck.png"
              alt=""
              class="check-box-icon"
            />
            <img
              v-if="radioCheckedEvery"
              src="../../../static/images/check-box-checked.png"
              alt=""
              class="check-box-icon"
            />
            <span>我已清楚明白注意事项</span>
          </div>
        </div>
        <div
          class="confirm-sub-content-gray confirm-sub-content-gray3 border-top flex-c"
          @click="radioCheckedEvery2 = !radioCheckedEvery2"
        >
          <div class="check-box flex">
            <img
              v-if="!radioCheckedEvery2"
              src="../../../static/images/check-box-uncheck.png"
              alt=""
              class="check-box-icon"
            />
            <img
              v-if="radioCheckedEvery2"
              src="../../../static/images/check-box-checked.png"
              alt=""
              class="check-box-icon"
            />
            <span>24小时内不再提醒</span>
          </div>
        </div>
        <div class="confirm-sub-bottom">
          <div
            class="confirm-sub-btn confirm-sub-btn2"
            @click="everyDeposit = false"
          >
            取消
          </div>
          <div class="confirm-sub-btn" v-if="!radioCheckedEvery">确认</div>
          <div
            class="confirm-sub-btn confirm-sub-btn2"
            v-if="radioCheckedEvery"
            @click="cfmSub()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!--loading-new-->
    <div class="loading-new" v-if="showLoading">
      <img src="../../../static/images/allLoading.gif" alt="" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import toastPop from "../../components/toast/toast_js";
import arrow from "@/assets/lottie/depositArrow_2.json";
import {
  mobileModel,
  browserName,
  osVersion,
  browserVersion,
} from "mobile-device-detect";
import quickComponent from "../../pages/pay/quickDeposit";
import dayjs from "dayjs";
// import $ from jquery
export default {
  name: "pay_index",
  components: {
    html2canvas,
    toastPop,
    quickComponent,
  },
  data() {
    return {
      payTypeTab: 0,
      bankChannel: 0,
      bankChannel2: -1,
      bankChannel3: -1,
      virtualChannels: 0,
      virtualChannels2: -1,
      aliwechatChannels: 0,
      aliwechatChannels2: -1,
      aliwechatChannels3: -1,
      switchChannels1: true,
      switchChannels2: false,
      switchChannels3: false,
      switchVirtualChannels1: true,
      switchVirtualChannels2: false,
      switchAliwechatChannels1: true,
      switchAliwechatChannels2: false,
      switchAliwechatChannels3: false,
      customerChannels: 0,
      customerChannels2: -1,
      switchCustomerChannels1: true,
      switchCustomerChannels2: false,
      wechatChannels: 0,
      wechatChannels2: -1,
      switchWechatChannels1: true,
      switchWechatChannels2: false,
      allData: [],
      jisuData: [],
      bankData: [],
      bankData1: [],
      bankData2: [],
      bankData3: [],
      bankQuickAmount: [],
      virtualQuickAmount: [],
      aliwechatQuickAmount: [],
      wechatQuickAmount: [],
      virtualData: [],
      virtualData1: [],
      virtualData2: [],
      aliwechatData: [],
      aliwechatData1: [],
      aliwechatData2: [],
      aliwechatData3: [],
      wechatData: [],
      wechatData1: [],
      wechatData2: [],
      customerData: [],
      customerData1: [],
      customerData2: [],
      customerData3: [],
      inputMin: 100,
      inputMax: 49999,
      inputMinVirtual: 0,
      inputMaxVirtual: 0,
      inputMinAliwechat: 0,
      inputMaxAliwechat: 0,
      // inputMinCustomer:0,
      // inputMaxCustomer:0,
      inputMinWechat: 0,
      inputMaxWechat: 0,
      amountInputting: false,
      virtualInputting: false,
      // virtualAddressInputting:false,
      alipayInputting: false,
      aliwechatInputting: false,
      customerInputting: false,
      wechatInputting: false,
      bankInputRight: true,
      virtualInputRight: true,
      alipayInputRight: true,
      aliwechatInputRight: true,
      customerInputRight: true,
      wechatInputRight: true,
      hasExplain: false,
      hasExplainVirtual: false,
      hasExplainAliwechat: false,
      // hasExplainCustomer:false,
      hasExplainWechat: false,
      explainData: "",
      explainDataVirtual: "",
      explainDataAliwechat: "",
      explainDataCustomer: "",
      explainDataWechat: "",
      bankSubCheck: true,
      virtualSubCheck: true,
      aliwechatSubCheck: true,
      customerSubCheck: true,
      wechatSubCheck: true,
      depositInfoPop: false,
      payId: -1,
      depositInputFinish: false,
      errorPop: false,
      errorFonts: "123",
      virtualInfoPop: false,
      virtualSubAmount: "",
      virtualSubUSDT: "",
      virtualSubTime: "",
      virtualAddress: "",
      virtualType: "",
      virtualRate: "",
      virtualHelpParams: {},
      sysbankInfoPop: false,
      sysbankData: {},
      subBankAmount: "",
      subBankRealname: "",
      subBankCard: "",
      showLoading: false,
      successPop: false,
      successFonts: "",
      bankAni: 1,
      aliwechatAni: 1,
      defaultOptions: { animationData: arrow, loop: true, autoplay: true },
      payType: "",
      subCash: "",
      bankQuickIndex: -1,
      virtualQuickIndex: -1,
      aliwechatQuickIndex: -1,
      customerQuickIndex: -1,
      wechatQuickIndex: -1,
      virtualInfo: "",
      showAddress: false,
      helpList: false,
      showHelp1: false,
      showHelp2: false,
      helpData: {},
      firstDeposit: false,
      radioChecked: false,
      radioChecked2: false,
      uploading: false,
      uploadImgShow: false,
      imgSrc: "",
      showFixedBottom: true,
      showFixedBottom2: false,
      everyDeposit: false,
      showEveryDeposit: false,
      subParam: "",
      radioCheckedEvery: false,
      radioCheckedEvery2: false,

      showSelect2: false,
      showSelect3: false,
      pickerListErc: [],
      pickerListTrc: [],
      showVirtualCion: "请选择虚拟币帐户",
      virtualDataErc: [],
      virtualDataTrc: [],
      memberVirtualId: 0,

      swiperName: "",
      showNotice: false,
      helpNoticeSwitch: false,
      helpIndex: -1,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next();
  },
  mounted() {},
  created() {
    this.loadTop();
    this.getRateInfo();
    // this.getHint()
    // this.getVirtualHelp()
    this.getCookieEvery();
  },
  methods: {
    cfmSub() {
      if (this.radioCheckedEvery2 === true) {
        this.setCookieEvery("false", 1);
      }
      this.everyDeposit = false;
      this.subDeposit(this.subParam, 1);
    },
    // 读取提交弹框cookie
    getCookieEvery() {
      let status;
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //显示的格式需要切割
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] === "normalDepositSub") {
            status = arr2[1]; //
          }
        }
      }
      if (status !== "false") {
        this.showEveryDeposit = true;
      }
    },
    //设置提交弹框cookie
    setCookieEvery(c_status, exdays) {
      this.showEveryDeposit = false;
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "normalDepositSub" +
        "=" +
        c_status +
        ";path=/;expires=" +
        exdate.toGMTString();
    },
    queryImgSwitchFn(value) {
      if (value === "true") {
        this.showImgFn();
      }
    },
    showImgFn(value) {
      this.uploadImgShow = true;
      this.imgSrc = value;
    },
    setFirstFn() {
      if (this.radioChecked2 === true) {
        this.setCookie("false", 1);
      }
      this.firstDeposit = false;
    },
    // 是否第一次极速存款
    getCookie() {
      let status;
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //显示的格式需要切割
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] === "quickDepositFirst") {
            status = arr2[1]; //
          }
        }
      }
      if (status !== "false" && this.jisuData.length > 0) {
        this.firstDeposit = true;
      }
    },
    //设置'记住'功能cookie
    setCookie(c_status, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "quickDepositFirst" +
        "=" +
        c_status +
        ";path=/;expires=" +
        exdate.toGMTString();
    },
    loadingFn(value) {
      if (value === "true") {
        this.uploading = true;
      } else {
        this.uploading = false;
      }
    },
    routerChange(value) {
      if (value === "true") {
        this.$router.back();
      }
    },
    toQuickDeposit() {
      // this.$router.push('/quickDeposit')
    },
    swiperChange(index) {
      this.payTypeTab = index;
      this.$nextTick(() => {
        if (this.swiperName === "jisu") {
          document.getElementsByClassName("my-swipe")[0].style.height =
            this.$refs.itemHeight_0.offsetHeight + "px";
        } else if (this.swiperName === "bank") {
          document.getElementsByClassName("my-swipe")[0].style.height =
            this.$refs.itemHeight_1.offsetHeight + "px";
        } else if (this.swiperName === "virtual") {
          document.getElementsByClassName("my-swipe")[0].style.height =
            this.$refs.itemHeight_2.offsetHeight + "px";
        } else if (this.swiperName === "aliwechat") {
          document.getElementsByClassName("my-swipe")[0].style.height =
            this.$refs.itemHeight_3.offsetHeight + "px";
        } else if (this.swiperName === "customer") {
          document.getElementsByClassName("my-swipe")[0].style.height =
            this.$refs.itemHeight_4.offsetHeight + "px";
        }
      });
      // if(index !== 0) {
      // this.$nextTick(() => {
      //     document.getElementsByClassName('van-swipe')[0].style.height = document.getElementsByClassName('main-box')[index].clientHeight + 'px'
      // })
      // }
      // this.$refs.swiper.resize()
      if (index > 2 && this.allData.length > 4) {
        this.$refs.navBox.style.marginLeft = "-1.2rem";
      } else if (index < 2 && this.allData.length > 4) {
        this.$refs.navBox.style.marginLeft = "0";
      }
    },
    screenshots(value) {
      if (value === 1) {
        html2canvas(this.$refs.screenBox).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.setAttribute("download", this.virtualSubTime + ".png");
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
        });
      } else if (value === 2) {
        html2canvas(this.$refs.screenBoxBank).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.setAttribute("download", this.virtualSubTime + ".png");
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
        });
      }
    },
    qrcode() {
      document.getElementById("qrcodeImg").innerHTML = "";
      new QRCode("qrcodeImg", {
        width: 100,
        height: 100,
        text: this.virtualAddress, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff",
      });
    },
    goBack() {
      this.$router.back();
    },
    loadTop() {
      let params = {
        visitType: "APP",
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(this.API.getPayType, params, this.depositList);
    },
    initIndex() {
      if (sessionStorage.getItem("helpIndex") === "virtual") {
        this.allData.forEach((v, t) => {
          if (v.name === "virtual") {
            this.switchPayType(t, "virtual");
            sessionStorage.removeItem("helpIndex");
          }
        });
      } else {
      }
    },
    depositList(success, data) {
      if (success) {
        if (data.code === "0000") {
          for (var item in data.data) {
            if (item === "bank") {
              this.allData.push({ name: "bank", data: data.data[item] });
            } else if (item === "virtual") {
              this.allData.push({ name: "virtual", data: data.data[item] });
            } else if (item === "aliwechat") {
              this.allData.push({ name: "aliwechat", data: data.data[item] });
            } else if (item === "alipay") {
              this.allData.push({ name: "alipay", data: data.data[item] });
            } else if (item === "customer") {
              this.allData.push({ name: "customer", data: data.data[item] });
            } else if (item === "wechatpay") {
              this.allData.push({ name: "wechatpay", data: data.data[item] });
            } else if (item === "jisu") {
              this.allData.push({ name: "jisu", data: data.data[item] });
            }
          }
          if (this.allData.length > 4) {
            this.$refs.navBox.style.width = "8.8rem";
          }
          //处理极速充值数据
          if (data.data.jisu !== undefined) {
            this.jisuData = data.data.jisu.payList;
            this.payId = this.jisuData[0].payId;
            this.getCookie();
          }
          //处理银行卡充值数据
          if (data.data.bank !== undefined) {
            this.bankData = data.data.bank.payList;
            this.payId = this.bankData[0].payId;
            this.payType = this.bankData[0].payType;
            if (this.bankData.length > 9 && this.bankData.length <= 18) {
              this.bankData1 = this.bankData.slice(0, 9);
              this.bankData2 = this.bankData.slice(9);
            } else if (this.bankData.length > 18) {
              this.bankData1 = this.bankData.slice(0, 9);
              this.bankData2 = this.bankData.slice(9, 18);
              this.bankData3 = this.bankData.slice(18);
            } else {
              this.bankData1 = this.bankData;
            }
            this.bankQuickAmount = this.bankData1[0].suggestAmountList;
            this.inputMin = this.bankData[0].cashMin;
            this.inputMax = this.bankData[0].cashMax;
            if (
              this.bankData[0].explain === null ||
              this.bankData[0].explain === ""
            ) {
              this.hasExplain = false;
            } else {
              this.hasExplain = true;
              this.explainData = this.bankData[0].explain;
            }
          }
          //处理虚拟币充值数据
          if (data.data.virtual !== undefined) {
            this.virtualData = data.data.virtual.payList;
            this.virtualQuickAmount = this.virtualData[0].suggestAmountList;
            this.inputMinVirtual = this.virtualData[0].cashMin;
            this.inputMaxVirtual = this.virtualData[0].cashMax;
            if (this.virtualData.length > 9) {
              this.virtualData1 = this.virtualData.slice(0, 9);
              this.virtualData2 = this.virtualData.slice(9);
            } else {
              this.virtualData1 = this.virtualData;
            }
            if (
              this.virtualData[0].explain === null ||
              this.virtualData[0].explain === ""
            ) {
              this.hasExplainVirtual = false;
            } else {
              this.hasExplainVirtual = true;
              this.explainDataVirtual = this.virtualData[0].explain;
            }
          }
          //处理'微信支付宝'充值数据
          if (data.data.aliwechat !== undefined) {
            this.aliwechatData = data.data.aliwechat.payList;
            this.aliwechatQuickAmount = this.aliwechatData[0].suggestAmountList;
            this.inputMinAliwechat = this.aliwechatData[0].cashMin;
            this.inputMaxAliwechat = this.aliwechatData[0].cashMax;
            if (
              this.aliwechatData.length > 9 &&
              this.aliwechatData.length <= 18
            ) {
              this.aliwechatData1 = this.aliwechatData.slice(0, 9);
              this.aliwechatData2 = this.aliwechatData.slice(9);
            } else if (this.aliwechatData.length > 18) {
              this.aliwechatData1 = this.aliwechatData.slice(0, 9);
              this.aliwechatData2 = this.aliwechatData.slice(9, 18);
              this.aliwechatData3 = this.aliwechatData.slice(18);
            } else {
              this.aliwechatData1 = this.aliwechatData;
            }
            if (
              this.aliwechatData[0].explain === null ||
              this.aliwechatData[0].explain === ""
            ) {
              this.hasExplainAliwechat = false;
            } else {
              this.hasExplainAliwechat = true;
              this.explainDataAliwechat = this.aliwechatData[0].explain;
            }
          }
          //处理人工充值数据
          if (data.data.customer !== undefined) {
            this.customerData = data.data.customer.payList;
          }
          this.initIndex();
          this.$nextTick(() => {
            // this.$refs.swiper.$el.style.height = document.getElementsByClassName('main-box')[0].offsetHeight + 'px'
          });
        }
      }
    },
    switchPayType(value, index) {
      if (value > 2 && this.allData.length > 4) {
        this.$refs.navBox.style.marginLeft = "-.7rem";
      } else if (value < 2 && this.allData.length > 4) {
        this.$refs.navBox.style.marginLeft = "0";
      }
      this.$refs.swiper.swipeTo(value);
      this.swiperName = index;
      if (index === "jisu") {
        this.getCookie();
      } else if (index === "bank") {
        this.payId = this.bankData[0].payId;
        this.payType = this.bankData[0].payType;
        this.switchChannelsShow(2);
        this.bankChannelSwitch(0, 1);
      } else if (index === "virtual") {
        this.payId = this.virtualData[0].payId;
        this.payType = this.virtualData[0].payType;
        if (this.payId === 3) {
          this.virtualSysErc();
          this.userVirtualListErc();
        } else if (this.payId === 4) {
          this.virtualSysTrc();
          this.userVirtualListTrc();
        }
        if (this.payId === 3 || this.payId === 4) {
          this.showAddress = true;
        } else {
          this.showAddress = false;
        }
        this.switchVirtualChannelsShow(2);
        // this.virtualChannelSwitch(0,1)
      } else if (index === "customer") {
        this.payId = this.customerData[0].payId;
      } else if (index === "aliwechat") {
        this.payId = this.aliwechatData[0].payId;
        this.payType = this.aliwechatData[0].payType;
        this.switchAlichatChannelsShow(2);
        this.aliwechatChannelSwitch(0, 1);
      }
      if (index !== "jisu") {
        this.showFixedBottom = false;
      } else {
        this.showFixedBottom = true;
      }
    },

    // 获取虚拟币汇率
    getRateInfo() {
      this.ServerAPI.postAPI(this.API.getVirtualRate, "", (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.virtualRate = data.data.buyRate;
          }
        }
      });
    },
    //银行卡充值相关方法调用
    switchChannelsShow(value) {
      if (value === 1) {
        this.switchChannels1 = false;
        this.switchChannels2 = true;
        this.switchChannels3 = false;
      } else if (value === 2) {
        this.switchChannels1 = true;
        this.switchChannels2 = false;
        this.switchChannels3 = false;
        this.bankAni = 1;
      } else if (value === 3) {
        this.switchChannels3 = true;
        this.switchChannels1 = false;
        this.switchChannels2 = false;
        this.bankAni = 2;
      } else if (value === 4) {
        this.switchChannels2 = true;
        this.switchChannels1 = false;
        this.switchChannels3 = false;
        this.bankAni = 2;
      }
      // this.handleHeight()
    },
    bankChannelSwitch(value, index) {
      if (index === 1) {
        if (this.bankChannel !== value) {
          this.bankQuickIndex = -1;
          this.$refs.bankInputAmount.value = "";
          this.bankSubCheck = true;
          this.bankChannel = value;
          this.bankChannel2 = -1;
          this.bankChannel3 = -1;
          this.bankQuickAmount = this.bankData[value].suggestAmountList;
          this.inputMin = this.bankData[value].cashMin;
          this.inputMax = this.bankData[value].cashMax;
          this.payId = this.bankData[value].payId;
          if (
            this.bankData[value].explain === null ||
            this.bankData[value].explain === ""
          ) {
            this.hasExplain = false;
          } else {
            this.hasExplain = true;
            this.explainData = this.bankData[value].explain;
          }
          this.payType = this.bankData[value].payType;
          this.payId = this.bankData[value].payId;
        }
      } else if (index === 2) {
        if (this.bankChannel2 !== value) {
          this.bankQuickIndex = -1;
          this.$refs.bankInputAmount.value = "";
          this.bankSubCheck = true;
          this.bankChannel = -2;
          this.bankChannel3 = -2;
          this.bankChannel2 = value;
          this.bankQuickAmount = this.bankData2[value].suggestAmountList;
          this.inputMin = this.bankData2[value].cashMin;
          this.inputMax = this.bankData2[value].cashMax;
          this.payId = this.bankData2[value].payId;
          if (
            this.bankData2[value].explain === null ||
            this.bankData2[value].explain === ""
          ) {
            this.hasExplain = false;
          } else {
            this.hasExplain = true;
            this.explainData = this.bankData2[value].explain;
          }
          this.payType = this.bankData2[value].payType;
          this.payId = this.bankData2[value].payId;
        }
      } else if (index === 3) {
        if (this.bankChannel2 !== value) {
          this.bankQuickIndex = -1;
          this.$refs.bankInputAmount.value = "";
          this.bankSubCheck = true;
          this.bankChannel = -2;
          this.bankChannel2 = -2;
          this.bankChannel3 = value;
          this.bankQuickAmount = this.bankData3[value].suggestAmountList;
          this.inputMin = this.bankData3[value].cashMin;
          this.inputMax = this.bankData3[value].cashMax;
          this.payId = this.bankData3[value].payId;
          if (
            this.bankData3[value].explain === null ||
            this.bankData3[value].explain === ""
          ) {
            this.hasExplain = false;
          } else {
            this.hasExplain = true;
            this.explainData = this.bankData3[value].explain;
          }
          this.payType = this.bankData3[value].payType;
          this.payId = this.bankData3[value].payId;
        }
      }
    },
    bankQuickSelect(value, index) {
      this.$refs.bankInputAmount.value = value;
      this.subBankAmount = value;
      this.bankQuickIndex = index;
      this.amountInputting = true;
      this.bankInputRight = true;
      this.bankSubCheck = false;
    },
    bankInputCheck() {
      this.bankQuickIndex = -1;
      if (
        this.$refs.bankInputAmount.value < this.inputMin ||
        this.$refs.bankInputAmount.value > this.inputMax
      ) {
        this.bankInputRight = false;
        this.bankSubCheck = true;
      } else {
        this.bankInputRight = true;
        this.bankSubCheck = false;
      }
      if (this.$refs.bankInputAmount.value.length > 0) {
        this.amountInputting = true;
      } else {
        this.amountInputting = false;
      }
      if (this.$refs.bankInputAmount.value === "") {
        this.bankInputRight = true;
      }
      this.subBankAmount = this.$refs.bankInputAmount.value;
    },
    deleteBankInput() {
      this.$refs.bankInputAmount.value = "";
      this.bankQuickIndex = -1;
      this.amountInputting = false;
      this.bankInputRight = true;
      this.bankSubCheck = true;
      this.subBankAmount = "";
    },
    //虚拟币充值相关方法调用
    switchVirtualChannelsShow(value) {
      if (value === 1) {
        this.switchVirtualChannels1 = false;
        this.switchVirtualChannels2 = true;
      } else if (value === 2) {
        this.switchVirtualChannels1 = true;
        this.switchVirtualChannels2 = false;
      }
      // this.handleHeight()
    },
    //虚拟币充值相关方法调用
    virtualChannelSwitch(value, index) {
      if (index === 1) {
        if (this.virtualChannels !== value) {
          this.virtualQuickIndex = -1;
          this.virtualChannels = value;
          this.virtualChannels2 = -1;
          this.virtualQuickAmount = this.virtualData[value].suggestAmountList;
          this.inputMinVirtual = this.virtualData[value].cashMin;
          this.inputMaxVirtual = this.virtualData[value].cashMax;
          this.payId = this.virtualData[value].payId;
          this.payType = this.virtualData[value].payType;
          if (
            this.virtualData[value].explain === null ||
            this.virtualData[value].explain === ""
          ) {
            this.hasExplainVirtual = false;
          } else {
            this.hasExplainVirtual = true;
            this.explainDataVirtual = this.virtualData[value].explain;
          }
          this.payId = this.virtualData[value].payId;
        }
      } else {
        if (this.virtualChannels2 !== value) {
          this.virtualQuickIndex = -1;
          this.$refs.virtualInputAmount.value = "";
          this.virtualChannels = -1;
          this.virtualChannels2 = value;
          this.virtualQuickAmount = this.virtualData2[value].suggestAmountList;
          this.inputMinVirtual = this.virtualData2[value].cashMin;
          this.inputMaxVirtual = this.virtualData2[value].cashMax;
          this.payId = this.virtualData2[value].payId;
          this.payType = this.virtualData2[value].payType;
          if (
            this.virtualData2[value].explain === null ||
            this.virtualData2[value].explain === ""
          ) {
            this.hasExplainVirtual = false;
          } else {
            this.hasExplainVirtual = true;
            this.explainDataVirtual = this.virtualData2[value].explain;
          }
          this.payType = this.virtualData2[value].payType;
          this.payId = this.virtualData2[value].payId;
        }
      }
      this.$refs.virtualInputAmount.value = "";
      this.virtualInputting = false;
      this.virtualInputRight = true;
      this.virtualSubCheck = true;
      this.memberVirtualId = 0;
      if (this.payId === 3) {
        this.virtualSysErc();
        this.userVirtualListErc();
      } else if (this.payId === 4) {
        this.virtualSysTrc();
        this.userVirtualListTrc();
      }
      if (this.payId !== 3 && this.payId !== 4) {
        this.showAddress = false;
      } else {
        this.showAddress = true;
        this.$nextTick(() => {
          // this.$refs.virtualAddressInput.value = ''
          this.showVirtualCion = "请选择虚拟币帐户";
        });
      }
    },
    virtualQuickSelect(value, index) {
      this.$refs.virtualInputAmount.value = value;
      this.virtualSubAmount = value;
      this.virtualQuickIndex = index;
      this.virtualInputting = true;
      this.virtualInputRight = true;
      // this.virtualSubCheck = false
      this.virtualInputCheck();
      this.computeRate();
    },
    virtualInputCheck() {
      this.virtualQuickIndex = -1;
      if (this.payId === 3 || this.payId === 4) {
        if (
          this.$refs.virtualInputAmount.value < this.inputMinVirtual ||
          this.$refs.virtualInputAmount.value > this.inputMaxVirtual
        ) {
          this.virtualInputRight = false;
        } else {
          this.virtualInputRight = true;
        }
        // if(this.$refs.virtualAddressInput.value.trim().length > 0) {
        //     this.virtualAddressInputting = true
        // }else{
        //     this.virtualAddressInputting = false
        // }
        if (this.$refs.virtualInputAmount.value.length > 0) {
          this.virtualInputting = true;
        } else {
          this.virtualInputting = false;
        }
        if (this.$refs.virtualInputAmount.value === "") {
          this.virtualInputRight = true;
        }
        if (
          this.$refs.virtualInputAmount.value >= this.inputMinVirtual &&
          this.$refs.virtualInputAmount.value <= this.inputMaxVirtual &&
          this.showVirtualCion !== "请选择虚拟币帐户" &&
          this.showVirtualCion !== "请点击绑定虚拟币账户"
        ) {
          this.virtualSubCheck = false;
        } else {
          this.virtualSubCheck = true;
        }
        // if(this.$refs.virtualAddressInput.value.indexOf(' ') >= 0){
        //     this.$refs.virtualAddressInput.value = this.$refs.virtualAddressInput.value.replace(/\s+/g,"")
        //     Toast('充值地址不得输入空格')
        // }
      } else {
        if (
          this.$refs.virtualInputAmount.value < this.inputMinVirtual ||
          this.$refs.virtualInputAmount.value > this.inputMaxVirtual
        ) {
          this.virtualInputRight = false;
        } else {
          this.virtualInputRight = true;
        }
        if (this.$refs.virtualInputAmount.value.length > 0) {
          this.virtualInputting = true;
        } else {
          this.virtualInputting = false;
        }
        if (this.$refs.virtualInputAmount.value === "") {
          this.virtualInputRight = true;
        }
        if (
          this.$refs.virtualInputAmount.value >= this.inputMinVirtual &&
          this.$refs.virtualInputAmount.value <= this.inputMaxVirtual
        ) {
          this.virtualSubCheck = false;
        } else {
          this.virtualSubCheck = true;
        }
      }
      this.virtualSubAmount = this.$refs.virtualInputAmount.value;
      this.computeRate();
    },
    deleteVirtualInput() {
      this.$refs.virtualInputAmount.value = "";
      this.virtualQuickIndex = -1;
      this.virtualInputting = false;
      this.virtualInputRight = true;
      this.virtualSubCheck = true;
      this.virtualSubAmount = 0;
    },
    // deleteVirtualAddressInput(){
    //     this.$refs.virtualAddressInput.value = ''
    //     this.virtualAddressInputting = false
    //     this.virtualSubCheck = true
    // },
    //'支付宝微信'充值相关方法调用
    aliwechatChannelSwitch(value, index) {
      if (index === 1) {
        if (this.aliwechatChannels !== value) {
          this.aliwechatQuickIndex = -1;
          this.$refs.aliwechatInputAmount.value = "";
          this.aliwechatChannels = value;
          this.aliwechatChannels2 = -1;
          this.aliwechatChannels3 = -1;
          this.aliwechatQuickAmount =
            this.aliwechatData[value].suggestAmountList;
          this.inputMinAliwechat = this.aliwechatData[value].cashMin;
          this.inputMaxAliwechat = this.aliwechatData[value].cashMax;
          this.payId = this.aliwechatData[value].payId;
          this.payType = this.aliwechatData[value].payType;
          if (
            this.aliwechatData[value].explain === null ||
            this.aliwechatData[value].explain === ""
          ) {
            this.hasExplainAliwechat = false;
          } else {
            this.hasExplainAliwechat = true;
            this.explainDataAliwechat = this.aliwechatData[value].explain;
          }
        }
      } else if (index === 2) {
        if (this.aliwechatChannels2 !== value) {
          this.aliwechatQuickIndex = -1;
          this.$refs.aliwechatInputAmount.value = "";
          this.aliwechatChannels = -1;
          this.aliwechatChannels3 = -1;
          this.aliwechatChannels2 = value;
          this.aliwechatQuickAmount =
            this.aliwechatData2[value].suggestAmountList;
          this.inputMinAliwechat = this.aliwechatData2[value].cashMin;
          this.inputMaxAliwechat = this.aliwechatData2[value].cashMax;
          this.payId = this.aliwechatData2[value].payId;
          this.payType = this.aliwechatData2[value].payType;
          if (
            this.aliwechatData2[value].explain === null ||
            this.aliwechatData2[value].explain === ""
          ) {
            this.hasExplainAliwechat = false;
          } else {
            this.hasExplainAliwechat = true;
            this.explainDataAliwechat = this.aliwechatData2[value].explain;
          }
        }
      } else if (index === 3) {
        if (this.aliwechatChannels3 !== value) {
          this.aliwechatQuickIndex = -1;
          this.$refs.aliwechatInputAmount.value = "";
          this.aliwechatChannels = -1;
          this.aliwechatChannels2 = -1;
          this.aliwechatChannels3 = value;
          this.aliwechatQuickAmount =
            this.aliwechatData3[value].suggestAmountList;
          this.inputMinAliwechat = this.aliwechatData3[value].cashMin;
          this.inputMaxAliwechat = this.aliwechatData3[value].cashMax;
          this.payId = this.aliwechatData3[value].payId;
          this.payType = this.aliwechatData3[value].payType;
          if (
            this.aliwechatData3[value].explain === null ||
            this.aliwechatData3[value].explain === ""
          ) {
            this.hasExplainAliwechat = false;
          } else {
            this.hasExplainAliwechat = true;
            this.explainDataAliwechat = this.aliwechatData3[value].explain;
          }
        }
      }
    },
    switchAlichatChannelsShow(value) {
      if (value === 1) {
        this.switchAliwechatChannels1 = false;
        this.switchAliwechatChannels2 = true;
        this.switchAliwechatChannels3 = false;
      } else if (value === 2) {
        this.switchAliwechatChannels1 = true;
        this.switchAliwechatChannels2 = false;
        this.switchAliwechatChannels3 = false;
        this.aliwechatAni = 1;
      } else if (value === 3) {
        this.switchAliwechatChannels3 = true;
        this.switchAliwechatChannels1 = false;
        this.switchAliwechatChannels2 = false;
        this.aliwechatAni = 2;
      } else if (value === 4) {
        this.switchAliwechatChannels2 = true;
        this.switchAliwechatChannels1 = false;
        this.switchAliwechatChannels3 = false;
        this.aliwechatAni = 2;
      }
      // this.handleHeight()
    },
    alichatQuickSelect(value, index) {
      this.$refs.aliwechatInputAmount.value = value;
      this.aliwechatQuickIndex = index;
      this.aliwechatInputting = true;
      this.aliwechatInputRight = true;
      this.aliwechatSubCheck = false;
    },
    alichatInputCheck() {
      this.aliwechatQuickIndex = -1;
      if (
        this.$refs.aliwechatInputAmount.value < this.inputMinAliwechat ||
        this.$refs.aliwechatInputAmount.value > this.inputMaxAliwechat
      ) {
        this.aliwechatInputRight = false;
        this.aliwechatSubCheck = true;
      } else {
        this.aliwechatInputRight = true;
        this.aliwechatSubCheck = false;
      }
      if (this.$refs.aliwechatInputAmount.value.length > 0) {
        this.aliwechatInputting = true;
      } else {
        this.aliwechatInputting = false;
      }
      if (this.$refs.aliwechatInputAmount.value === "") {
        this.aliwechatInputRight = true;
      }
    },
    deleteAlichatInput() {
      this.$refs.aliwechatInputAmount.value = "";
      this.aliwechatQuickIndex = -1;
      this.aliwechatInputting = false;
      this.aliwechatInputRight = true;
      this.aliwechatSubCheck = true;
      this.alichatInputCheck();
    },
    //人工充值相关方法调用
    customerChannelSwitch(value, index) {
      if (index === 1) {
        if (this.customerChannels !== value) {
          this.customerQuickIndex = -1;
          this.$refs.customerInputAmount.value = "";
          this.customerChannels = value;
          this.customerChannels2 = -1;
          this.inputMinCustomer = this.customerData[value].cashMin;
          this.inputMaxCustomer = this.customerData[value].cashMax;
          this.payId = this.customerData[value].payId;
        }
      } else if (index === 2) {
        if (this.customerChannels2 !== value) {
          this.customerQuickIndex = -1;
          this.$refs.customerInputAmount.value = "";
          this.customerChannels = -1;
          this.customerChannels2 = value;
          this.inputMinCustomer = this.customerData2[value].cashMin;
          this.inputMaxCustomer = this.customerData2[value].cashMax;
          this.payId = this.customerData2[value].payId;
        }
      }
    },
    switchCustomerChannelsShow(value) {
      if (value === 1) {
        this.switchCustomerChannels1 = false;
        this.switchCustomerChannels2 = true;
      } else if (value === 2) {
        this.switchCustomerChannels1 = true;
        this.switchCustomerChannels2 = false;
      }
    },
    customerQuickSelect(value, index) {
      this.$refs.customerInputAmount.value = value;
      this.subBankAmount = value;
      this.customerQuickIndex = index;
      this.customerInputting = true;
      this.customerInputRight = true;
      this.customerSubCheck = false;
    },
    deleteCustomerInput() {
      this.$refs.customerInputAmount.value = "";
      this.customerQuickIndex = -1;
      this.customerInputting = false;
      this.customerInputRight = true;
      this.customerSubCheck = true;
      this.customerInputCheck();
    },
    //erc充值-系统信息
    virtualSysErc() {
      this.ServerAPI.postAPI(
        this.API.virtualCoinListSys,
        "",
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
              this.virtualAddress = data.data.virtualAddress;
              this.virtualType = data.data.virtualType;
              this.virtualRate = data.data.virtualRate;
              this.virtualId = data.data.virtualId;
              this.virtualInfo = data.data.virtualInfo;
              // this.virtualRate = data.data.virtualRate
              this.computeRate();
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    //Trc充值-系统信息
    virtualSysTrc() {
      this.ServerAPI.postAPI(
        this.API.virtualCoinListSysTRC20,
        "",
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
              this.virtualAddress = data.data.virtualAddress;
              this.virtualType = data.data.virtualType;
              this.virtualRate = data.data.virtualRate;
              this.virtualId = data.data.virtualId;
              this.virtualInfo = data.data.virtualInfo;
              this.computeRate();
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    closeVirtualSub() {
      this.virtualInfoPop = false;
      this.virtualAdress = "";
      document.getElementById("qrcodeImg").innerHTML = "";
    },

    //输入框样式控制
    checkInfoInput(value) {
      if (value === 2) {
        if (this.$refs.cardNumValue.value.length > 20) {
          this.$refs.cardNumValue.value = this.$refs.cardNumValue.value.slice(
            0,
            20
          );
        }
      }
      if (
        this.$refs.nameValue.value.length > 0 &&
        this.$refs.cardNumValue.value.length > 0
      ) {
        this.depositInputFinish = true;
      } else {
        this.depositInputFinish = false;
      }
    },
    inputActiving(value) {
      if (value === 1) {
        this.$refs.nameFocus.classList.value = "input-list2 flex";
      } else if (value === 2) {
        this.$refs.cardFocus.classList.value = "input-list flex";
      }
    },
    inputFinish(value) {
      if (value === 1) {
        this.$refs.nameFocus.classList.value =
          "input-list2 flex input-activing";
      } else if (value === 2) {
        this.$refs.cardFocus.classList.value = "input-list flex input-activing";
      }
    },
    //充值提交
    subDeposit(value, mode) {
      if (this.showEveryDeposit === true && mode !== 1) {
        this.subParam = value;
        this.everyDeposit = true;
      } else {
        if (value === "bank") {
          if (this.payId === 1 || this.payId === 7) {
            this.depositInfoPop = true;
            this.getSysBank();
          } else {
            this.subCash = this.$refs.bankInputAmount.value;
            this.winRef = window.open("", "_blank");
            this.getBankOnline();
          }
        } else if (value === "virtual") {
          if (this.payId === 3) {
            // this.virtualSysErc()
            this.subDepositErc();
          } else if (this.payId === 4) {
            // this.virtualSysTrc()
            this.subDepositTrc();
          } else {
            this.subCash = this.$refs.virtualInputAmount.value;
            this.winRef = window.open("", "_blank");
            this.getBankOnline();
          }
        } else if (value === "aliwechat") {
          this.subCash = this.$refs.aliwechatInputAmount.value;
          this.winRef = window.open("", "_blank");
          this.getBankOnline();
        }
        this.virtualSubTime = this.dealWithTime(new Date());
      }
    },
    subDepositErc() {
      let params = {
        payId: this.payId,
        virtualId: this.virtualId,
        virtualInfo: this.virtualInfo,
        cash: this.$refs.virtualInputAmount.value,
        rate: this.virtualRate,
        num: this.virtualSubUSDT,
        memberVirtualId: this.memberVirtualId,
        time: this.dealWithTime(new Date()),
        version: this.API.paramVersion,
      };
      // console.log(params)  virtualId  virtualInfo
      this.ServerAPI.postAPI(
        this.API.virtualCoinDeposit,
        params,
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
              this.$toastTop(data.info, 1);
              this.virtualInfoPop = true;
              this.$nextTick(() => {
                this.qrcode();
              });
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    subDepositTrc() {
      let params = {
        payId: this.payId,
        virtualId: this.virtualId,
        virtualInfo: this.virtualInfo,
        cash: this.$refs.virtualInputAmount.value,
        rate: this.virtualRate,
        num: this.virtualSubUSDT,
        memberVirtualId: this.memberVirtualId,
        time: this.dealWithTime(new Date()),
        version: this.API.paramVersion,
      };
      // console.log(params)
      this.ServerAPI.postAPI(
        this.API.virtualCoinDepositTrc,
        params,
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
              this.$toastTop(data.info, 1);
              this.virtualInfoPop = true;
              this.$nextTick(() => {
                this.qrcode();
              });
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    //获取系统银行卡列表
    getSysBank() {
      let params = {
        visitType: "APP",
        payId: this.payId,
        payType: this.payType,
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(this.API.BankList, params, (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.sysbankData = data.data[0];
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("获取系统银行卡失败，请重试", 2);
        }
      });
    },
    // 银行卡付款信息提交
    subBankInfo() {
      this.depositInfoPop = false;
      this.showLoading = true;
      this.subBankRealname = this.$refs.nameValue.value;
      this.subBankCard = this.$refs.cardNumValue.value;
      this.sysBnakDeposit();
    },
    //  在线充值提交
    getBankOnline() {
      let params = {
        payId: this.payId,
        cash: this.subCash,
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(
        this.API.depositOnline,
        params,
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
              if (data.data.type == "get") {
                this.winRef.location = data.data.url;
              }
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("获取充值失败，请重试", 2);
          }
        }
      );
    },
    //  系统银行收款提交
    sysBnakDeposit() {
      let params = {
        payId: this.payId,
        payType: this.payType,
        bankId: this.sysbankData.bankId,
        cash: this.subBankAmount,
        realName: this.subBankRealname,
        cardName: this.subBankCard,
      };
      this.ServerAPI.postAPI(this.API.deposit, params, (success, data) => {
        this.showLoading = false;
        if (success) {
          if (data.code == "0000") {
            this.sysbankInfoPop = true;
            this.$refs.nameValue.value = "";
            this.$refs.cardNumValue.value = "";
            this.$toast(data.info, true);
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("似乎已断开与互联网的连接", 2);
        }
      });
    },
    customerSub(value, index) {
      console.log(value);
      if (value === "webview") {
        sessionStorage.setItem("title", "人工充值");
        sessionStorage.setItem("iframeInfo", this.customerData[index].url);
        this.$router.push("/iframeModel");
      } else if (value === "browser") {
        this.winRef = window.open("", "_blank");
        this.winRef.location = this.customerData[index].url;
      }
    },
    // ‘复制’点击方法
    copyContent(value) {
      var clickContent;
      if (value === "name") {
        clickContent = this.sysbankData.realName;
      } else if (value === "cardNum") {
        clickContent = this.sysbankData.cardNumber;
      } else if (value === "adress") {
        clickContent = this.sysbankData.address;
      } else if (value === "cash") {
        clickContent = this.subBankAmount;
      } else if (value === "virtual") {
        clickContent = this.virtualAddress;
      }
      var inputElement = document.getElementById("copy_content");
      inputElement.value = clickContent;
      inputElement.select();
      document.execCommand("Copy");
      this.$toastTop("复制成功", 1);
    },
    //处理虚拟币-人民币汇率转换
    computeRate() {
      this.virtualSubAmount = (this.virtualSubAmount + "").replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        "$1$2.$3"
      );
      this.virtualSubUSDT =
        (this.virtualSubAmount - 0) / (this.virtualRate - 0);
      this.virtualSubUSDT = (this.virtualSubUSDT + "").replace(
        /^(\-)*(\d+)\.(\d\d\d\d\d).*$/,
        "$1$2.$3"
      );
    },
    //获取当前时间
    dealWithTime(data) {
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      M = M < 10 ? "0" + M : M;
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      formatDateTime = Y + "/" + M + "/" + D + "  " + H + ":" + Min + ":" + S;
      return formatDateTime;
    },
    // 虚拟币教程
    // getVirtualHelp() {
    //     let params = {
    //         gameBigType: 1
    //     }
    //     this.ServerAPI.postAPI(this.API.sysHelp, params, (success,data)=>{
    //         if (success) {
    // 			if (data.code == '0000') {
    // 				data.data.forEach(ele => {
    //                     if(ele.id === 12){
    //                         this.virtualHelpParams = {
    //                             imgUrl: ele.content,
    //                             title: ele.title
    //                         }
    //                     }
    //                 })
    // 			}
    // 		}
    //     })
    // },
    toVirtualHelp() {
      this.$router.push("/newerHelp");
    },
    getHelpInfo() {
      this.helpList = true;
      let params = {
        version: this.API.paramVersion,
        appType: "H5",
        visitType: "WAP",
        phoneVersion: browserName + " " + browserVersion,
        phoneModel: mobileModel,
      };
      this.ServerAPI.postAPI(this.API.setting, params, (success, data) => {
        if (success) {
          if (data.code === "0000") {
            this.helpData = data.data;
            if (data.data.kefu1 !== null) {
              this.showHelp1 = true;
            }
            if (data.data.kefu2 !== null) {
              this.showHelp2 = true;
            }
            if (data.data.windowStatus === true) {
              this.helpNoticeSwitch = true;
            } else {
              this.helpNoticeSwitch = false;
            }
          }
        }
      });
    },
    toHelpMode(value) {
      this.showNotice = false;
      if (value === 1) {
        if (this.helpData.kefu1 === "LiveChatSDK") {
          sessionStorage.setItem("helpUrl", this.API.kfLiveChat);
        } else {
          sessionStorage.setItem("helpUrl", this.helpData.kefu1);
        }
      } else if (value === 2) {
        sessionStorage.setItem("helpUrl", this.helpData.kefu2);
      }
      this.$router.push("/help2");
      this.helpList = false;
    },
    toPush(url) {
      this.$router.push("/" + url);
    },
    toDiscount(value) {
      this.$router.push({ name: "discountOne", params: { id: value } });
    },
    handleHeight() {
      this.$nextTick(() => {
        document.getElementsByClassName("van-swipe")[0].style.height =
          document.getElementsByClassName("main-box")[this.heightIndex]
            .clientHeight + "px";
      });
    },
    userVirtualListErc() {
      this.showLoading = true;
      this.ServerAPI.postAPI(
        this.API.virtualCoinWithdrawList,
        "",
        (success, data) => {
          this.showLoading = false;
          if (success) {
            if (data.code === "0000") {
              this.virtualDataErc = data.data.virtualList;
              if (data.data.virtualList.length === 0) {
                this.showVirtualCion = "请点击绑定虚拟币账户";
              } else {
                this.pickerListErc = [];
                this.showVirtualCion = this.virtualDataErc[0].memberCard;
                this.memberVirtualId = this.virtualDataErc[0].memberVirtualId;
                data.data.virtualList.forEach((item) => {
                  this.pickerListErc.push(item.memberCard);
                });
              }
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    userVirtualListTrc() {
      this.showLoading = true;
      this.ServerAPI.postAPI(
        this.API.virtualCoinWithdrawListTrc,
        "",
        (success, data) => {
          this.showLoading = false;
          if (success) {
            if (data.code === "0000") {
              this.virtualDataTrc = data.data.virtualList;
              if (data.data.virtualList.length === 0) {
                this.showVirtualCion = "请点击绑定虚拟币账户";
              } else {
                this.pickerListTrc = [];
                this.showVirtualCion = this.virtualDataTrc[0].memberCard;
                this.memberVirtualId = this.virtualDataTrc[0].memberVirtualId;
                data.data.virtualList.forEach((item) => {
                  this.pickerListTrc.push(item.memberCard);
                });
              }
            } else {
              this.$toastTop(data.info, 3);
            }
          } else {
            this.$toastTop("似乎已断开与互联网的连接", 2);
          }
        }
      );
    },
    showVirtualAcc() {
      if (this.showVirtualCion === "请点击绑定虚拟币账户") {
        this.$router.push("/addVirtualCoinAccount");
        return false;
      }
      if (this.payId === 3) {
        this.showSelect2 = true;
      } else if (this.payId === 4) {
        this.showSelect3 = true;
      }
    },
    onConfirmErc(value, index) {
      this.showVirtualCion = this.pickerListErc[index];
      this.memberVirtualId = this.virtualDataErc[index].memberVirtualId;
      this.showSelect2 = false;
      this.virtualInputCheck();
    },
    onConfirmTrc(value, index) {
      this.showVirtualCion = this.pickerListTrc[index];
      this.memberVirtualId = this.virtualDataTrc[index].memberVirtualId;
      this.showSelect3 = false;
      this.virtualInputCheck();
    },
    toHelpPage() {
      this.$router.push("/newerHelp");
      sessionStorage.setItem("helpIndex", "TP");
    },
    showNoticeFn(val) {
      this.helpIndex = val;
      if (this.helpNoticeSwitch === true) {
        this.showNotice = true;
        this.helpList = false;
      } else {
        this.toHelpMode(val);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bounce {
  transition: all 0.5s;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.fade-transform-enter-active,
.fade-transform2-enter-active {
  transition: all 1s;
}
.fade-transform-enter {
  transform: translateX(-100%);
}
.fade-transform2-enter {
  transform: translateX(100%);
}
// .fade-transform-leave-to {
//   transform: translateX(30px);
// }
.pay-body {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  min-height: 100vh;
  .replace-header {
    width: 100%;
    height: 1rem;
    color: #2a2929;
    font-size: 0.36rem;
    line-height: 1rem;
    padding: 0 0.32rem;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    z-index: 88;
    .goBack {
      width: 0.8rem;
      img {
        float: left;
        height: 0.32rem;
        margin: 0.34rem 0;
      }
    }
    .left-blank {
      width: 0.5rem;
    }
    .header-title {
      text-align: center;
      color: #2a2929;
      font-size: 0.3rem;
      font-family: PingFang-SC-Medium;
      position: relative;
    }
    .header-title::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0.8rem;
      height: 0.08rem;
      background: #78bdf2;
      margin-left: -0.4rem;
    }
    .header-right {
      img {
        height: 0.8rem;
      }
    }
  }
  .main-content {
    padding-top: 1rem;
    background: #eeeeee;
    .top-pay-type-box {
      text-align: center;
      background: linear-gradient(to right, #78bdf2, #1d9dfc);
      width: 100%;
      overflow: hidden;
      padding-top: 0.1rem;
      .pay-type-list-box {
        transition: all 0.3s;
        .pay-type-list {
          height: 0.9rem;
          width: 100%;
          position: relative;
          .pay-type-icon {
            height: 0.6rem;
            margin-top: -0.05rem;
          }
          .pay-type-icon-aliwechat {
            height: 0.5rem;
            margin: 0 0 0.04rem;
          }
          .pay-type-name {
            font-size: 0.2rem;
            color: #ffffff;
            margin-top: -0.05rem;
          }
          .pay-type-hot {
            position: absolute;
            top: -0.05rem;
            right: 50%;
            width: 0.5rem;
            margin-right: -0.75rem;
          }
          .title-nav-line {
            position: absolute;
            content: "";
            right: 0;
            width: 1px;
            height: 0.5rem;
            top: 50%;
            margin-top: -0.25rem;
            background: rgba(255, 255, 255, 0.3);
          }
        }
        // .pay-type-list:not(:last-child)::after {

        // }
        .titleActived {
          background: url("../../../static/images/pay-nav-bg.png") no-repeat;
          background-size: 100% 100%;
          .pay-type-name {
            color: #464646;
          }
        }
        .titleActivedL {
          border-radius: 0 0.25rem 0 0;
          background: #ffffff;
          .pay-type-name {
            color: #464646;
          }
        }
        .titleActivedR {
          border-radius: 0.25rem 0 0 0;
          background: #ffffff;
          .pay-type-name {
            color: #464646;
          }
        }
      }
    }
    .main-box {
      background: #eeeeee;
      .bank-type-content {
        padding: 0 0.15rem;
        background: #ffffff;
        .pay-channel-box {
          width: 100%;
          padding: 0 0 0.2rem;
          .pay-channel-line {
            flex-wrap: wrap;
            // height: 2rem;
            .pay-channel-list {
              text-align: center;
              height: 1.3rem;
              border: 1px solid #e6e8ee;
              border-radius: 0.1rem;
              width: 32.3%;
              margin-right: 1.5%;
              margin-top: 0.2rem;
              .top-icon {
                height: 0.45rem;
                margin-top: 0.1rem;
              }
              .pay-channel-name {
                // margin-top: .05rem;
                font-size: 0.22rem;
                .pay-channel-hot {
                  height: 0.28rem;
                  margin-left: 0.05rem;
                }
              }
              .pay-channel-name-gray {
                color: #7c8591;
              }
              .pay-channel-limit {
                color: #a8b3c3;
                font-size: 0.2rem;
                margin-top: -0.05rem;
              }
              .channel-side-mark {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.4rem;
              }
            }
            .pay-channel-list:nth-child(3n + 3) {
              margin-right: 0;
            }
            .bank-channel-avtived {
              border: 1px solid #fdba32;
              box-shadow: 0px 3px 6px rgba(149, 98, 0, 0.16);
              .pay-channel-name {
                color: #464646;
              }
            }
            .virtual-channel-avtived {
              border: 1px solid #fdba32;
              box-shadow: 0px 3px 6px rgba(149, 98, 0, 0.16);
              .pay-channel-name {
                color: #464646;
              }
            }
            .alipay-channel-avtived {
              border: 1px solid #fdba32;
              box-shadow: 0px 3px 6px rgba(149, 98, 0, 0.16);
              .pay-channel-name {
                color: #464646;
              }
            }
            .customer-channel-avtived {
              border: 1px solid #fdba32;
              box-shadow: 0px 3px 6px rgba(149, 98, 0, 0.16);
              .pay-channel-name {
                color: #464646;
              }
            }

            .pay-channel-more {
              position: absolute;
              top: 2rem;
              right: -0.1rem;
            }
            .pay-channel-more2 {
              position: absolute;
              top: 1.9rem;
              left: -0.1rem;
              transform: rotate(180deg);
            }
            .bank-quick-list {
              border: 1px solid #e6e8ee;
              border-radius: 0.1rem;
              color: #464646;
              width: 22%;
              margin-right: 4%;
              margin-top: 0.2rem;
              height: 0.8rem;
              font-size: 0.24rem;
              font-weight: bold;
              position: relative;
            }
            .bank-quick-list:nth-child(4n + 4) {
              margin-right: 0;
            }
            .bank-quick-list-activing {
              border: 1px solid #fdba32;
              .bank-quick-list-icon {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.32rem;
              }
            }
          }
          .pay-channel-line-top {
            // height: 3rem;
            align-items: unset;
          }
        }
        .input-amount-box {
          margin-top: 0.2rem;
          .input-amount-left {
            .input-amount-fonts1 {
              .amount-input {
                margin-left: 0.4rem;
                width: 4rem;
              }
            }
            .input-amount-fonts2 {
              width: calc(100% - 0.3rem);
              .virtual-address-fonts {
                color: #757575;
                width: calc(100vw - 1.6rem);
                // height: 0.6rem;
                border: #f4f4f4 1px solid;
                border-radius: 0.04rem;
                padding: 0.1rem 0.2rem;
                span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 4.6rem;
                }
              }
            }
          }
        }
        .virtual-bottom-fonts-box {
          height: 0.8rem;
          border-top: #eeeeee 1px solid;
          margin-top: 0.1rem;
        }
      }
      .bank-type-content2 {
        margin-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
      .bank-type-content3 {
        padding-bottom: 0;
      }
    }
    .main-box2 {
      min-height: calc(100vh - 2.2rem);
      background: #ffffff;
      .customer-list {
        height: 1.4rem;
        border-radius: 0.2rem;
        border: 1px solid #e6e8ee;
        background: #ffffff;
        margin-top: 0.2rem;
        .customer-img-box {
          position: relative;
          .customer-list-img {
            border-radius: 0.15rem;
            width: 1rem;
            border: #6bb5ec 1px solid;
          }
          .customer-list-logo {
            position: absolute;
            bottom: 0.05rem;
            right: -0.1rem;
            width: 0.45rem;
          }
        }
        .customer-list-line {
          width: 1px;
          height: 0.8rem;
          background: #e6e8ee;
          margin: 0 0.35rem;
        }
        .customer-list-fonts {
          width: 3rem;
          .customer-list-fonts1 {
            font-size: 0.28rem;
          }
          .customer-list-fonts2 {
            color: #a8b3c3;
            font-size: 0.24rem;
          }
        }
        .customer-list-right {
          background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
          width: 1.2rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          color: #ffffff;
        }
      }
    }
    .main-box-virtual,
    .main-box-quick {
      padding-bottom: 0.3rem;
    }
  }
  .btn-area {
    padding-bottom: 0.4rem;
    background: #eeeeee;
    .disable-fonts {
      color: #303030;
      font-weight: bold;
    }
    .sub-reminds {
      width: 90%;
      margin: 0.2rem auto 0;
      .sub-reminds-left {
        width: 0.24rem;
        margin-top: 0.07rem;
      }
      .sub-reminds-right {
        color: #444444;
        font-size: 0.22rem;
        margin-left: 0.1rem;
      }
    }
  }
  .virtual-discount {
    width: 90%;
    margin: 0 auto;
    .virtual-discount-img {
      width: 48%;
    }
  }
}
.second-title-box {
  height: 1rem;
  border-bottom: 1px solid #e6e8ee;
  .second-title-right {
    font-size: 0.26rem;
  }
  .left-blue-line {
    width: 0.08rem;
    height: 0.4rem;
    background: linear-gradient(to bottom, #78bdf2, #ffffff);
  }
  .second-title-fonts {
    color: #0066d5;
    font-weight: bold;
    margin-left: 0.1rem;
  }
  .right-help {
    color: #1d9dfc;
    font-size: 0.26rem;
    text-align: right;
    width: 2.2rem;
  }
}

.gray-fonts {
  color: #a8b3c3;
}
.red-fonts {
  color: #e90619;
}
.blue-fonts {
  color: #1d9dfc;
}
input {
  border: none;
  outline: none;
}
.main-btn {
  width: 90%;
  margin: 0.4rem auto 0;
}
.input-amount-right {
  font-size: 22px;
  color: #464646;
}
.pay-body {
  .van-popup {
    background: none;
    .deposit-info-content {
      width: 5.8rem;
      border-radius: 0.1rem;
      overflow: hidden;
      background: #ffffff;
      font-size: 0.26rem;
      .deposit-info-top-line {
        width: 100%;
        height: 0.2rem;
        background: #000;
        background: linear-gradient(90deg, #78bdf2 0%, #2383fc 100%);
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
      }
      .deposit-info-title-box {
        height: 1rem;
        font-size: 0.32rem;
        .left-blue-line {
          width: 0.08rem;
          height: 0.4rem;
          background: linear-gradient(to bottom, #78bdf2, #ffffff);
          margin-right: 0.15rem;
        }
      }
      .deposit-input-area {
        width: 90%;
        margin: 0 auto;
        .input-title {
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0 0.1rem;
          background: linear-gradient(to bottom, #f1f2f6, #ffffff);
          border-radius: 0.15rem;
        }
        .virtual-info-list-box {
          background: #f8f8fa;
          padding: 0.2rem;
          border-radius: 0.2rem;
          .virtual-info-list {
            color: #7c8591;
            margin-bottom: 0.1rem;
            margin-left: 0.2rem;
            span {
              color: #7c8591;
            }
            .blue {
              color: #1d9dfc;
            }
          }
          .virtual-info-list2 {
            color: #303030;
            margin-left: 0;
            margin-bottom: 0;
          }
          .virtual-address-box {
            padding: 0 0.1rem;
            .blue-fonts {
              width: calc(100% - 0.4rem);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .gray-fonts {
              width: calc(100% - 0.4rem);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .copy-icon {
              width: 0.3rem;
            }
          }
          .sys-bank-info {
            margin-top: 0.1rem;
          }
          .qr-img-box {
            margin: 0.2rem 0 0;
          }
        }

        .input-list {
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0 0.22rem;
          border-radius: 0.15rem;
          background: #f0f2f7;
          margin-top: 0.15rem;
          color: #7c8591;
          input {
            background: none;
            // margin-left: .2rem;
          }
        }
        .input-list2 {
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0 0.22rem;
          border-radius: 0.15rem;
          background: #f0f2f7;
          margin-top: 0.15rem;
          color: #7c8591;

          input {
            background: none;
            // margin-left: .2rem;
          }
        }
        .input-activing {
          border: #1d9dfc 1px solid;
        }
        .bottom-info-box {
          .bottom-info-title {
            margin-top: 0.24rem;
            font-size: 0.28rem;
            color: #686868;
            .blue-point {
              width: 0.2rem;
              height: 0.2rem;
              background: #78bdf2;
              border-radius: 50%;
              margin-right: 0.1rem;
            }
          }
          .bottom-info-content {
            color: #7c8591;
            font-size: 0.24rem;
          }
        }
      }
      .bottom-btn-box {
        text-align: center;
        border-top: #e6e8ee 1px solid;
        margin-top: 0.24rem;
        color: #a8b3c3;
        .bottom-btn {
          width: 50%;
          height: 0.7rem;
          line-height: 0.7rem;
        }
        .bottom-btn1 {
          color: #303030;
          border-right: #e6e8ee 1px solid;
        }
        .bottom-btn3 {
          color: #a8b3c3;
        }
        .btn-activing1 {
          color: #a8b3c3;
        }
        .btn-activing2 {
          color: #1d9dfc;
        }
      }
    }
  }
}
.toast-body {
  flex-direction: unset;
  min-height: unset;
  color: #ffffff;
  .pop-content-box {
    background: #000000;
    border-radius: 0.2rem;
    padding: 0.25rem;
    font-size: 0.3rem;
    .popup-icon {
      height: 0.6rem;
      margin-right: 0.2rem;
    }
  }
}
.help-list-box {
  .help-list {
    display: block;
    width: 90%;
    margin: 0 auto 0.2rem;
  }
  .help-close-btn {
    width: 100%;
    background: #ffffff;
    border-radius: 0.3rem 0.3rem 0 0;
    color: #7c8591;
    font-weight: bold;
    font-size: 0.3rem;
    padding: 0.2rem 0 0.2rem;
    .help-close-btn-fonts {
      width: 90%;
      height: 0.8rem;
      margin: 0 auto;
      border: 1px solid #c3cad7;
      border-radius: 2px;
    }
  }
}
.confirm-sub-box {
  width: 6rem;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #ffffff;
  .confirm-sub-line {
    height: 0.15rem;
    background: linear-gradient(90deg, #78bdf2 0%, #2383fc 100%);
  }
  .confirm-sub-line-red {
    background: #e90619;
  }
  .every-top-line {
    background: linear-gradient(90deg, #ffba00 0%, #e78800 100%);
  }
  .confirm-sub-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    font-weight: bold;
    color: #303030;
    margin-top: 0.3rem;
    .confirm-sub-title-left {
      width: 4px;
      height: 17px;
      background: linear-gradient(
        to bottom,
        #2383fc 0%,
        rgba(18, 132, 245, 0.1) 100%
      );
      margin-right: 0.1rem;
      border-radius: 0.05rem;
    }
    .confirm-title-icon {
      height: 0.3rem;
      margin-right: 0.1rem;
    }
    .left-icon {
      height: 0.35rem;
      margin-right: 0.1rem;
    }
  }
  .confirm-sub-content {
    font-size: 0.26rem;
    color: #717171;
    width: 5.5rem;
    margin: 0.2rem auto 0;
    .confirm-sub-content-red {
      color: #e90619;
      font-weight: bold;
      font-size: 0.3rem;
    }
    .confirm-sub-content-normal {
      color: #17191c;
      margin: 0.2rem auto 0;
      line-height: 0.4rem;
      width: 5rem;
    }
  }
  .confirm-sub-content2 {
    width: 5rem;
    color: #17191c;
    .red {
      color: #e90619;
    }
  }
  .confirm-sub-content-gray {
    font-size: 0.3rem;
    margin-top: 0.1rem;
    height: 0.6rem;
    color: #7c8591;
    .check-box {
      width: 3.6rem;
      .check-box-icon {
        height: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }
  .confirm-sub-content-gray2 {
    border-top: #e6e8ee 1px solid;
  }
  .confirm-sub-content-gray3 {
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    font-size: 0.26rem;
  }
  .border-top {
    border-top: #e6e8ee 1px solid;
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
      font-size: 0.26rem;
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
    .confirm-sub-btn3 {
      width: 100%;
      color: #303030;
      border-right: none;
    }
  }
}
.van-popup {
  background: none;
}
.check-upload-img-box {
  max-width: 70vw;
  max-height: 70vh;
  overflow: hidden;
  .check-upload-img {
    display: block;
    max-height: calc(70vh - 1rem);
    border-radius: 0.1rem;
  }
  .img-close-box {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: #ffffff;
    position: relative;
    margin: 0.2rem auto 0.4rem;
    z-index: 1;
    .img-close-icon {
      position: relative;
      top: -0.06rem;
      left: -0.06rem;
      z-index: 2;
    }
  }
}
.pay-body .notice-pop {
  background: #ffffff;
  border-radius: 0.1rem;
  width: 5rem;
  .notice-line {
    background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
    height: 0.16rem;
  }
  .notice-title {
    font-size: 0.32rem;
    margin-top: 0.2rem;
    .title-left {
      background: linear-gradient(
        180deg,
        #78bdf2 0%,
        rgba(120, 189, 242, 0) 100%
      );
      height: 0.34rem;
      width: 0.08rem;
      margin-right: 0.1rem;
    }
  }
  .notice-time {
    color: #a8b3c3;
    font-size: 0.2rem;
    margin-top: 0.04rem;
  }
  .notice-title-2 {
    font-size: 0.3rem;
    color: #1d9dfc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
  }
  .notice-content {
    padding: 0 0.26rem 0.26rem;
    line-height: 20px;
    // color: #17191C;
    color: rgba(0, 0, 0, 0.86);
    margin-top: 0.2rem;
    word-break: break-all;
  }
  .bottom-btn {
    height: 0.8rem;
    border-top: rgba(213, 218, 226, 0.39) 1px solid;
    color: #303030;
    font-size: 0.3rem;
  }
}
</style>
