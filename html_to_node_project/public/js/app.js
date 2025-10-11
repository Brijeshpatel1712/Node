document.getElementById('f').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg').value;
  const res = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg })
  });
  const data = await res.json();
  alert('Server says: ' + JSON.stringify(data));
});
