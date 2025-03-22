document.addEventListener("DOMContentLoaded", function () {
    const gamesList = document.getElementById("games-list");

    // Проверяем, есть ли сохраненные матчи
    const matches = JSON.parse(localStorage.getItem("matches")) || [];

    // Выводим их в таблицу
    matches.forEach(match => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${match.date}</td>
            <td>${match.opponent}</td>
            <td>${match.score}</td>
            <td>${match.status}</td>
        `;
        gamesList.appendChild(row);
    });
});
