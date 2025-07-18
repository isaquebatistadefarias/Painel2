 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/README.md
index 0000000000000000000000000000000000000000..3a236128c6350c76933d18f5bf2559cc56ce30b2 100644
--- a//dev/null
+++ b/README.md
@@ -0,0 +1,42 @@
+# Painel de Licitações
+
+Este repositório contém um painel simples para publicação e gerenciamento de licitações da prefeitura de Mirassol d'Oeste. Todo o front‑end é estático e as informações são persistidas em um banco de dados [Supabase](https://supabase.com/).
+
+## Objetivo do projeto
+
+- Divulgar licitações em andamento de forma acessível.
+- Permitir o cadastro de modalidades, fases, secretarias, pregoeiros e equipes de apoio.
+- Possibilitar que uma equipe administrativa atualize os dados por meio de uma tela protegida por login.
+
+## Servindo os arquivos
+
+Não há dependências de build. Basta servir os arquivos HTML estáticos. Exemplos:
+
+```bash
+# usando Python
+python3 -m http.server 8080
+
+# usando Node.js (requer o pacote serve)
+npx serve .
+```
+
+A página principal será acessível em `http://localhost:8080/index.html` (ou a porta definida). O painel administrativo está em `admin.html`.
+
+## Configuração do Supabase
+
+Para que o painel funcione é necessário possuir um projeto Supabase com as seguintes tabelas:
+
+- `modalidades`
+- `pregoeiros`
+- `secretarias`
+- `fases`
+- `equipes`
+- `licitacoes`
+
+Altere nos arquivos HTML as constantes `supabaseUrl` e `supabaseKey` apontando para seu projeto. Os exemplos de chaves presentes neste repositório são apenas de demonstração e devem ser substituídos em ambiente de produção.
+
+Após configurar o Supabase, o sistema de login (em `login.html`) e as operações de CRUD nas páginas de cadastro passarão a utilizar seu banco de dados.
+
+## Licença
+
+Este projeto foi disponibilizado de forma pública apenas para fins educacionais.
 
EOF
)
