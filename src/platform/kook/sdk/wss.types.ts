/**
 * ****
 * ***
 */
export interface KOOKOptions {
  /**
   * 钥匙
   */
  token: string
  /**
   * 主人编号
   */
  masterID?: string | string[]
}

/**
 *
 */
export const defineKOOK: KOOKOptions = {
  token: '',
  masterID: ''
}
