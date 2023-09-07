import { execSync } from 'child_process'
// docker容器 启动时运行命令
execSync('npm run app kook', { stdio: 'inherit' })
