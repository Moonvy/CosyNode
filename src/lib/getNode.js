const listNode = require("./listNode.js")
module.exports = function getNode(mainVerison, options) {
    let nodeListOb = listNode()
    let platformOb = nodeListOb[mainVerison]

    let nodeInfoList = []

    if (!options.onlyWin) {
        if (platformOb.macos) {
            nodeInfoList.push(platformOb.macos)
        }
    }

    if (!options.onlyMac) {
        if (options.upx) {
            if (platformOb.windows_upx) {
                nodeInfoList.push(platformOb.windows_upx)
            } else {
                throw new Error("not found windows_upx. from:" + JSON.stringify(platformOb))
            }
        } else if (platformOb.windows) {
            nodeInfoList.push(platformOb.windows)
        }
    }

    return nodeInfoList
}
