<p align="center">
  <a href="https://castclips.com">
    <img align="center" height="70px" src="https://i.imgur.com/hrNYRxO.png" />
  </a>
</p>

<p align="center">
  Easily create and share podcast clips<br />
  Made with TypeScript + React
</p>

<p align="center">
  <a href="https://castclips.com">
    <img align="center" height="300px" src="https://i.imgur.com/K2P314R.png" style="border-radius: 8px" />
  </a>
</p>

## Tech stack

- React
- Redux
- TypeScript
- ZEIT Now (deployment)
- Firebase (authentication, database)
- [ListenNotes](https://www.listennotes.com/) (podcast directory API)
- Appbase.io (hosted ElasticSearch for searching clips)

## Local development

Install dependencies:

```
yarn
```

Run client locally, using non-production API and authentication:

```
yarn start
```

### Code fomatting

Code formatting is done by prettier. Install your IDE's prettier extension, or run the following commands to check and automatically fix formatting:

```
yarn prettier:check
yarn prettier:fix
```

### Linting

```
yarn lint
```
