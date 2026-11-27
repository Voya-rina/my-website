# Git 基础说明
Git 是分布式版本控制系统，在本机记录文件快照、管理提交历史；GitHub 是托管 Git 仓库的在线平台，提供远程备份、协作与 Issue / PR 等功能。工作区是正在编辑的文件目录；提交（commit）把暂存内容固化成一个带说明的版本快照；远程仓库（remote）是托管在 GitHub 上的副本，通过 push / pull 与本地同步。日常流程：修改工作区 → add 暂存 → commit 提交 → push 推送到远程。

Git是是装在本地的版本管理工具，离线也能用；
Github，顾名思义就是托管git仓库的在线平台，可以把本地仓库push到云端，便于多人协作，包括issue、pull request之类的功能
工作区：即workspace，就是本地项目所在的文件夹；可以在IDE中进行便捷的更改
提交：即commit，把一部分的改动存为一个快照，便于使用git进行版本管理，这样就可以回退或者从历史节点开始重新编辑一个版本
远程仓库：保存在GitHub上的repository，可以通过 git push 推送本地提交、git pull 拉取他人改动，实现多人协作或备份