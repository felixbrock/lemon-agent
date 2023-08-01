<div align="center">
  <h1>🖥️ Lemon AI Server</h1>
  <br />
    <a href="https://github.com/felixbrock/lemonai">
    <img alt="Run Notebook in LangChain Docs" src="https://img.shields.io/badge/Jump to the 🍋 main repo-x?style=for-the-badge&logoColor=white&label&labelColor=gray&color=gray">
  </a>
  <br />
    <a href="https://discord.gg/bsgzjEpw">
<img alt="Discord" src="https://img.shields.io/badge/Join Discord-x?style=flat&logo=discord&logoColor=white&label&labelColor=gray&color=5865F2">
  </a>
  <a href="https://twitter.com/getlemonai">
    <img alt="Twitter" src="https://img.shields.io/badge/Tweet at us-x?style=flat&logo=twitter&logoColor=white&label&labelColor=gray&color=1DA1F2">
  </a>
  <br />
  <br />
</div>

**This is the technical readme to self-host the Lemon AI server. If you are looking for more information on the project itself please feel free to checkout our [🍋 main repo](https://github.com/felixbrock/lemonai).**

## ⚡️ Getting Started

Per default Lemon AI works with a hosted server version. If you want to self-host the Lemon AI server instead please use the following guideline:

### 1. Prerequisites

Requires Node.js 18.x and above.

### 2. Installing

Install all necessary node modules:

```bash
npm install
```

### 3. Run the Server

On Mac/Linux:

```bash
npm start
```

On Windows:

```bash
npm run start-win
```

The terminal should indicate that the server is running:

```bash
App running under pid XXXXX and listening on port: 1313 in production mode
```

### 4. Provide Server Domain to Lemon AI Client

To communicate with a self-hosted instance rather than Lemon AI's hosted one, you need to provide the server domain to the Lemon [AI Python client](https://github.com/felixbrock/lemonai). For this you need to provide the the optional `api_domain` argument when calling the `execute_workflow` function with Lemon AI:

```Python
...
execute_workflow(
    llm=model,
    prompt_string=prompt,
    api_domain='http://localhost:1313'
)
...
```

## 🦸 Contributing

Great to see you here! We are extremely open to contributions! You can find more information in our [CONTRIBUTING.md](https://github.com/felixbrock/lemonai-server/blob/main/.github/CONTRIBUTING.md). If you have any more questions feel free to drop us a message on <a href="https://discord.gg/bsgzjEpw">Discord</a>. We are really grateful for any kind of support, and therefore, acknowledge contributions in our [🍋 main repo](https://github.com/felixbrock/lemonai/blob/main/README.md#%EF%B8%8F-contributors)
