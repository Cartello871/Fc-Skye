document.addEventListener("DOMContentLoaded", function () {
    const playersList = document.getElementById("players-list");

    function renderPlayers() {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        playersList.innerHTML = "";
        players.forEach(player => {
            const playerCard = document.createElement("div");
            playerCard.classList.add("player-card");
            playerCard.innerHTML = `
                <img src="${player.photo}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>Позиция: ${player.position}</p>
                <p>Номер: ${player.number}</p>
                
            `;
            playersList.appendChild(playerCard);
        });
    }

    renderPlayers();

    // Автоматическое обновление списка игроков при изменении данных
    window.addEventListener("storage", renderPlayers);
});
