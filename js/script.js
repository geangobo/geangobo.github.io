document.getElementById('send-btn').addEventListener('click', sendQuestion);
document.getElementById('user-question').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendQuestion();
});

function sendQuestion() {
  const question = document.getElementById('user-question').value.trim();
  const responseDiv = document.getElementById('response');
  if (!question) return;

  responseDiv.textContent = "Pensando...";

  // Aqui você fará a requisição para o backend FastAPI
  // Exemplo de fetch (ajuste a URL depois):
  fetch('http://localhost:8000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
    .then(res => res.json())
    .then(data => {
      responseDiv.textContent = data.answer || "Não foi possível obter resposta.";
    })
    .catch(() => {
      responseDiv.textContent = "Erro ao conectar ao servidor.";
    });
}