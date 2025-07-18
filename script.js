 function exportarExcel() {
   const tabela = document.querySelector("table");
   if (!tabela) return alert("Tabela não encontrada!");
 
   let wb = XLSX.utils.table_to_book(tabela, { sheet: "Licitacoes" });
   XLSX.writeFile(wb, "licitacoes.xlsx");
 }
 
 document.getElementById("btnAumentarFonte").addEventListener("click", () => {
   document.documentElement.classList.remove("diminuir");
   document.documentElement.classList.add("aumentar");
 });
 
 document.getElementById("btnDiminuirFonte").addEventListener("click", () => {
   document.documentElement.classList.remove("aumentar");
   document.documentElement.classList.add("diminuir");
 });
 
 document.getElementById("btnContraste").addEventListener("click", () => {
   document.body.classList.toggle("contraste");
 });
+
+// Supabase client setup
+const { createClient } = supabase;
+const supabaseUrl = "https://wrayfqfxrxizltezkjrr.supabase.co";
+const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYXlmcWZ4cnhpemx0ZXpranJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODA2ODksImV4cCI6MjA2ODM1NjY4OX0.OP6XzwZ840PVj_0Oah0sSOfalWk5SH7xBDcQPVtaT8s";
+const supabaseClient = createClient(supabaseUrl, supabaseKey);
+
+async function carregarLicitacoes() {
+  const { data, error } = await supabaseClient
+    .from("licitacoes")
+    .select(
+      `id, numero, objeto, abertura, 
+       modalidades:modalidade (nome),
+       secretarias:secretaria (nome),
+       pregoeiros:pregoeiro (nome),
+       equipes:equipe (nome),
+       fases:fase (nome)`
+    )
+    .order("abertura", { ascending: false });
+
+  if (error) {
+    console.error("Erro ao buscar licitacoes:", error);
+    return;
+  }
+
+  const tbody = document.getElementById("tabelaLicitacoes");
+  if (!tbody) return;
+  tbody.innerHTML = "";
+
+  const modSelect = document.getElementById("filtroModalidade");
+  const secSelect = document.getElementById("filtroSecretaria");
+  const faseSelect = document.getElementById("filtroFase");
+
+  const modalidades = new Set();
+  const secretarias = new Set();
+  const fases = new Set();
+
+  data.forEach(item => {
+    const tr = document.createElement("tr");
+    tr.innerHTML = `
+      <td>${item.numero || ""}</td>
+      <td>${item.objeto || ""}</td>
+      <td>${item.modalidades ? item.modalidades.nome : ""}</td>
+      <td>${item.secretarias ? item.secretarias.nome : ""}</td>
+      <td>${item.pregoeiros ? item.pregoeiros.nome : ""}</td>
+      <td>${item.equipes ? item.equipes.nome : ""}</td>
+      <td>${item.fases ? item.fases.nome : ""}</td>
+      <td>${item.abertura ? new Date(item.abertura).toLocaleDateString('pt-BR') : ""}</td>`;
+    tbody.appendChild(tr);
+
+    if (item.modalidades?.nome) modalidades.add(item.modalidades.nome);
+    if (item.secretarias?.nome) secretarias.add(item.secretarias.nome);
+    if (item.fases?.nome) fases.add(item.fases.nome);
+  });
+
+  function preencherSelect(select, valores) {
+    if (!select) return;
+    select.innerHTML = '<option value="">Todas</option>';
+    Array.from(valores).sort().forEach(v => {
+      const opt = document.createElement('option');
+      opt.value = v;
+      opt.textContent = v;
+      select.appendChild(opt);
+    });
+  }
+
+  preencherSelect(modSelect, modalidades);
+  preencherSelect(secSelect, secretarias);
+  preencherSelect(faseSelect, fases);
+}
+
+document.addEventListener("DOMContentLoaded", carregarLicitacoes);
 
EOF
)
