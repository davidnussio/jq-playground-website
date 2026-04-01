# jq Playground — Website

Sito web promozionale e documentazione per l'estensione VS Code [jq Playground](https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground).

Costruito con [Next.js](https://nextjs.org) 16, [Tailwind CSS](https://tailwindcss.com) 4, e [shadcn/ui](https://ui.shadcn.com).

## Struttura

```
app/            → Layout e pagina principale (App Router)
components/     → Sezioni del sito (Hero, Features, Documentation, ecc.)
components/ui/  → Componenti shadcn/ui
styles/         → CSS globali
public/         → Asset statici (icone, placeholder)
```

## Sviluppo locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000).

## Build e deploy

```bash
# Build di produzione
npm run build

# Avvia il server di produzione
npm start
```

Il progetto è collegato a [v0](https://v0.app) e ogni merge su `main` viene deployato automaticamente.

## Requisiti

- Node.js 18+
- npm / yarn / pnpm

## Link utili

- [Estensione su VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground)
- [Repository GitHub dell'estensione](https://github.com/davidnussio/vscode-jq-playground)
- [Progetto v0](https://v0.app/chat/projects/prj_kA0L1uWtZFeceTf4uAw47ODtsPiK)

## Licenza

MIT
