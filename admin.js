document.addEventListener("DOMContentLoaded", function () {
    // --- МАТЧИ ---
    const matchForm = document.getElementById("match-form");
    const matchList = document.getElementById("matches-list");

    let matches = JSON.parse(localStorage.getItem("matches")) || [];

    function renderMatches() {
        matchList.innerHTML = "";
        matches.forEach((match, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.date}</td>
                <td>${match.opponent}</td>
                <td>${match.score}</td>
                <td>${match.status}</td>
                <td><button class="delete-match" data-index="${index}">❌</button></td>
            `;
            matchList.appendChild(row);
        });

        document.querySelectorAll(".delete-match").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                matches.splice(index, 1);
                localStorage.setItem("matches", JSON.stringify(matches));
                renderMatches();
                updatePages();
            });
        });
    }

    matchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newMatch = {
            date: document.getElementById("match-date").value,
            opponent: document.getElementById("match-opponent").value,
            score: document.getElementById("match-score").value,
            status: document.getElementById("match-status").value
        };

        matches.push(newMatch);
        localStorage.setItem("matches", JSON.stringify(matches));
        renderMatches();
        updatePages();

        matchForm.reset();
    });

    // --- ИГРОКИ ---
    const playerForm = document.getElementById("player-form");
    const playersList = document.getElementById("players-list");

    let players = JSON.parse(localStorage.getItem("players")) || [];

    function renderPlayers() {
        playersList.innerHTML = "";
        players.forEach((player, index) => {
            const playerCard = document.createElement("div");
            playerCard.classList.add("player-card");
            playerCard.innerHTML = `
                <img src="${player.photo}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>Позиция: ${player.position}</p>
                <p>Номер: ${player.number}</p>
                <button class="delete-player" data-index="${index}">❌</button>
            `;
            playersList.appendChild(playerCard);
        });

        document.querySelectorAll(".delete-player").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                players.splice(index, 1);
                localStorage.setItem("players", JSON.stringify(players));
                renderPlayers();
                updatePages();
            });
        });
    }

    playerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newPlayer = {
            name: document.getElementById("player-name").value,
            position: document.getElementById("player-position").value,
            number: document.getElementById("player-number").value,
            photo: document.getElementById("player-photo").value
        };

        players.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(players));
        renderPlayers();
        updatePages();

        playerForm.reset();
    });

    // Функция для обновления всех страниц
    function updatePages() {
        localStorage.setItem("matches", JSON.stringify(matches));
        localStorage.setItem("players", JSON.stringify(players));
        window.dispatchEvent(new Event("storage"));
    }

    renderMatches();
    renderPlayers();
});
