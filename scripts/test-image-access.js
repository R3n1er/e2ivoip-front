const http = require('http');
const fs = require('fs');
const path = require('path');

// Créer un serveur HTTP simple pour tester l'accès à l'image
const server = http.createServer((req, res) => {
  if (req.url === '/man-oniphone-business-min.jpg') {
    const imagePath = path.join(__dirname, '..', 'public', 'man-oniphone-business-min.jpg');
    
    if (fs.existsSync(imagePath)) {
      const stat = fs.statSync(imagePath);
      
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size,
        'Cache-Control': 'public, max-age=31536000',
      });
      
      const readStream = fs.createReadStream(imagePath);
      readStream.pipe(res);
      
      console.log('✅ Image servie avec succès');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image non trouvée');
      console.log('❌ Image non trouvée');
    }
  } else if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Image Background</title>
        <style>
          .hero-section {
            width: 100vw;
            height: 100vh;
            background-image: url('/man-oniphone-business-min.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right, rgba(220, 38, 38, 0.85), rgba(30, 58, 138, 0.85));
          }
          .content {
            position: relative;
            z-index: 10;
            text-align: center;
          }
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div class="hero-section">
          <div class="overlay"></div>
          <div class="content">
            <h1>Test Image Background</h1>
            <p>Si vous voyez cette page avec l'image en arrière-plan, l'image fonctionne !</p>
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page non trouvée');
  }
});

const PORT = 3002;
const HOST = '127.0.0.1';
server.listen(PORT, HOST, () => {
  console.log(`🚀 Serveur de test démarré sur http://localhost:${PORT}`);
  console.log(`📸 Test de l'image: http://localhost:${PORT}/test`);
  console.log(`🖼️  Image directe: http://localhost:${PORT}/man-oniphone-business-min.jpg`);
  console.log('');
  console.log('Appuyez sur Ctrl+C pour arrêter le serveur');
});

// Arrêt propre du serveur
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté');
    process.exit(0);
  });
});