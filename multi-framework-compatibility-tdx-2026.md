# Salesforce Multi-Framework (React) - Compatibilidade (TDX 2026)

Status: Beta/Preview (Safe Harbor).
Documentacao introdutoria sobre compatibilidade do runtime Salesforce Multi-Framework com React: conceito, quando usar, requisitos tecnicos, disponibilidade por org e como testar.

## O que e

Salesforce Multi-Framework e uma capacidade da plataforma para executar apps React como `UIBundle`, com integracao a autenticacao e dados Salesforce.

Diferente de abordagens antigas com iframe/Visualforce, o bundle passa a ser tratado como metadata da plataforma (em `force-app/main/default/uiBundles`), com fluxo de desenvolvimento local moderno (Vite/Node).

## Quando usar

Use quando voce precisa:

- construir experiencias mais ricas/interativas com ecossistema React;
- reaproveitar padroes e libs modernas de front-end;
- acelerar prototipos com fluxo local (`npm run dev`) e build (`npm run build`);
- manter integracao com backend/dados Salesforce sem sair do modelo de metadata.

Para componentes nativos e cenarios simples de CRM, LWC continua sendo uma opcao muito forte.

## Problema que ele resolve

Antes, trazer React para Salesforce geralmente envolvia mais friccao de hospedagem/integracao.
Com o modelo de `UIBundle`, o ciclo fica mais direto:

- padrao moderno de build e desenvolvimento;
- estrutura de projeto mais previsivel;
- deploy via CLI no mesmo fluxo de metadata;
- melhor caminho para apps mais complexas que exigem ecossistema React.

## Status e disponibilidade

- Status atual: Beta/Preview (Safe Harbor).
- Disponibilidade real depende de enablement por org.
- Nao basta criar uma org de teste: a org precisa ter o recurso beta liberado.

### Requisito critico de org

Para deploy de `UIBundle`, a org precisa ter habilitado:

- Agentforce Vibe for MultiFramework (feature gate);
- org preference de Multi-Framework.

Quando isso nao esta habilitado, o deploy falha com erro informando que a `UIBundle Metadata API is not enabled`.

## Compatibilidade tecnica minima

- Salesforce CLI atualizado (preferir binario mais novo instalado localmente);
- Node.js 22+ (recomendado para os templates atuais);
- dependencias do bundle instaladas dentro de `uiBundles/<bundle>`;
- build de producao gerado (`dist`) antes do deploy.

## Como funciona (fluxo pratico)

1. Gerar projeto com template React:

```bash
sf project generate --template reactinternalapp --name my-react-mf
```

2. Entrar no bundle e instalar dependencias:

```bash
cd my-react-mf/force-app/main/default/uiBundles/myreactmf
npm install
```

3. Rodar local:

```bash
npm run dev
```

4. Gerar build:

```bash
npm run build
```

5. Deploy para org com beta habilitado:

```bash
sf project deploy start --source-dir force-app/main/default/uiBundles/myreactmf --target-org <alias>
```

## O que ja esta disponivel vs o que depende de org

### Ja testavel localmente

- scaffold do projeto React;
- execucao local (`npm run dev`);
- build de producao (`npm run build`);
- evolucao do app sem depender de org habilitada.

### Depende de org com enablement

- deploy do metadata `UIBundle`;
- validacao end-to-end na plataforma Salesforce;
- qualquer teste em runtime nativo dentro da org.

## Limitacoes e cuidados

- Sandbox so existe para quem tem org de producao (plano pago).
- Org gratuita (Developer Edition) pode nao ter o beta de Multi-Framework habilitado.
- Datas de GA/roadmap podem mudar; trate como Safe Harbor ate anuncio oficial.

## Checklist rapido de validacao

- [ ] `node -v` retorna 22+.
- [ ] CLI `sf` atualizada e correta no PATH.
- [ ] `npm run dev` sobe sem erro.
- [ ] `npm run build` gera `dist`.
- [ ] Org alvo autenticada no CLI.
- [ ] Setup da org mostra o enablement de Multi-Framework beta.
- [ ] Deploy de `UIBundle` executa sem erro de feature gate.

