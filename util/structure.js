const fs = require('fs')
const path = require('path')

const getStaticFileNames = (staticPath) => {
  return fs.readdirSync(staticPath).filter(file => file !== 'package.json' && file !== 'manifest.json')
}

const getStaticDir = () => {
  return path.join(__dirname.split('util')[0], 'static')
}

const getWebpackStaticDir = () => {
  return path.join(__dirname.split('util')[0], 'static_webpack')
}

const getTargetDir = (projectName) => {
  return path.join(process.cwd(), projectName)
}

const getDirs = (projectName) => {
  return { staticPath: getStaticDir(), wpStatic: getWebpackStaticDir(), target: getTargetDir(projectName) }
}

exports.copyAssets = (staticPath, name) => {
  const projectPath = path.join(process.cwd(), name)
  const srcPath = path.join(projectPath, 'src')
  const images = path.join(srcPath, 'images')
  fs.mkdirSync(images)
  const staticImages = path.join(staticPath, 'images')
  const files = getStaticFileNames(staticImages)
  files.forEach(file => {
    fs.copyFileSync(path.join(staticImages, file), path.join(images, file))
  })
}

exports.getStaticFileNames = getStaticFileNames
exports.getTargetDir = getTargetDir
exports.getStaticDir = getStaticDir
exports.getWebpackStaticDir = getWebpackStaticDir
exports.getDirs = getDirs
