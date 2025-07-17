
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
