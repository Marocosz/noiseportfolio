# 📂 Planejamento de Design & UX: NoisePortfolio

**Conceito Visual:** Dark / Noise / Cyberpunk Minimalista / Tech.
**Foco:** Python, IA, Backend & Fullstack.
**Tecnologias Base:** React + Vite, Framer Motion, CSS Modules.

---

## 1. Hero Section (✅ Já Implementado)
**O Cartão de Visitas.**
* **Visual:** Fundo com efeito `DarkVeil` (fluido, misterioso, distorcido).
* **Conteúdo:**
    * Título: "Marcos Rodrigues" (Estático ou animação sutil).
    * Subtítulo: `DecryptedText` ("Desenvolvedor - IA, Automação & FullStack").
* **Melhoria de UX:** Adicionar um indicador visual de "Scroll Down" (seta pulsante ou ícone de mouse) na parte inferior para encorajar a navegação.

---

## 2. Sobre Mim: "The Glitch Profile"
**Conexão Humano-Máquina.**
* **Layout:** Split Screen (Duas colunas).
* **Lado Esquerdo (Texto):**
    * Bio curta e impactante.
    * **Estilo:** Tipografia limpa sans-serif.
    * **Destaque:** Palavras-chave (Python, IA, Fullstack) em cor Neon (Roxo/Ciano) ou negrito brilhante.
    * **Animação:** Texto entra com *fade-in* escalonado (staggered) ao rolar a página.
* **Lado Direito (Visual):**
    * Foto de Perfil com efeito **GlitchImage**.
    * **Estado Normal:** Foto em escala de cinza (Grayscale) com alto contraste.
    * **Interação (Hover):** Ao passar o mouse, a foto sofre distorção digital (RGB shift) e ganha cores momentaneamente.

---

## 3. Projetos: "The Spotlight & The Archive"
**A Vitrine de Competência.**
Divisão hierárquica para focar nos "Big Wins" e ainda mostrar volume de trabalho.

### A. Destaques (Top 3 Projetos)
* **Projetos:** *Pauta-Certa, InTec-Access, DataChat-BI*.
* **Visual:** Carrossel estilo 3D (Coverflow) ou Cards Grandes em destaque.
* **Estilo do Card:** Glassmorphism (vidro fosco escuro) sobre o fundo noise.
* **Interação:**
    * Imagem do projeto grande.
    * Hover: A imagem escurece, sobe um overlay com ícones das tecnologias (FastAPI, React, Docker).
    * Botões "Call to Action" brilhantes: [Ver Código] e [Live Demo].

### B. O Arquivo (Lista de Outros Projetos)
* **Visual:** Tabela estilizada como um "File System" ou Logs de Terminal.
* **Colunas:** `Nome do Projeto` | `Tech Stack` | `Link`.
* **Estilo:** Fonte monoespaçada, linhas divisórias finas e quase transparentes.
* **UX:** Hover na linha ilumina o texto, dando sensação de seleção de arquivo.

---

## 4. Skills: "The Glowing Grid"
**O Arsenal Técnico.**
Nada de listas simples. Uma experiência visual de grade.

* **Layout:** Bento Grid (Grade de caixas de tamanhos variados, mas alinhadas).
* **Categorias:**
    1.  **Backend:** Python, FastAPI, Flask, SQL.
    2.  **AI/Data:** LangChain, LLMs, Pandas, RAG.
    3.  **DevOps:** Docker, VPS (Coolify), Linux (Zorin/Ubuntu).
    4.  **Frontend:** React, Nuxt.js.
* **Efeito Uau (Spotlight Effect):**
    * Os cards têm bordas cinza escuro quase invisíveis.
    * **Interação:** Um "brilho" (radial gradient) segue o cursor do mouse. Ele ilumina a borda do card onde o mouse está E levemente as bordas dos cards vizinhos.
    * Isso cria uma sensação de lanterna iluminando uma grade escura.

---

## 5. Jornada: "The Commit History"
**A História Profissional.**
Inspirada em árvores de commits do Git e fluxogramas de processos.

* **Estrutura:** Linha do tempo vertical centralizada.
* **Visual:** "Nós" (bolinhas) conectadas por uma linha.
* **Scroll Trigger (Gatilho de Rolagem):**
    * A linha começa cinza apagado.
    * Conforme o usuário desce (scroll), a linha "se preenche" de cor (Roxo Neon ou Verde Terminal) de cima para baixo.
    * Os cards de experiência (UFU, Estágio, Freelance) aparecem com suavidade nas laterais da linha.
* **Conteúdo:** Ano/Data de um lado, Título/Cargo do outro.

---

## 6. Contato: "Interactive Terminal (CLI)"
**O Grand Finale.**
Uma despedida interativa e memorável para recrutadores técnicos.

* **Visual:** Uma `<div>` estilizada como janela de terminal (Barra superior cinza com botões vermelhos/amarelos/verdes de janela).
* **Fundo:** Preto absoluto ou azul muito escuro.
* **Prompt:** `visitor@marocos-portfolio:~$` com cursor piscando.
* **UX Híbrida:**
    * **Para Techs:** Permite digitar comandos reais: `help`, `email`, `linkedin`, `github`, `clear`.
    * **Para Pressa/Mobile:** Botões visíveis ("Copiar Email", "Acessar LinkedIn") que, ao clicar, "digitam automaticamente" o comando no terminal e executam a ação.
* **Output:** O terminal "imprime" a resposta (o link ou o email) com efeito de digitação.