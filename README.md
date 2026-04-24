# 投资决策水平测试

一个轻量的投资者自测工具：10 道题，根据总分把答题者映射到 5 个可枚举的等级，并给出针对性描述。

## 在线访问

开启 GitHub Pages 后访问：

```
https://<your-github-username>.github.io/<repo-name>/
```

## 等级（可枚举）

| 分数区间 | 等级标题   | 一句话画像               |
| -------- | ---------- | ------------------------ |
| 0 – 20   | 投机赌徒   | 更像在赌场，而不是在投资 |
| 21 – 40  | 投资小白   | 意识到要学，但没有体系   |
| 41 – 60  | 理性新手   | 具备基本理性，开始形成判断 |
| 61 – 80  | 稳健投资者 | 在波动里也能睡得着觉     |
| 81 – 100 | 价值投资大师 | 纪律、耐心、独立判断     |

## 本地运行

任意静态文件服务均可，例如：

```bash
python3 -m http.server 8000
# 然后打开 http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新的公开仓库，假设叫 `investment-tester`
2. 把本地代码推上去：
   ```bash
   git remote add origin git@github.com:<your-github-username>/investment-tester.git
   git push -u origin main
   ```
3. 打开仓库 `Settings → Pages`，Source 选 `Deploy from a branch`，Branch 选 `main` / `/ (root)`，保存
4. 等 1-2 分钟，上面的 URL 就能访问

## 免责声明

本项目仅用于自测与自我反思，不构成任何投资建议。
