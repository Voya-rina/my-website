# F2 · 失效主题按钮修复记录

## 一、控制台错误与根本原因

打开原文件后，点击"切换主题"按钮，控制台报错：

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at 主题切换练习.html:19
```

根本原因：HTML 中按钮的 id 是 `theme-toggle`，而脚本用 `document.querySelector("#theme")` 查找。选择器 `#theme` 匹配不到任何元素，返回 `null`，随后对 `null` 调用 `addEventListener` 抛出 TypeError，事件绑定失败，点击无效。不是"代码有问题"，而是**选择器与元素 id 不一致**。

## 二、最小修复

只改一行，把选择器换成与 id 一致：

```diff
- const button = document.querySelector("#theme");
+ const button = document.querySelector("#theme-toggle");
```

修复后的完整文件见 `theme-toggle-fixed.html`。

## 三、实际验证记录

- 环境：Windows 11，Chrome（最新稳定版），双击打开本地 HTML 文件
- 第 1 次点击：背景变深色（`#202020`）、文字变白 → 进入深色主题
- 第 2 次点击：恢复白底黑字 → 回到浅色主题
- 控制台：无报错
- 结论：连续点击可往返切换，修复有效

## 四、主题选择如何保存（实现放在 F3）

用 localStorage 记住选择：切换时 `localStorage.setItem("voyarina-theme", "dark")`，页面加载时先读这个键，读到就应用对应主题；读不到再用 `prefers-color-scheme` 跟随系统。因为 localStorage 按源（协议 + 域名 + 端口）持久保存，同一浏览器、同一网站地址刷新后仍能保留。F3 的 `src/app.js` 已实现该逻辑，并对 localStorage 不可用的情况做了 try/catch 降级，保证网站不因异常停止运行。
