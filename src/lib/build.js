const getNode = require("./getNode.js")
const fsex = require("fs-extra")
const path = require("path")
const ora = require("ora")
const chalk = require("chalk")

/**
 * create cosynode exe
 * @param input
 * @param output
 * @param options
 */
module.exports = function build(input, output, options) {
    const spinner = ora("Building...").start()
    let nodeVersion = options.nodeVersion != undefined ? options.nodeVersion : "14"
    let nodeInfoList = getNode(nodeVersion, options)

    nodeInfoList.forEach((nodeInfo) => {
        spinner.text = `Building ${chalk.blue(nodeInfo.platform)} (${chalk.greenBright("nodejs " + nodeInfo.vername)})`
        fsex.ensureDirSync(path.join(output, nodeInfo.platform, "res"))
        let stat = fsex.statSync(input)
        if (stat.isFile()) {
            fsex.copySync(input, path.join(output, nodeInfo.platform, "res", "index.js"))
        } else {
            fsex.copySync(input, path.join(output, nodeInfo.platform, "res"))
        }
        fsex.copySync(nodeInfo.path, path.join(output, nodeInfo.platform, "res", path.basename(nodeInfo.path)))

        if (nodeInfo.platform == "windows") {
            fsex.copySync(
                path.join(__dirname, "../../exe/cosynode-exe.exe"),
                path.join(output, nodeInfo.platform, (options.name || "cosynode") + ".exe")
            )
        } else if (nodeInfo.platform == "macos") {
            fsex.copySync(
                path.join(__dirname, "../../exe/cosynode-exe"),
                path.join(output, nodeInfo.platform, options.name || "cosynode")
            )
        }

        spinner.succeed(spinner.text + chalk.gray(` => ${path.resolve(path.join(output, nodeInfo.platform))}`))
    })
}
