#!/usr/bin/env node
const fs = require('fs')
const os = require('os')
const path = require('path')
const args = process.argv.slice(2)
const packageJSON = require('./static/package.json')
const manifestJSON = require('./static/manifest.json')
const version = Number(process.version.match(/^v(\d+\.\d+)/)[1])

function write (s) {
  return process.stdout.write(s)
}

function getStaticFileNames (staticPath) {
  return fs.readdirSync(staticPath).filter(file => file !== 'package.json' && file !== 'manifest.json')
}
function copyContents (originPath, destinationPath, files) {
  files.forEach(file => {
    const currentOriginPath = path.join(originPath, file)
    const currentDestinationPath = path.join(destinationPath, file)
    const isDirectory = fs.lstatSync(currentOriginPath).isDirectory()
    if (!isDirectory) {
      version >= 8.5 ? fs.copyFileSync(currentOriginPath, currentDestinationPath)
        : fs.createReadStream(currentOriginPath).pipe(fs.createWriteStream(currentDestinationPath))
      return true
    } else {
      // fs.mkdirSync(path.join(originPath, file))
      fs.mkdirSync(currentDestinationPath)
      const recursiveFiles = getStaticFileNames(currentOriginPath)
      return copyContents(currentOriginPath, currentDestinationPath, recursiveFiles)
    }
  })
}

function main () {
  if (args.lengh === 0) return write('an error occured, please provide a name')
  const name = args[0]
  const author = os.userInfo().username
  const namedPackageFile = { ...packageJSON, name, author }
  const namedManifestFile = { ...manifestJSON, name }
  fs.mkdirSync(name)
  const projectPath = path.join(process.cwd(), name)
  const staticPath = path.join(__dirname, 'static')
  fs.writeFileSync(path.join(projectPath, `package.json`), JSON.stringify(namedPackageFile, null, 2))
  fs.writeFileSync(path.join(projectPath, `manifest.json`), JSON.stringify(namedManifestFile, null, 2))
  const files = getStaticFileNames(staticPath)
  copyContents(staticPath, projectPath, files)
  write(`DONE!
    run:
    cd ${name}

    have fun!
  `)
}
main()
