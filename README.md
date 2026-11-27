# Voyarina · 个人网站

深蓝电控组第二轮考核 · 共同部分二（GitHub 与项目管理实践）+ 方向一（前端软件）的交付仓库。

## 项目目标

制作一个展示个人信息与项目的前端网站，作为 G1～G3 与 F1～F3 的同一个项目，贯穿仓库管理、增量开发、恢复练习与前端开发全流程。

## 所选方向

前端软件（原生 HTML / CSS / JavaScript，无框架、无构建步骤）。

## 目录结构

```
项目根目录/
├─ README.md              # 本文件
├─ .gitignore             # 忽略规则
├─ clicktorun.bat         # 双击启动脚本（启动本地服务并打开浏览器）
├─ docs/                  # 问答、需求、AI 记录、测试记录
│  ├─ G1_Git基础说明.md   # G1-4：Git 基础说明（约 150 字）
│  ├─ F2_BUG修复/       # F2：失效主题按钮的修复与验证记录
│  ├─ G2_测试记录.md      # G2：分类筛选测试记录
│  ├─ G3_复现记录.md      # G3：恢复练习与复现验证记录
│  ├─ K6_问题报告.md      # K6：求助信息报告
│  ├─ F3_AI协作记录.md    # F3：AI 协作记录
│  └─ screenshots/        # 360px / 1280px 截图（浅色 / 深色）
├─ assets/                # 静态资源
│  ├─ projectshot/        # 项目展示截图（浅色 / 深色）
│  │  ├─ ticket-request-light.png / ticket-request-dark.png
│  │  ├─ questedu-light.png / questedu-dark.png
│  │  ├─ questedu-mobile-light.png / questedu-mobile-dark.png
│  │  ├─ caliedu-light-1~4.jpg / caliedu-dark-1~4.jpg
│  │  └─ zzupocket-light-1~4.jpg / zzupocket-dark-1~4.jpg
│  └─ background/         # 页面底部背景装饰图（浅色 / 深色）
└─ src/                   # 网站源代码与入口
   ├─ index.html          # 头像等静态资源直接引用 GitHub CDN
   ├─ styles.css
   ├─ app.js              # 展示逻辑
   └─ data/
      └─ projects.js      # 项目数据（与展示逻辑分离）
```

## 环境版本

- 操作系统：Windows 11
- 浏览器：Chrome / Edge 最新稳定版
- Git：2.x
- 本地 HTTP 服务：Python 3.x（任选其一，见下）

无第三方依赖，无需安装任何包。

## 启动步骤

页面资源统一通过本地 HTTP 服务访问（直接双击 index.html 时 file:// 协议会被浏览器限制）。需要本机已安装 Python 3。

### 方式一：双击启动

双击仓库根目录的 `clicktorun.bat`：自动启动本地服务，用默认浏览器打开 `http://localhost:8000/src/index.html`。关闭弹出的命令行窗口（或 Ctrl+C）即停止服务。

### 方式二：手动启动
- Python

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000/src/index.html
```

- Node.js

```bash
npx serve .
# 浏览器打开提示的地址，进入 src/index.html
```

- VS Code Live Server

安装 Live Server 扩展后右键 `src/index.html` → Open with Live Server。

## 功能说明

- 导航、个人介绍、技能展示、项目展示、联系信息
- 项目数据与展示逻辑分离：`src/data/projects.js` 只存数据，`src/app.js` 负责渲染
- 项目分类筛选：按数据文件中的分类自动生成筛选按钮，可查看全部或单个分类，筛选同时作用于项目卡片与展示区
- 展示区：四个项目的真实运行截图，全部铺满宽度并统一节高；截图随主题自动切换浅 / 深版本，手机截图按项目横向排满；当前项目彩色高亮、其余灰度弱化，左侧卡片随滚动联动项目信息（移动端固定在顶部）
- 联系方式：邮箱（mailto 直达）、QQ、GitHub 入口
- 座右铭：中英双语板块
- 技能区背景：技能标签组成的淡色词云，横向铺满窗口宽度，随页面滚动交替左右漂移（prefers-reduced-motion 时静止）
- 页面底部：与主题匹配的背景装饰图，向上渐隐淡入页面背景
- 主题切换：浅色 / 深色，选择保存在 localStorage，刷新后保留；存储不可用时仍可切换
- 响应式布局：360px 与 1280px 视口下均可读、可操作
- 键盘可访问：筛选与主题按钮可聚焦，焦点可见，图片有替代文本

## 构建说明

纯静态网站，无构建步骤，源代码即最终产物。

## 验收与测试

截图与验证记录见 `docs/screenshots/`；主题按钮修复过程见 `docs/F2_BUG修复/`；Git 流程记录见 `docs/` 下对应文档。
