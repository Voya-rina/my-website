# K6 · 报错整理成有效的求助信息

## 环境

- Windows 11；Chrome 最新稳定版；无构建工具，直接打开本地 HTML 文件
- 代码：`docs/f2-theme-bug/` 中的主题切换练习（修复前版本）

## 复现步骤

1. 把练习代码保存为 `主题切换练习.html`，双击用 Chrome 打开
2. 打开开发者工具（F12）切到 Console
3. 点击页面上的"切换主题"按钮

## 预期行为

页面在浅色 / 深色主题之间切换。

## 实际行为

页面无任何变化，Console 出现报错：

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at 主题切换练习.html:19
```

## 最小相关代码

```html
<button id="theme-toggle" type="button">切换主题</button>
<script>
  const button = document.querySelector("#theme");   // id 实际是 theme-toggle
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
</script>
```

## 我向 AI / 同学求助时会发的内容

"我在做一个主题切换按钮，点击没反应，控制台报 `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`，指向 `button.addEventListener` 这一行。按钮 id 是 `theme-toggle`，脚本里用 `document.querySelector("#theme")` 获取。环境是 Chrome 最新版直接打开本地文件。问题出在哪？为什么 querySelector 会返回 null？"

## 可能原因与验证结果

可能原因：选择器 `#theme` 与元素实际 id `theme-toggle` 不一致，querySelector 返回 null。验证：在 Console 执行 `document.querySelector("#theme")` 返回 `null`，执行 `document.querySelector("#theme-toggle")` 返回按钮元素；把选择器改为 `#theme-toggle` 后点击正常切换、无报错。验证结果：原因成立，问题已解决。
