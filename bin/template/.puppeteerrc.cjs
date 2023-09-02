const os = require('os')
const { existsSync } = require('fs')
const { execSync } = require('child_process')
const arch = os.arch()
/**
 * 是否跳过下载
 */
let skipDownload = false
/**
 * 浏览器路径
 */
let executablePath

/**
 * windows浏览器路径
 */
const win32Edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
/**
 * linux | android
 */
if (process.platform == 'linux' || process.platform == 'android') {
  /**
   * 如果arm64架构跳过下载
   */
  if (arch == 'arm64' || arch == 'aarch64') {
    console.info('[arm64/aarch64] system')
    skipDownload = true
  }

  const map = {
    0: 'whereis chromium-browser',
    1: 'whereis firefox'
  }

  /**
   * 获取路径
   */
  try {
    const chromiumPath = execSync(map[0]).toString().split(' ')[1]
    if (chromiumPath) {
      skipDownload = true
      executablePath = chromiumPath
      console.info('[Chromium] start')
      return
    }
  } catch (error) {
    console.error('Failed to get Chromium path:', error)
  }

  /**
   * 不存在 chromium-browser
   * 但存在 whereis firefox
   */
  try {
    const firefoxPath = execSync(map[1]).toString().split(' ')[1]
    if (firefoxPath) {
      skipDownload = true
      executablePath = firefoxPath
      console.info('[Firefox] start')
      return
    }
  } catch (error) {
    console.error('Failed to get Firefox path:', error)
  }
  /**
   * 直接找路径
   */
  const arr = [
    '/usr/bin/chromium',
    '/snap/bin/chromium',
    '/usr/bin/chromium-browser'
  ]
  for (const item of arr) {
    if (existsSync(item)) {
      skipDownload = true
      executablePath = item
      console.info('[Chromium] start')
      break
    }
  }
} else if (process.platform == 'win32' && existsSync(win32Edge)) {
  /**
   * win32 且存在 Edge
   */
  skipDownload = true
  executablePath = win32Edge
  console.info('[Win32 Edge] start')
}

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  skipDownload,
  executablePath
}
