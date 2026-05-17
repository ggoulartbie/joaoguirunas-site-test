---
title: "Análise: Integração MCP Vimeo"
type: research
agent: sites-analyst
created: 2026-05-17
tags: [research, vimeo, mcp, mentoria-claude-code]
---

# Análise: Integração MCP Vimeo

**Decisão que informa:** Integrar MCP do Vimeo para acelerar o preenchimento de `lessons.video_id` (MC-1.3) e gestão futura de vídeos via Claude Code.
**Solicitado por:** team-lead (João)

---

## Estado atual

### MCPs configurados no projeto

- `.claude/settings.json` — só tem `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Nenhum MCP do Vimeo.
- `~/.claude/settings.json` — só hooks de notificação (curl para localhost:3001). Nenhum MCP.

**Conclusão:** zero MCPs externos ativos. Nenhum servidor Vimeo configurado.

### Como o Vimeo é usado hoje no código

| Arquivo | Papel |
|---|---|
| `src/components/student/VideoPlayer.tsx` | Player client-side via `@vimeo/player` SDK. Aceita `videoId` (numérico) + `provider`. Instancia `new Player(el, { id: numericId, responsive: false })`. |
| `src/lib/video/vimeo.ts` | `VimeoAdapter` server-side. Usa `VIMEO_ACCESS_TOKEN` para chamar `https://api.vimeo.com/videos/{id}` e retornar metadados (título, duração, thumbnail). |
| `src/lib/video/interface.ts` | Tipos `VideoProvider`, `VideoAdapter`, `VideoMetadata`. |
| `package.json` | `@vimeo/player ^2.30.4` (dep) + `@types/vimeo__player ^2.18.3` (devDep). Nenhuma lib de API server-side do Vimeo. |

**O que falta:** o projeto já tem `VIMEO_ACCESS_TOKEN` como variável esperada (`vimeo.ts:9`), mas nunca chama a API para listar vídeos ou mapear títulos para IDs. O fluxo atual exige que João insira os `video_id`s manualmente.

---

## MCPs disponíveis

### 1. MCP oficial Vimeo

- **Documentação:** [developer.vimeo.com/api/mcp-server](https://developer.vimeo.com/api/mcp-server)
- **Status:** Existe página oficial, mas o conteúdo está esparso/incompleto na documentação pública (página retornou minimal ao fetch).

### 2. `galacoder/vimeo-mcp` (open-source, mais completo)

- **Repo:** [github.com/galacoder/vimeo-mcp](https://github.com/galacoder/vimeo-mcp)
- **Instalação:** `npm install @mcp/vimeo` ou clone + build
- **Auth:** `VIMEO_ACCESS_TOKEN` com scopes `private, edit, upload, stats`

**Ferramentas expostas:**

| Tool | O que faz |
|---|---|
| `vimeo_list_videos` | Lista vídeos da conta com filtros e paginação |
| `vimeo_get_video_details` | Metadados + stats de um vídeo específico por ID |
| `vimeo_update_video` | Altera título, descrição, tags, privacy settings |
| `vimeo_download_transcript` | Baixa legendas/transcrições (WebVTT ou SRT) |
| `vimeo_upload_transcript` | Adiciona transcrição a um vídeo |
| `vimeo_get_video_stats` | Play counts e métricas |

**Notavelmente ausente:** upload de vídeo nesta implementação. O ag2-mcp-servers tem upload mas é auto-gerado e menos confiável.

### 3. `vimeo-mcp-lite` (token-efficient)

- **Fonte:** [lobehub.com/mcp/justmy2satoshis-vimeo-mcp-lite](https://lobehub.com/mcp/justmy2satoshis-vimeo-mcp-lite)
- Retorna ~100 bytes por vídeo (redução 180x). Bom para listar grandes bibliotecas sem estourar contexto.

### 4. Integrações via plataforma (Zapier/Pipedream)

- [Zapier Vimeo MCP](https://zapier.com/mcp/vimeo) / [Pipedream](https://mcp.pipedream.com/app/vimeo) — gerenciados, sem configuração local. Mais lentos e com overhead de plataforma.

---

## Casos de uso para este projeto

### Prioridade 1 — Resolver MC-1.3 (blocker imediato)

**Uso:** `vimeo_list_videos` para buscar todos os vídeos da conta e retornar `{id, title}`. Com isso, Claude Code pode cruzar os títulos dos vídeos com os `lesson.title` do banco e gerar o SQL de update automaticamente.

**Resultado:** João não precisa copiar IDs manualmente — só confirma o mapeamento sugerido.

**Requisito extra:** `VIMEO_ACCESS_TOKEN` já está previsto em `vimeo.ts`. João precisa confirmar que tem token com scope `private`.

### Prioridade 2 — Verificar privacy/domain whitelist (AC2 do MC-1.3)

**Uso:** `vimeo_get_video_details` + `vimeo_update_video` para verificar e corrigir privacy settings e domain whitelist de cada vídeo em lote.

Hoje isso exige que João acesse o painel Vimeo vídeo-por-vídeo. Com MCP, agente faz em script.

### Prioridade 3 — Metadados de duração para o banco

`VimeoAdapter.getVideoMetadata` já existe mas só é chamado on-demand. Com MCP, pode-se fazer batch para popular `lessons.duration_seconds` em massa após MC-1.3.

### Fora de escopo agora

- Upload de vídeo via MCP — João faz upload pelo UI Vimeo manualmente (OUT do MC-1.3).
- Transcrições automáticas — não há campo no schema atual para isso.

---

## Recomendação

Instalar `galacoder/vimeo-mcp` localmente e configurar no `claude_desktop_config.json` (não no projeto — é ferramenta do desenvolvedor, não da aplicação). Usar `vimeo_list_videos` para gerar automaticamente o mapeamento `lesson_slug → vimeo_id` e resolver MC-1.3 sem entrada manual de IDs.

**Configuração mínima:**
```json
{
  "mcpServers": {
    "vimeo": {
      "command": "node",
      "args": ["/path/to/vimeo-mcp/dist/index.js"],
      "env": { "VIMEO_ACCESS_TOKEN": "<token com scopes private,edit,stats>" }
    }
  }
}
```
Arquivo: `~/Library/Application Support/Claude/claude_desktop_config.json`

O `VIMEO_ACCESS_TOKEN` já está mapeado no `VimeoAdapter` do projeto — o mesmo token serve para ambos.

---

## Próximos passos

O que João precisa fornecer/decidir:

1. **Token Vimeo** com scopes `private, edit, upload, stats` (criar em [vimeo.com/settings/apps](https://vimeo.com/settings/apps)).
2. **Confirmar convenção de nomes:** os títulos dos vídeos no Vimeo seguem algum padrão que permita mapeamento automático para `lesson.slug`? (ex: "CT-1 Intro", "CT-2 Setup"...). Se não, João precisa confirmar o mapeamento manualmente uma vez.
3. **Decidir onde configurar o MCP:** Claude Desktop global (`claude_desktop_config.json`) é o caminho recomendado — não afeta o codebase do projeto.

---

## Fontes

- [galacoder/vimeo-mcp — GitHub](https://github.com/galacoder/vimeo-mcp)
- [Vimeo MCP Server — developer.vimeo.com](https://developer.vimeo.com/api/mcp-server)
- [vimeo-mcp-lite — LobeHub](https://lobehub.com/mcp/justmy2satoshis-vimeo-mcp-lite)
- [Vimeo MCP — MCPMarket](https://mcpmarket.com/server/vimeo)
- [Vimeo MCP — Zapier](https://zapier.com/mcp/vimeo)
