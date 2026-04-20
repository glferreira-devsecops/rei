# 🍕 Rei da Pizza RJ — Motor de Vendas PWA (Marketing de Guerrilha)

> **"Original nunca se desoriginalizará. Vendo barato porque posso, meu pai é o dono e eu sou sócio."**
> — Marcelo, Rei da Pizza, Madureira/RJ

---

## 🎯 O Que É Isso

Não é "um site de pizzaria". É um **sistema de conversão de vendas Mobile-First** operando como PWA (Progressive Web App) com checkout integrado ao WhatsApp Business, disfarçado de cardápio digital.

**Operação Dupla (Cavalo de Tróia B2B):**
- **Superfície:** Landing page de conversão para pedidos de pizza família a R$ 15
- **Subsuperfície:** Funil de prospecção B2B da **RET Tecnologia** (Engenharia de Software & Cibersegurança), ativado por gatilho contextual no rodapé

## 🏗️ Arquitetura

```
Tipo:        Static PWA (Zero Backend)
Rendering:   Client-Side Only
CDN:         Vercel Edge Network (Global)
Cache:       Service Worker (Workbox) + Vercel Headers
Checkout:    WhatsApp Business API (Deep Link)
CEP:         ViaCEP (REST, AbortController)
Segurança:   Military-Grade Hardened (CSP, HSTS, Anti-Debug)
```

### Stack Técnica
| Camada | Tecnologia |
|---|---|
| Markup | HTML5 Semântico (WCAG AAA) |
| Estilo | Vanilla CSS (Fluid Typography, Custom Properties) |
| Lógica | Vanilla JS (ES2020+, Zero Frameworks) |
| Vídeo | lite-youtube-embed (Lazy, Facade Pattern) |
| Fonte | Inter (Google Fonts, `font-display: swap`) |
| PWA | Workbox 6.5 (NetworkFirst para lógica, CacheFirst para assets) |
| Deploy | Vercel (Static, vercel.json com Security Headers) |

## 🔐 Modelo de Segurança (Diretriz OMEGA)

Este sistema foi auditado sob metodologia de **Pentest Paranoico**. Cada vulnerabilidade teórica foi mitigada:

| Vetor | Mitigação |
|---|---|
| XSS / Injeção | CSP Level 3 (meta + Vercel headers), Sanitização de inputs |
| Clickjacking | `X-Frame-Options: DENY` + Framebuster JS |
| Prototype Pollution | `Object.freeze()` nos protótipos core, `Object.create(null)` no carrinho |
| Reverse Tabnabbing | `rel="noopener noreferrer"` em todos os `target="_blank"` |
| Race Conditions | `AbortController` no ViaCEP, Debounce atômico no checkout |
| DOM Clobbering | Strict Element Hooking via `getElementById` |
| Scraping / Rip | Anti-Debug (`debugger` bomb), Console silenciado, `user-select: none` |
| Endpoint Exposure | Número WhatsApp ofuscado via `atob()` (Base64 runtime) |
| MIME Sniffing | `X-Content-Type-Options: nosniff` |
| Mixed Content | `upgrade-insecure-requests` + `block-all-mixed-content` |
| HSTS Bypass | `max-age=63072000; includeSubDomains; preload` |

## 📱 Responsividade (Mobile-First Extremo)

- **Fluid Typography:** `clamp()` em todas as escalas tipográficas (sem breakpoints rígidos)
- **Thumb Zone Architecture:** CTA fixado na zona de alcance do polegar com `safe-area-inset`
- **Viewport Edge Cases:**
  - `< 370px` (iPhone SE, Galaxy Z Fold Cover) — Layout em coluna
  - Landscape `< 400px height` — Thumb Zone reduzida, vídeo comprimido
  - iPhone Notch/Dynamic Island — `env(safe-area-inset-*)` no container
  - iOS Safari Bottom Bar — `100dvh` fallback
- **Touch Targets:** Todos os botões interativos ≥ 44×44px (WCAG 2.5.5 AAA)
- **Hover States:** Isolados em `@media (hover: hover)` — zero Sticky Hover no Mobile
- **Pull-to-Refresh:** Bloqueado via `overscroll-behavior-y: none`

## 🚀 Deploy (Vercel)

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Repositório no GitHub (este)

### Passos
```bash
# 1. Push para o GitHub
git init
git add .
git commit -m "🍕 Rei da Pizza — Sistema de Vendas v1.0"
git branch -M main
git remote add origin https://github.com/SEU_USER/reidapizzarj-guerrilha.git
git push -u origin main

# 2. Conectar na Vercel
# → vercel.com → New Project → Import Git Repository
# → Framework Preset: "Other" (Static)
# → Build Command: (deixar vazio)
# → Output Directory: "./" (raiz)
# → Deploy 🚀
```

### O `vercel.json` já configura:
- ✅ Security Headers (HSTS, CSP, X-Frame-Options DENY)
- ✅ Cache granular (assets = immutable, JS/SW = must-revalidate)
- ✅ Service Worker scope (`Service-Worker-Allowed: /`)
- ✅ CleanURLs (sem `.html` na barra)
- ✅ Página 404 personalizada (`404.html`)

### CI/CD (GitHub Actions)
O pipeline `.github/workflows/ci-cd.yml` roda automaticamente em cada `push` e `pull_request`:

| Stage | O que faz |
|---|---|
| 🔍 **Lint & Validate** | Valida HTML (W3C), JSON (manifest/vercel), detecta código morto, verifica hierarquia de headings, busca telefones expostos |
| 🔐 **Security Audit** | Caça inline onclick/onload (vetores XSS), links `target=_blank` sem `rel`, verifica CSP e HSTS nos headers, detecta arquivos sensíveis |
| ⚡ **Performance Budget** | Limita HTML < 25KB, CSS < 30KB, JS < 50KB, Imagens < 500KB. Qualquer overflow trava o CI/CD |

**Nota sobre Deploy:**
A Vercel faz o deploy **automaticamente** assim que você faz push no GitHub (Vercel GitHub Integration). O pipeline CI/CD existe exclusivamente para **auditoria antes do push final** ou para bloquear PRs (Pull Requests) mal formatados.

## 📊 Lógica de Negócio (Edge Cases Reais)

| Cenário | Comportamento |
|---|---|
| Horário Fechado (02h–17h59) | Alerta educado + permite enviar (garante fila) |
| Entrega sem Endereço | Bloqueia envio com alerta tátil |
| Dinheiro sem Troco informado | Alerta na mensagem: "Confirmar trocado!" |
| Cartão + Entrega | Alerta: "Confirmar Crédito/Débito/VR pra Maquininha" |
| Dinheiro + Entrega | Alerta: "Motoboy levar troco na mochila" |
| Retirada + Pix | Instrução: "Preparo inicia após comprovante" |
| Retirada + Dinheiro/Cartão | Instrução: "Preparo inicia quando chegar no balcão" |
| Entrega + Pix | Instrução: "Pizza inicia após comprovante Pix" |
| Combo + Upsell Refri | Mensagem diferencia: "Refri Extra (Obs: Combo já tem 1)" |
| > 15 itens no carrinho | Bloqueio com alerta (Anti-Spam/Anti-Bot) |
| Carrinho vazio | Thumb Zone escondida, checkout shake animation |
| Trocar Entrega → Retirada | Campos de endereço limpos automaticamente |
| Trocar Dinheiro → Pix/Cartão | Campo de troco limpo automaticamente |
| iOS Private Browsing | `localStorage` protegido com try/catch |
| Sem conexão (offline) | Alerta antes de tentar enviar |
| Click fora do modal | Fecha o Bottom Sheet / B2B overlay |

## 📁 Estrutura

```
├── index.html                    # Documento único (Landing Page)
├── 404.html                      # Página de erro personalizada
├── css/styles.css                # Design System (Neurodesign V99)
├── js/app.js                     # Motor de Vendas + Segurança OMEGA
├── sw.js                         # Service Worker (Workbox 6.5)
├── manifest.json                 # PWA Manifest (scope, icons)
├── vercel.json                   # Deploy config + Security Headers
├── robots.txt                    # Controle de crawlers + anti-scraper
├── .gitignore                    # Exclusões (logs, binários, .env, llms.txt)
├── .github/workflows/ci-cd.yml  # Pipeline CI/CD (4 stages)
├── favicon-*.png                 # Favicons multi-resolução
├── icon-*.png                    # PWA Icons (192, 512)
├── icon.svg                      # Favicon vetorial
└── apple-touch-icon.png          # iOS Home Screen Icon
```

## ⚖️ Licença

Proprietário. **RET Tecnologia** — Engenharia de Software & Cibersegurança Ofensiva.

---

*Blindado por DarkForge-X V99. Zero vulnerabilidades toleradas.*
