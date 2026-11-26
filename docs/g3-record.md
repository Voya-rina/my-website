# G3 · 恢复练习与复现验证记录

## 一、exercise/recovery 分支恢复练习

练习分支：`exercise/recovery`（独立于 main，不影响真实功能）

三个提交：

| 提交 | 说明 |
| --- | --- |
| `a31bc2e` | 新增 `docs/recovery-note.txt`，内容 `status=ready` |
| `2f866da` | 将内容改为 `status=broken`（模拟错误改动） |
| `1569364` | `git revert --no-edit HEAD` 撤销第二个提交，形成新的恢复提交 |

验证结果：

- 恢复提交后 `docs/recovery-note.txt` 内容回到 `status=ready`
- 原提交历史完整保留：`git log` 中 `a31bc2e`、`2f866da`、`1569364` 三个提交都在，revert 不删除历史而是新增一个反向提交
- 分支已推送至 GitHub，按题目要求不合入默认分支

## 二、新目录复现验证

在一个全新目录中克隆默认分支 main（提交 `4dfb967`），未借用旧目录任何未提交文件：

```bash
git clone https://github.com/Voya-rina/my-website.git
cd my-website
python -m http.server 8019
# 浏览器打开 http://localhost:8019/src/index.html
```

实际结果：

- 页面正常打开，个人介绍、技能、项目（含分类筛选按钮）、联系各区可见
- `src/index.html`、`styles.css`、`app.js`、`data/projects.js` 全部返回 200，无加载失败
- 没有遗漏步骤：README 的启动步骤照做即可，无需额外配置

遗漏过的步骤记录：最初直接双击 `index.html`（file:// 协议）时数据加载会受浏览器安全限制，README 中已写明必须通过本地 HTTP 服务访问，此为容易遗漏的一点。

## 三、v0.1.0 标签

默认分支最终可运行版本已打标签并推送：

```bash
git tag -a v0.1.0 -m "v0.1.0: 可运行的默认分支版本"
git push origin v0.1.0
```

标签链接：仓库 Tags 页面中的 v0.1.0。

## 四、Git 操作场景说明

| 操作 | 场景 |
| --- | --- |
| `clone` | 第一次获取整个远程仓库到本地（含全部历史），如本练习的新目录复现 |
| `pull` | 把远程的新提交同步到本地已有仓库，多人协作或换机器后先 pull |
| `commit` | 把暂存区的改动固化成本地版本快照，附带说明信息 |
| `push` | 把本地提交上传到远程仓库，供备份与协作 |
| `revert` | 生成一个反向提交来撤销某次已提交的改动，保留历史，适合公开分支的安全回退 |
