# F1 · 前端页面怎样组成和运行（约 350 字）

**三者的分工。** HTML 描述页面结构和内容，如本站 `src/index.html` 中的 `<section id="projects">` 定义项目展示区；CSS 负责外观，如 `styles.css` 中用 CSS 变量实现浅色 / 深色两套配色；JavaScript 负责行为，如 `app.js` 中监听主题按钮点击并切换 `data-theme` 属性。

**DOM 与交互。** DOM 是浏览器把 HTML 解析成的树形对象结构，JavaScript 通过它读写页面元素。用户点击主题按钮时，事件监听器执行 `document.documentElement.setAttribute("data-theme", next)`，CSS 因 `[data-theme="dark"]` 选择器匹配而换用深色变量，页面显示随之改变；项目卡片也是 JS 用 `document.createElement` 创建后挂到 DOM 上才显示的。

**相对路径与根路径。** 相对路径（如 `data/projects.js`）以当前文件位置为基准；根路径（如 `/src/app.js`）从域名根目录算起。页面部署到子目录时，根路径仍指向域名根，图片和脚本会 404，相对路径则更安全，但要写对层级。

**为何用本地 HTTP 服务。** 直接双击打开页面时地址是 `file://`，浏览器出于安全限制阻止脚本读取本地文件（如 JSON 数据），会报跨域错误。通过 `python -m http.server 8000` 在项目根目录启动本地服务，以 `http://localhost:8000/src/index.html` 访问，资源正常加载。这是我的实际启动方法，全程不需要后端。
