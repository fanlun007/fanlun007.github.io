---
date: 2024-08-31
title: 多仓库，多个SSH Key
category: git
tags:
    - git
    - ssh
description: 不同的仓库可能是不同的访问账号， 需要多个SSH Key
---

# 配置多仓库不同账户访问

### 创建文件

```bash
# 创建文件
touch ~/.ssh/config
```
### 编辑config内容，输入以下内容:

```bash
Host *
HostkeyAlgorithms +ssh-rsa
PubkeyAcceptedKeyTypes +ssh-rsa

# github配置
Host github.com             // 仓库名
    HostName github.com     // 仓库域名或IP
    User user1              // 访问账号
    PreferredAuthentications publickey  
    IdentityFile ~/.ssh/id_rsa_github   // 私钥路径

# gitlab配置
Host gitlab.com
    HostName gitlab.com
    User  user
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_gitlab
```
### 校验配置
```bash
# 打开ssh agent
ssh-agent bash
# 清除SSH缓存,添加新SSH密钥到SSH agent
ssh-add -D
ssh-add ~/.ssh/id_rsa_github
ssh-add ~/.ssh/id_rsa_gitlab
# 测试连接
ssh -T git@github.com
ssh -T git@gitlab.com
```
