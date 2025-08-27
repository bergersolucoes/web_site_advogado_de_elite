// JS bem leve para filtro por classe (sem libs)
const grid = document.querySelector(".catalog-grid");
if (grid) {
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      grid.querySelectorAll(".card").forEach(card => {
        card.style.display = (f === "*" || card.classList.contains(f.slice(1))) ? "" : "none";
      });
      
      // Update active button
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("bg-accent", "text-accent-foreground"));
      btn.classList.add("bg-accent", "text-accent-foreground");
    });
  });
}