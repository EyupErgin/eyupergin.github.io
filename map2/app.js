document.addEventListener('DOMContentLoaded', async function () {
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // route.json dosyasını yükle
    const response = await fetch('route.json');
    const routes = await response.json();
  
    // Çizgileri çiz ve animasyon başlat
    for (const route of routes) {
      const polyline = L.polyline(route.points, { color: route.color }).addTo(map);
      polyline.snakeIn();
    }
  });
  