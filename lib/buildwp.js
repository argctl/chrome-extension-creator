const fs = require('fs')
const path = require('path')
const os = require('os')
const { getStaticFileNames, getDirs } = require('./structure')
// Take a file and place the file in an a new directory with the name (no file extension) and copy contents to index.js
const fileToDirIndex = (originPath, name, destinationPathName) => {
  const [dirName, type] = name.split('.')
  if (type !== 'js') return
  const p = path.join(destinationPathName, dirName)
  fs.mkdirSync(p)
  fs.copyFileSync(path.join(originPath, name), path.join(p, 'index.js'))
}

const webpackStaticFiles = (projectName) => {
  const staticPath = path.join(__dirname.split('lib')[0], 'static_webpack')
  const destinationPath = path.join(process.cwd(), projectName)
  const ignoreFiles = ['add-package.json']
  const files = getStaticFileNames(staticPath)
  files.forEach(file => {
    ignoreFiles.indexOf(file) === -1 && fs.copyFileSync(path.join(staticPath, file), path.join(destinationPath, file))
  })
}

const webpackPackageJSON = (projectName) => {
  const normalPackage = require(path.join(__dirname.split('lib')[0], 'static', 'package.json'))
  const addPackage = require(path.join(__dirname.split('lib')[0], 'static_webpack', 'add-package.json'))
  const manifest = require(path.join(__dirname.split('lib')[0], 'static', 'manifest.json'))
  const newManifest = { ...manifest, name: projectName }
  const newPackage = { ...normalPackage, ...addPackage, name: projectName, author: os.userInfo().username }
  fs.writeFileSync(path.join(process.cwd(), projectName, 'package.json'), JSON.stringify(newPackage, null, 2))
  fs.writeFileSync(path.join(process.cwd(), projectName, 'src', 'manifest.json'), JSON.stringify(newManifest, null, 2))
}

const makeWPFiles = (projectName) => {
  const staticPath = path.join(__dirname.split('lib')[0], 'static')
  const destinationPath = path.join(process.cwd(), projectName, 'src')
  const files = getStaticFileNames(staticPath)
  files.forEach(file => {
    fileToDirIndex(staticPath, file, destinationPath)
  })
}

const prepareStructure = (projectName) => {
  // TODO make recursive one liner
  fs.mkdirSync(path.join(process.cwd(), projectName))
  fs.mkdirSync(path.join(process.cwd(), projectName, 'src'))
}

const copyHtml = (projectName) => {
  const { staticPath, target } = getDirs(projectName)
  const files = getStaticFileNames(staticPath)
  files.forEach(file => {
    const [name, type] = file.split('.')
    if (type === 'html') {
      const originPath = path.join(staticPath, file)
      const destPath = path.join(target, 'src', name, file)
      fs.copyFileSync(originPath, destPath)
    }
  })
}

const copyImages = (projectName) => {
  const { staticPath, target } = getDirs(projectName)
  fs.mkdirSync(path.join(target, 'src', 'images'))
  const files = getStaticFileNames(path.join(staticPath, 'images'))
  files.forEach(file => {
    fs.copyFileSync(path.join(staticPath, 'images', file), path.join(target, 'src', 'images', file))
  })
}

const makeBasicWebpack = (projectName) => {
  prepareStructure(projectName)
  makeWPFiles(projectName)
  webpackStaticFiles(projectName)
  webpackPackageJSON(projectName)
  copyHtml(projectName)
  copyImages(projectName)
}

module.exports.makeBasicWebpack = makeBasicWebpack
