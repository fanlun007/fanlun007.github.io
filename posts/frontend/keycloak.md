---
date: 2024-09-21
title: Keycloak-js 和 Keycloak-connect
category: Keycloak
tags:
    - Keycloak
description: Keycloak-js 和 Keycloak-connect 区别、使用
---

Keycloak 提供了多种适配器（Adapters）来简化与不同类型应用的集成。其中，keycloak-js 和 keycloak-connect 是两个常用的 JavaScript 适配器，分别针对前端和后端应用。理解它们的区别有助于在不同的应用场景中选择合适的工具进行集成。以下是对两者的详细对比和解释：

# 1. keycloak-js

**keycloak-js** 是一个纯前端的 JavaScript 适配器，主要用于单页应用（SPA）或其他前端框架（如 React、Angular、Vue.js 等）。它直接在浏览器中运行，与 Keycloak 进行交互以处理用户认证和授权。

## 主要特性：
 - 前端集成：适用于需要在客户端处理认证流程的应用。
 - OAuth 2.0 和 OpenID Connect 支持：支持标准的认证协议，便于与 Keycloak 配合使用。
 - Token 管理：自动处理访问令牌（Access Token）和刷新令牌（Refresh Token）的获取与更新。
 - 会话管理：管理用户会话，包括登录、登出和会话状态的维护。
 - 灵活性：适用于各种现代前端框架，提供灵活的配置选项。
## 使用场景：
 - 单页应用（SPA）：如使用 React、Angular 或 Vue.js 构建的应用，需要在客户端处理用户认证。
 - 静态网站：需要简单集成认证功能的静态前端项目。
 - 移动应用前端：基于 Web 技术构建的移动应用前端部分。

::: code-group 
```javascript [index.js]
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://<keycloak-server>/auth',
  realm: 'your-realm',
  clientId: 'your-client-id',
});

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (authenticated) {
    console.log('用户已认证');
    // 可以访问 keycloak.token 等属性
  } else {
    console.warn('用户未认证');
  }
});
```
:::

# 2. keycloak-connect

keycloak-connect 是一个针对 Node.js 的中间件，专门用于在后端服务器上处理与 Keycloak 的集成。它基于 Express 框架构建，能够保护后端 API 和服务，确保只有经过认证和授权的请求能够访问受保护的资源。

## 主要特性：
 - 后端集成：适用于 Node.js 后端应用，作为中间件保护 API 路由。
 - 会话管理：处理用户会话和令牌验证，确保后端请求的合法性。
 - 角色和权限控制：基于 Keycloak 的角色和权限进行访问控制，细粒度管理资源访问。
 - 代理模式支持：能够在代理模式下工作，处理来自不同客户端的请求。
 - 扩展性：支持自定义认证流程和策略，满足复杂的安全需求。

## 使用场景：
 - Node.js 后端 API：保护 RESTful API，确保只有经过授权的客户端能够访问。
 - Express 应用：在基于 Express 的服务器上集成认证和授权功能。
 - 微服务架构：为各个微服务提供统一的认证和授权机制。

::: code-group 
```javascript [index.ts]
import express from "express"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import KeycloakInstance from "./keycloak"
import routes from "./routes"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, "./.env") })

const app = express()
const port = process.env.PORT || 3000

app.use(KeycloakInstance.middleware())

app.use("/", routes)

// Serve static files from the "dist" directory
app.use(express.static(join(__dirname, "../dist")))

// Serve the index.html for all other routes
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, "../dist", "index.html"))
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
```

```javascript [routes.ts]
import express from "express"
import KeycloakInstance from "./keycloak"

const router = express.Router()

// Fake Data
const menuItems = [
  {
    name: "Croissant",
    price: "$1",
    onMenu: true
  },
  {
    name: "Latte",
    price: "$5",
    onMenu: true
  },
  {
    name: "Roti Canai",
    price: "$0.50",
    onMenu: true
  },
  {
    name: "Hot Chocolate",
    price: "$5",
    onMenu: false
  },
  {
    name: "Satay",
    price: "$8",
    onMenu: false
  },
  {
    name: "Pad Thai",
    price: "$7",
    onMenu: false
  }
]

// Route open to any role
router.get("/menu-items", [KeycloakInstance.protect()], async (req, res, next) => {
  try {
    const filtered = menuItems.filter((item) => {
      if (item.onMenu === true) {
        return item
      }
    })

    // Return filtered data
    res.json(filtered)
  } catch (error) {
    return next(error)
  }
})

export default router

```

```javascript [keycloak.ts]
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import Keycloak from "keycloak-connect"
import type KeycloakConnect from "keycloak-connect"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, "./.env") })

const config = {
  realm: process.env.KEYCLOAK_REALM,
  "auth-server-url": `${process.env.KEYCLOAK_URL}`,
  "ssl-required": "external",
  resource: process.env.KEYCLOAK_CLIENT,
  "bearer-only": true
} as KeycloakConnect.KeycloakConfig

const KeycloakInstance = new Keycloak({}, config)
export default KeycloakInstance

```
:::

# 如何选择
 - 前端应用：如果你正在开发一个前端应用（如 SPA），需要在客户端处理用户认证和管理用户会话，那么 keycloak-js 是合适的选择。
 - 后端服务：如果你需要保护 Node.js 后端 API，确保只有经过认证和授权的请求能够访问，那么 keycloak-connect 是更合适的工具。 
