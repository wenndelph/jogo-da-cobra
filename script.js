const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const box = 20; // Tamanho de cada bloco
let snake = [{ x: 9 * box, y: 10 * box }]; // Cobra começa no meio
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};
let score = 0;

// Controle da cobra
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Função para desenhar no canvas
function drawGame() {
    // Fundo do jogo
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Desenhar a cobra
    for (let segment of snake) {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
    }

    // Posição inicial da cabeça
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Movimento da cobra
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    // Quando a cobra come a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop(); // Remove a cauda
    }

    // Nova cabeça
    let newHead = { x: snakeX, y: snakeY };

    // Fim de jogo (colisão com paredes ou com o corpo)
    if (
        snakeX < 0 || snakeY < 0 || 
        snakeX >= canvas.width || snakeY >= canvas.height ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(game);
        alert("Fim de jogo! Pontuação: " + score);
    }

    snake.unshift(newHead); // Adiciona a nova cabeça
}

// Atualizar o jogo a cada 100ms
let game = setInterval(drawGame, 100);

