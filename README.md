# Salesforce Multi-Framework (React) - Compatibilidade (TDX 2026)

Status: Beta/Preview (Safe Harbor).

Documentacao introdutoria sobre compatibilidade do runtime Salesforce Multi-Framework com React: conceito, quando usar, requisitos tecnicos, disponibilidade por org e como testar.

## O que e

Salesforce Multi-Framework e uma capacidade da plataforma para executar apps React como UIBundle, com integracao a autenticacao, seguranca e dados Salesforce.

Diferente de abordagens antigas com iframe/Visualforce, o bundle passa a ser tratado como metadata da plataforma (em `force-app/main/default/uiBundles`), com fluxo local moderno de desenvolvimento e build.

## Quando usar

Use quando voce precisa:

- construir experiencias mais ricas/interativas com ecossistema React
- reaproveitar padroes e bibliotecas modernas de front-end
- acelerar prototipos com fluxo local (`npm run dev`) e build (`npm run build`)
- manter integracao com backend/dados Salesforce sem sair do modelo de metadata

Para componentes nativos e cenarios simples de CRM, LWC continua sendo uma opcao muito forte.

## Problema que ele resolve

Antes, trazer React para Salesforce geralmente envolvia mais friccao de hospedagem e integracao. Com UIBundle, o ciclo fica mais direto:

- padrao moderno de build e desenvolvimento
- estrutura de projeto previsivel
- deploy via CLI no mesmo fluxo de metadata
- caminho mais natural para apps complexas no ecossistema React

## Status e disponibilidade

Status atual: Beta/Preview (Safe Harbor).

Importante:

- disponibilidade real depende de enablement por org
- React e o framework suportado hoje no beta
- suporte a outros frameworks foi anunciado como "coming soon" (roadmap, sem GA garantido)
- durante o beta, ha limitacoes de tipo de org e recursos disponiveis

## Frameworks: atual e futuros (base oficial)

Cenario atual:

- React: suportado no beta do Multi-Framework (documentacao e templates oficiais)

Roadmap mencionado publicamente (Safe Harbor):

- Angular: citado como framework futuro
- Vue: citado como framework futuro
- outros frameworks podem ser adicionados ao longo do tempo, sem data fixa garantida

Leitura recomendada dessa secao: trate Angular/Vue/outros como direcao de produto, nao como recurso pronto para producao hoje.

## Requisito critico de org

Para deploy de UIBundle, a org precisa ter habilitado:

- feature gate de Multi-Framework/React (beta enablement)
- preferencia de org relacionada ao recurso de React Development com Multi-Framework

Quando isso nao esta habilitado, o deploy falha com erro do tipo:

- `UIBundle Metadata API is not enabled`

## Compatibilidade tecnica minima

- Salesforce CLI atualizada (`sf`)
- Node.js 18+ (minimo oficial em guias beta) e preferencialmente 22+ para templates/tooling mais recentes
- dependencias instaladas dentro de `uiBundles/<bundle>`
- build de producao gerado (`dist`) antes do deploy

## Como funciona (fluxo pratico)

Gerar projeto com template React:

```bash
sf project generate --template reactinternalapp --name my-react-mf
```

Entrar no bundle e instalar dependencias:

```bash
cd my-react-mf/force-app/main/default/uiBundles/myreactmf
npm install
```

Rodar local:

```bash
npm run dev
```

Gerar build:

```bash
npm run build
```

Deploy para org com beta habilitado:

```bash
sf project deploy start --source-dir force-app/main/default/uiBundles/myreactmf --target-org <alias>
```

## O que ja esta disponivel vs o que depende de org

Ja testavel localmente:

- scaffold do projeto React
- execucao local (`npm run dev`)
- build de producao (`npm run build`)
- evolucao do app sem depender de org habilitada

Depende de org com enablement:

- deploy de metadata UIBundle
- validacao end-to-end no runtime Salesforce
- testes de integracao nativa dentro da org

## Limitacoes e cuidados

- beta tem limitacoes de disponibilidade por tipo de org
- Developer Edition/Trailhead Playground podem nao ter suporte no momento do beta
- orgs com idioma padrao diferente de ingles podem ter restricoes no beta
- datas de GA e roadmap podem mudar (Safe Harbor)

## Checklist rapido de validacao

- [ ] `node -v` retorna versao suportada (minimo 18+, ideal 22+)
- [ ] `sf --version` atualizado e correto no PATH
- [ ] `npm run dev` sobe sem erro
- [ ] `npm run build` gera `dist`
- [ ] org alvo autenticada no CLI
- [ ] Setup da org mostra enablement de Multi-Framework (beta)
- [ ] deploy de UIBundle executa sem erro de feature gate

## Referencias oficiais

- [Build a React App (Beta) - Salesforce Developers](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/reactdev-overview.html)
- [Configure Your Org for React App Development (Beta) - Salesforce Developers](https://developer.salesforce.com/docs/platform/code-builder/guide/reactdev-setup.html)
- [Build with React, Run on Salesforce: Introducing Salesforce Multi-Framework - Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/build-with-react-run-on-salesforce-introducing-salesforce-multi-framework)
- [trailheadapps/multiframework-recipes - GitHub](https://github.com/trailheadapps/multiframework-recipes)
