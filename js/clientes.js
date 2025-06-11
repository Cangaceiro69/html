document.addEventListener("DOMContentLoaded", function () {
  const rowsPerPage = 10;
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  let allRows = Array.from(tbody.querySelectorAll("tr"));
  let currentPage = 1;

  const paginationWrapper = document.createElement("nav");
  paginationWrapper.setAttribute("aria-label", "Navegação de página");

  const pagination = document.createElement("ul");
  pagination.className = "pagination mt-3";

  paginationWrapper.appendChild(pagination);
  table.parentElement.appendChild(paginationWrapper);

  function renderTable() {
    allRows = Array.from(tbody.querySelectorAll("tr"));
    const totalPages = Math.ceil(allRows.length / rowsPerPage);

    allRows.forEach((row, index) => {
      const start = (currentPage - 1) * rowsPerPage;
      const end = currentPage * rowsPerPage;
      row.style.display = index >= start && index < end ? "" : "none";
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";

    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    const prevBtn = document.createElement("button");
    prevBtn.className = "page-link btn btn-outline-secondary me-2";
    prevBtn.textContent = "Anterior";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    prevLi.appendChild(prevBtn);
    pagination.appendChild(prevLi);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "page-item";

      const button = document.createElement("button");
      button.textContent = i;
      button.className = `page-link btn btn-outline-primary${
        i === currentPage ? " active" : ""
      }`;
      button.style.marginRight = "0.5rem";
      button.addEventListener("click", () => {
        currentPage = i;
        renderTable();
      });

      li.appendChild(button);
      pagination.appendChild(li);
    }

    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    const nextBtn = document.createElement("button");
    nextBtn.className = "page-link btn btn-outline-secondary";
    nextBtn.textContent = "Próxima";
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
    nextLi.appendChild(nextBtn);
    pagination.appendChild(nextLi);
  }

  const observer = new MutationObserver(() => {
    const newTotalPages = Math.ceil(
      tbody.querySelectorAll("tr").length / rowsPerPage
    );
    if (currentPage > newTotalPages) currentPage = newTotalPages;
    renderTable();
  });

  observer.observe(tbody, { childList: true });

  renderTable();
});
