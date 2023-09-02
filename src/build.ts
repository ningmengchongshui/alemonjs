import { join } from "path";
import { rollup, RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import multiEntry from "@rollup/plugin-multi-entry";
/**
 * 编译插件
 * @param obj
 * @returns
 */
export async function compilationTools(obj: {
  input: string;
  file: string;
  external?: string[];
}) {
  try {
    const config: RollupOptions = {
      input: [obj?.input],
      output: [
        {
          /**
           * 输出文件路径和名称
           */
          file: obj?.file,
          format: "module",
          /**
           * 是否生成 sourcemap 文件
           */
          sourcemap: false,
        },
      ],
      plugins: [
        typescript({
          /**
           * 禁用声明文件的生成
           */
          declaration: false,
        }),
        multiEntry({
          /**
           * 指定要匹配的文件路径模式
           */
          include: [obj.input],
        }),
      ],
      external: obj?.external ?? [],
    };
    /**
     * 使用 Rollup API 编译代码
     */
    const bundle = await rollup(config);
    /**
     * 写入
     */
    await bundle.write(config.output[0]);
    /**
     * 配置不存在
     */
    if (!obj?.file) return {};
    /**
     * 集成
     */
    const apps = await import(`file://${join(process.cwd(), obj?.file)}`).catch(
      (err) => {
        console.error(err);
        return {};
      }
    );
    return apps;
  } catch (error) {
    console.error(error);
    console.error("err:", obj.input);
    return {};
  }
}
