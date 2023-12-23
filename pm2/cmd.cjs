const ars = [...process.argv.slice(4)]
const BotName = 'a-yunzai'
const findArs = ars.find(item => item.startsWith('@'))
const apps = []
if (!findArs) {
  apps.push({
    name: BotName,
    args: ars
  })
} else {
  if (!ars[0].startsWith('@')) ars.unshift(BotName)
  const msg = ars.join(' ')
  const arr = msg.split('@')
  for (const arg of arr) {
    if (arg == '') continue
    const ar = arg.split(' ')
    const existingApp = apps.find(app => app.name === ar[0])
    if (!existingApp) {
      const name = ar.shift()
      if (name != undefined) {
        apps.push({
          name: name,
          args: ar ?? []
        })
      }
    }
  }
}
console.log('------------------------------------------')
for (const item of apps) {
  console.log('npm run start', item.name, item.args.join(' '))
  console.log('npm run logs', item.name)
  console.log('------------------------------------------')
}
console.log('npm run list')
console.log('npm run monit')
console.log('npm run delete')
console.log('npm run kill')
console.log('------------------------------------------')
module.exports = apps
