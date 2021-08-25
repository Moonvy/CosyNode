# 🍧 CosyNode

<p align="center"><img src="./cover.jpg" height="300px"></p>

A simpler and more cosy way to package nodejs applications into executables to run on windows and macos.

```node

cosynode ./index.js ./dist --name=myApp --node-version=9 --upx

✔ Building macos (nodejs v9.9.0-x64)
✔ Building windows (nodejs v-9.9.0-x64-upx)

├── macos (35M)
│   ├── myApp (407K)
│   └── res
│       ├── index.js
│       └── node [34M]
│
└── windows (7.5M)
    ├── myApp.exe (182K)
    └── res
        ├── index.js
        └── node.exe (7.3M)
```

Many times we want to package NodeJS projects into an executable for distribution on windows and macos, but we don't need a single file (pkg's Snapshot mechanism brings a lot of uncertainty and complexity), and we don't want to use a heavy platform like electron or tauri, so we created CosyNode

CosyNode packages NodeJS to an executable entry and preserves the original directory structure, but with a small enough size

## Features

-   keeping the directory structure
-   precompiled NodeJS binaries for Windows and macOS (minimum 1.8 MB)
-   entry executable is extremely small ( < 500K)

## Mechanism

the mechanism of cosynode is very simple, it provides an entry executable that calls `res/node` in its folder and then executes `res/index.js` and passes its own arguments to it.

## Usage

```node
Usage: cosynode [options] [command] <input> <output>

Arguments:
  input                         js file or folder (contains index.js)>
  output                        output folder

Options:
  -V, --version                 output the version number
  --name <name>                 executables file name.
  -w, --only-win                only build for windows.
  -m, --only-mac                only build for macos.
  -n, --node-version <verison>  nodejs verison ('0', '5'(Window XP), '12'(Window 7),'14','16'); default '12'
  -u, --upx                     Use upx compressed nodejs binary (windows only)
  -h, --help                    display help for command


```

## Nodejs Precompiled

We provide a typical nodejs version, taking into account the size of the binaries, or you can just replace them with your own nodejs binaries.

many times our NodeJS applications are very simple and newer versions of nodejs runtimes are very large. CosyNode offers a minimum version of 0.10.0, which is only 1.8 MB after UPX compression

```
[node v0.10]
windows/v-0.10.48-x86-upx       1.81 MB
windows/v0.10.48-x86            5.22 MB
macos/v0.10.48                  10.73 MB

[node v5]
windows/v5.12.0-x86             11.51 MB
windows/v5.12.0-x86-upx         4.29 MB
macos/v5.12.0-x64               22.7 MB

[node v12]
windows/v12.22.3-x64            28.86 MB
windows/v12.22.3-x64-upx        11.1 MB
macos/v12.22.3-x64              45.3 MB

[node v14]
windows/v14.17.2-x64            54.42 MB
windows/v14.17.2-x64-upx        18.9 MB
macos/v14.17.2-x64              72.67 MB

[node v16]
windows/v16.4.2-x64             56.7 MB
windows/v16.4.2-x64-upx         19.88 MB
macos/v16.4.2-x64               76.79 MB
```

### System Version

| OS version | NodeJS version |
| ---------- | -------------- |
| Windows XP | <= 5           |
| Windows 7  | <= 12          |
