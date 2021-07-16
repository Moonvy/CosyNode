#!/usr/bin/env node
const { program } = require("commander")
const listNode = require("./lib/listNode.js")
const build = require("./lib/build.js")
var treeify = require("treeify")



program
    .version("0.1.0")
    .name("cosynode")
    .argument("input", "js file or folder (contains index.js)>")
    .argument("output", "output folder")
    .option("--name <name>", "executables file name.")
    .option("-w, --only-win", "only build for windows.")
    .option("-m, --only-mac", "only build for macos.")
    .option("-n, --node-version <verison>", "nodejs verison ('0','5'(Windows XP), '12'(Windows 7),'14','16'); default '12'")
    .option("-u, --upx", "Use upx compressed nodejs binary (windows only)")
    .action((input, output, options) => {
        console.log("CosyNode 🍧")
        console.log("config", { input, output, options }, "\n")

        build(input, output, options)
    })

program
    .command("list")
    .option("--size", "only show size")
    .action((options) => {
        if (options.size) {
            let listOb = listNode()
            for (let ver in listOb) {
                for (let key in listOb[ver]) {
                    let ob = listOb[ver][key]
                    console.log(`${ob.name}\t\t${ob.size}`)
                }
            }
        } else {
            console.log(treeify.asTree(listNode(), true))
        }
    })

program.showHelpAfterError()
program.parse(process.argv)
