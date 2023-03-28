document.addEventListener('DOMContentLoaded', async function () {
  const map = L.map('map').setView([20, 0], 2);

  // OpenTopoMap harita stilini kullan
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
    maxZoom: 17
  }).addTo(map);

  // route.json dosyasını yükle
  const response = await fetch('route.json');
  const routes = await response.json();

  // Siber tehditlerin yoğunluğunu gösteren ısı haritası katmanını oluştur
  const heatLayer = L.heatLayer([], { radius: 20 }).addTo(map);

  // Çizgileri çiz ve animasyon başlat
  for (const route of routes) {
    const polyline = L.polyline(route.points, { color: route.color }).addTo(map);
    polyline.snakeIn();

    // Isı haritası veri noktalarını ekle
    heatLayer.addLatLng(route.points[0]);
    heatLayer.addLatLng(route.points[1]);
  }
});
