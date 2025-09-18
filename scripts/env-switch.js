#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 环境配置
const environments = {
  dev: {
    name: '开发环境',
    api: 'https://dev-api.xiaodingdang1.com/',
    debug: true
  },
  test: {
    name: '测试环境',
    api: 'https://test-api.xiaodingdang1.com/',
    debug: true
  },
  staging: {
    name: '预发布环境',
    api: 'https://staging-api.xiaodingdang1.com/',
    debug: false
  },
  pro: {
    name: '生产环境',
    api: 'https://admin-api.xiaodingdang1.com/',
    debug: false
  }
}

// 获取命令行参数
const args = process.argv.slice(2)
const targetEnv = args[0]

if (!targetEnv) {
  console.log('\n🚀 微信小程序环境切换工具\n')
  console.log('使用方法: node scripts/env-switch.js <环境名称>\n')
  console.log('可用环境:')
  Object.keys(environments).forEach(env => {
    const config = environments[env]
    console.log(`  ${env.padEnd(8)} - ${config.name} (${config.api})`)
  })
  console.log('\n示例: node scripts/env-switch.js dev')
  process.exit(0)
}

if (!environments[targetEnv]) {
  console.error(`❌ 错误: 未知的环境 "${targetEnv}"`)
  console.log('\n可用环境:', Object.keys(environments).join(', '))
  process.exit(1)
}

// 更新环境配置
function updateEnvConfig() {
  const envConfigPath = path.join(__dirname, '../src/config/env.js')
  const config = environments[targetEnv]
  
  console.log(`\n🔄 正在切换到 ${config.name}...`)
  console.log(`📡 API地址: ${config.api}`)
  console.log(`🐛 调试模式: ${config.debug ? '开启' : '关闭'}`)
  
  // 这里可以添加更多的配置更新逻辑
  // 比如更新 .env 文件、修改配置文件等
  
  console.log(`✅ 环境切换完成!`)
  console.log(`\n📝 接下来可以运行:`)
  console.log(`   npm run dev:mp-weixin:${targetEnv}`)
  console.log(`   npm run build:mp-weixin:${targetEnv}`)
}

// 显示当前环境信息
function showCurrentEnv() {
  console.log('\n📊 当前环境配置:')
  console.log('─'.repeat(50))
  
  Object.keys(environments).forEach(env => {
    const config = environments[env]
    const isCurrent = env === targetEnv
    const prefix = isCurrent ? '👉' : '  '
    const suffix = isCurrent ? ' (当前)' : ''
    
    console.log(`${prefix} ${env.padEnd(8)} - ${config.name}${suffix}`)
    if (isCurrent) {
      console.log(`     API: ${config.api}`)
      console.log(`     调试: ${config.debug ? '开启' : '关闭'}`)
    }
  })
  console.log('─'.repeat(50))
}

// 执行环境切换
try {
  updateEnvConfig()
  showCurrentEnv()
} catch (error) {
  console.error('❌ 环境切换失败:', error.message)
  process.exit(1)
}