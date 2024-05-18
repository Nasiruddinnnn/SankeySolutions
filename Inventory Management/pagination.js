import { data } from './dummydata.js';

document.addEventListener("DOMContentLoaded", function () {
    const rowsPerPage = 6;
    let currentPage = 1;

    const tableBody = document.querySelector("#product-table tbody");
    const pagination = document.getElementById("pagination");

    function renderTable(page) {
        tableBody.innerHTML = "";

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(item => {
            const row = document.createElement("tr");

            for (const key in item) {
                const cell = document.createElement("td");
                cell.textContent = item[key];
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        });

        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = "";

        const totalPages = Math.ceil(data.length / rowsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-button");

            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderTable(currentPage);
            });

            pagination.appendChild(pageButton);
        }
    }

    // Initial render
    renderTable(currentPage);
});
