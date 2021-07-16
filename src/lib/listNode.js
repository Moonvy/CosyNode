const fs = require("fs")
const filesize = require("filesize")
const path = require("path")

module.exports = function listNode() {
    let list_macos = listNodeFromDir("macos")
    let list_windows = listNodeFromDir("windows")

    let listOb = {}

    list_windows.forEach((nodeInfo) => {
        toListOb("windows", nodeInfo)
    })
    list_macos.forEach((nodeInfo) => {
        toListOb("macos", nodeInfo)
    })

    function toListOb(platform, nodeInfo) {
        // console.log("nodeInfo.vername", nodeInfo.vername)
        let mainVersion = /v[\-]?([0-9]+?)\./.exec(nodeInfo.vername)[1]

        let isUPX = /\-upx$/.test(nodeInfo.vername)
        if (!listOb[mainVersion]) listOb[mainVersion] = {}
        listOb[mainVersion][platform + (isUPX ? "_upx" : "")] = nodeInfo
    }

    return listOb
}

function listNodeFromDir(platform) {
    let platformDir = path.join(__dirname, "../../node", platform)

    let nodeList = []
    fs.readdirSync(platformDir).forEach((vername) => {
        let nodePath
        nodePath = path.join(platformDir, vername, "node")
        if (fs.existsSync(nodePath)) {
            nodeList.push({ name: `${platform}/${vername}`, vername, platform, path: nodePath })
            return
        }
        nodePath = path.join(platformDir, vername, "node.exe")
        if (fs.existsSync(nodePath)) {
            nodeList.push({ name: `${platform}/${vername}`, vername, platform, path: nodePath })
            return
        }
    })

    nodeList.forEach((nodeInfo) => {
        let stat = fs.statSync(nodeInfo.path)
        nodeInfo.size = filesize(stat.size)
    })
    return nodeList
}
