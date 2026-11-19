<template>
  <view class="login-page">
    <view class="login-hero">
      <image class="login-logo" src="/static/logo.png" mode="aspectFit" />
      <text class="login-title">天天拓客</text>
      <text class="login-subtitle">授权手机号，解锁更多服务</text>
    </view>

    <view class="login-actions">
      <!-- #ifdef MP-WEIXIN -->
      <button
        v-if="agreed"
        class="login-btn"
        open-type="getPhoneNumber"
        :disabled="submitting"
        :loading="submitting"
        @getphonenumber="onGetPhoneNumber"
      >
        手机号授权登录
      </button>
      <button v-else class="login-btn login-btn--disabled" @tap="onTapUnagreed">
        手机号授权登录
      </button>
      <!-- #endif -->

      <!-- #ifndef MP-WEIXIN -->
      <view class="login-unsupported">请在微信小程序中使用手机号登录</view>
      <!-- #endif -->

      <view class="login-cancel" @tap="onCancel">暂不登录，先逛逛</view>
    </view>

    <view class="agreement">
      <view class="agreement-check" :class="{ 'is-checked': agreed }" @tap="toggleAgreed">
        <view v-if="agreed" class="agreement-check-dot" />
      </view>
      <text class="agreement-text" @tap="toggleAgreed">我已阅读并同意</text>
      <text class="agreement-link" @tap="openSheet('terms')">《用户服务协议》</text>
      <text class="agreement-text">和</text>
      <text class="agreement-link" @tap="openSheet('privacy')">《隐私政策》</text>
    </view>

    <view
      v-if="showAgreementConfirm"
      class="confirm-mask"
      @tap="onDisagree"
      @touchmove.stop.prevent="noop"
    >
      <view class="confirm-dialog" @tap.stop>
        <view class="confirm-title">用户协议</view>
        <view class="confirm-text">
          是否同意《用户服务协议》和《隐私政策》？同意后将自动勾选并继续手机号登录。
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button
          class="confirm-primary"
          open-type="getPhoneNumber"
          :disabled="submitting"
          @getphonenumber="onAgreeAndLogin"
        >
          同意并登录
        </button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <button class="confirm-primary" @tap="onUnsupportedLogin">同意并登录</button>
        <!-- #endif -->
        <view class="confirm-secondary" @tap="onDisagree">不同意</view>
      </view>
    </view>

    <view v-if="sheetVisible" class="sheet-mask" @tap="closeSheet" @touchmove.stop.prevent="noop">
      <view class="sheet" @tap.stop>
        <view class="sheet-head">
          <text class="sheet-title">{{ sheetTitle }}</text>
          <view class="sheet-close" @tap="closeSheet">×</view>
        </view>
        <scroll-view class="sheet-body" scroll-y>
          <text class="sheet-text">{{ sheetContent }}</text>
        </scroll-view>
        <view class="sheet-confirm" @tap="closeSheet">我知道了</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { loginWithPhoneCode } from '@/utils/auth.js'
import { normalizeRedirectParam, completeLoginNavigation } from '@/utils/route.js'

const AGREEMENTS = {
  terms: {
    title: '用户服务协议',
    content:
      '微信小程序是一种基于微信平台的轻应用，为用户提供便捷、高效、安全的服务。\n' +
      '微信小程序用户服务协议和隐私政策是用户使用微信小程序所必须遵守的规定。\n\n' +
      '微信小程序用户服务协议主要包括以下内容：\n' +
      '1.服务内容：微信小程序提供各种服务，包括但不限于线上购物、社交、娱乐、教育等。同时，微信平台也尊重和保护用户的个人信息和隐私权。\n' +
      '2.使用规范：用户在使用微信小程序时，需要遵守相关规定，包括但不限于不得进行恶意攻击、发布不良信息、侵犯他人权益等行为。同时，用户也需要按照平台要求填写真实有效的个人信息。\n' +
      '3.用户权利：作为微信小程序的用户，您享有以下权利：获取优质服务、自由表达观点和意见、保护自身隐私权和个人信息等。\n' +
      '4.用户义务：在享受权利的同时，您需要承担以下义务：保证填写的个人信息真实有效、遵守平台规定、不进行任何违规行为等。'
  },
  privacy: {
    title: '隐私政策',
    content:
      '1.微信小程序平台将采取各种措施保护用户的个人信息和隐私权，包括但不限于数据加密、权限管理、内部监管等。\n' +
      '2.微信小程序平台将严格控制个人信息的使用范围，只有在必要的情况下才会将个人信息提供给第三方。同时，平台将确保第三方遵守同样的隐私保护标准。'
  }
}

const redirect = ref('')
const from = ref('')
const agreed = ref(false)
const submitting = ref(false)
const sheetVisible = ref(false)
const sheetType = ref('terms')
const showAgreementConfirm = ref(false)

const sheetTitle = computed(() => AGREEMENTS[sheetType.value].title)
const sheetContent = computed(() => AGREEMENTS[sheetType.value].content)

function toggleAgreed() {
  agreed.value = !agreed.value
}

function noop() {}

function openSheet(type) {
  sheetType.value = type
  sheetVisible.value = true
}

function closeSheet() {
  sheetVisible.value = false
}

function onTapUnagreed() {
  showAgreementConfirm.value = true
}

function onDisagree() {
  showAgreementConfirm.value = false
  uni.showToast({ title: '已取消登录', icon: 'none' })
}

function onUnsupportedLogin() {
  showAgreementConfirm.value = false
  uni.showToast({
    title: '请在微信小程序中使用手机号登录',
    icon: 'none'
  })
}

function onAgreeAndLogin(event) {
  // 同意后自动勾选协议，并直接走手机号授权
  agreed.value = true
  showAgreementConfirm.value = false
  onGetPhoneNumber(event)
}

async function onGetPhoneNumber(event) {
  if (submitting.value) return
  if (!agreed.value) {
    onTapUnagreed()
    return
  }

  const detail = (event && event.detail) || {}
  if (detail.errMsg && !detail.errMsg.includes(':ok')) {
    uni.showToast({ title: '已取消手机号授权，可稍后重试', icon: 'none' })
    return
  }
  if (!detail.code) {
    uni.showToast({ title: '获取手机号失败，请重试', icon: 'none' })
    return
  }

  submitting.value = true
  try {
    await loginWithPhoneCode(detail.code)
    uni.showToast({ title: '登录成功', icon: 'success', duration: 800 })
    setTimeout(() => {
      completeLoginNavigation({ redirect: redirect.value, from: from.value })
    }, 600)
  } catch (error) {
    if (error && error.code === 'NO_TOKEN') {
      uni.showToast({ title: '登录失败，请稍后重试', icon: 'none' })
    } else if (error && error.code === 'WX_LOGIN_FAILED') {
      uni.showToast({ title: '微信登录失败，请重试', icon: 'none' })
    } else if (error && Number(error.code) === 401) {
      // 登录页内的 401 不会再触发全局跳转，这里单独提示
      uni.showToast({ title: '手机号验证失败，请重试', icon: 'none' })
    }
    // 其余网络/业务错误已由 request.js 统一提示
  } finally {
    submitting.value = false
  }
}

function onCancel() {
  completeLoginNavigation({
    redirect: redirect.value,
    from: from.value,
    cancelled: true
  })
}

onLoad((options = {}) => {
  redirect.value = normalizeRedirectParam(options.redirect)
  from.value = String(options.from || '')
})
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 120rpx 48rpx calc(48rpx + env(safe-area-inset-bottom));
  background: #ffffff;
}

.login-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 36rpx;
}

.login-title {
  margin-top: 28rpx;
  font-size: 44rpx;
  font-weight: 700;
  color: #1f1f1f;
}

.login-subtitle {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #999999;
}

.login-actions {
  width: 100%;
  margin-top: 120rpx;
}

.login-btn {
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  padding: 0;
  border-radius: 46rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;

  &::after {
    border: none;
  }

  &[disabled] {
    opacity: 0.6;
  }
}

.login-btn--disabled {
  opacity: 0.5;
}

.login-cancel {
  margin-top: 28rpx;
  text-align: center;
  font-size: 26rpx;
  color: #999999;
}

.login-unsupported {
  padding: 24rpx 0;
  text-align: center;
  font-size: 28rpx;
  color: #666666;
}

.agreement {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding-top: 48rpx;
}

.agreement-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rpx;
  height: 30rpx;
  margin-right: 12rpx;
  border: 2rpx solid #c9c9c9;
  border-radius: 50%;
  box-sizing: border-box;

  &.is-checked {
    border-color: #2c80ff;
    background: #2c80ff;
  }
}

.agreement-check-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ffffff;
}

.agreement-text {
  font-size: 22rpx;
  color: #999999;
}

.agreement-link {
  font-size: 22rpx;
  color: #2c80ff;
}

.confirm-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 64rpx;
  background: rgba(0, 0, 0, 0.5);
}

.confirm-dialog {
  width: 100%;
  padding: 48rpx 40rpx 32rpx;
  border-radius: 24rpx;
  background: #ffffff;
  box-sizing: border-box;
}

.confirm-title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #1f1f1f;
}

.confirm-text {
  margin-top: 24rpx;
  text-align: center;
  font-size: 27rpx;
  line-height: 1.7;
  color: #666666;
}

.confirm-primary {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  margin-top: 40rpx;
  padding: 0;
  border-radius: 44rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 100%);
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 500;

  &::after {
    border: none;
  }

  &[disabled] {
    opacity: 0.6;
  }
}

.confirm-secondary {
  margin-top: 24rpx;
  text-align: center;
  font-size: 28rpx;
  color: #999999;
}

.sheet-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
}

.sheet {
  width: 100%;
  padding: 32rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  border-radius: 32rpx 32rpx 0 0;
  background: #ffffff;
  box-sizing: border-box;
}

.sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sheet-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f1f1f;
}

.sheet-close {
  width: 56rpx;
  text-align: right;
  font-size: 40rpx;
  line-height: 1;
  color: #999999;
}

.sheet-body {
  height: 55vh;
  margin-top: 24rpx;
}

.sheet-text {
  font-size: 26rpx;
  line-height: 1.8;
  color: #666666;
  white-space: pre-wrap;
}

.sheet-confirm {
  margin-top: 24rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  text-align: center;
  background: #2c80ff;
  color: #ffffff;
  font-size: 30rpx;
}
</style>
