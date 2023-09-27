import puppeteer, {
  Browser,
  PuppeteerLaunchOptions,
  ScreenshotOptions,
} from "puppeteer";

/**
 * 截图次数
 */
let pic: number = 0;

/**
 * 重启控制
 */
const RestartControl: number = 30;

/**
 * 实例
 */
let browser: Browser;

/**
 * 实例控制
 */
let isBrowser: boolean = false;

/**
 * 实例配置
 */
let LaunchCfg: PuppeteerLaunchOptions;

/**
 * 配置浏览器参数
 * @param val
 */
export function setLanchConfig(val: PuppeteerLaunchOptions) {
  LaunchCfg = val;
}

/**
 * 得到pup配置
 * @returns 
 */
export function getLanchConfig(){
  return LaunchCfg
}

/**
 * 截图并返回buffer
 * @param htmlPath 绝对路径
 * @param tab 截图元素位
 * @param type 图片类型
 * @param quality 清晰度
 * @param timeout 响应检查
 * @returns
 */
export async function screenshot(
  htmlPath: string | Buffer | URL,
  Options: {
    SOptions: ScreenshotOptions;
    tab?: string;
    timeout?: number;
  }
): Promise<string | false | Buffer> {
  const { SOptions, tab = "body", timeout = 120000 } = Options;

  /**
   * 检测是否开启
   */
  if (isBrowser == false) {
    if (!(await startChrom())) return false;
  }
  if (pic <= RestartControl) {
    /**
     * 记录次数
     */
    pic++;
  } else {
    /**
     * 重置次数
     */
    pic = 0;
    console.info("[puppeteer] close");
    isBrowser = false;
    browser.close().catch((err) => console.error(err));
    console.info("[puppeteer] reopen");
    if (!(await startChrom())) return false;
    pic++;
  }
  /**
   * 开始截图
   */
  return await startPage(htmlPath, SOptions, tab, timeout).catch((err) => {
    console.error(err);
    return false;
  });
}

/**
 * 开始截图
 * @param htmlPath  绝对路径
 * @param SOptions  { type 图片类型 , quality 清晰度   }
 * @param tab  截图元素位
 * @param timeout  响应检查
 * @returns
 */
export async function startPage(
  htmlPath: string | Buffer | URL,
  SOptions: ScreenshotOptions,
  tab: string,
  timeout: number
): Promise<string | false | Buffer> {
  try {
    /**
     * 开始
     */
    if (!isBrowser) {
      if (!(await startChrom())) return false;
    }
    console.info("[puppeteer] start");
    /**
     * 实例化
     */
    const page = await browser.newPage();
    /**
     * 挂载网页
     */
    await page.goto(`file://${htmlPath}`, {
      timeout,
    });
    /**
     * 获取元素
     */
    const body = await page.$(tab);
    /**
     * 得到图片
     */
    console.info("[puppeteer] success");
    return await body.screenshot(SOptions).catch((err) => {
      console.error(err);
      return false;
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 启动浏览器
 * @returns
 */
export async function startChrom(): Promise<boolean> {
  try {
    browser = await puppeteer.launch(LaunchCfg);
    isBrowser = true;
    console.info("[puppeteer] open success");
    return true;
  } catch (err) {
    console.error(err);
    isBrowser = false;
    console.error("[puppeteer] open fail");
    return false;
  }
}
