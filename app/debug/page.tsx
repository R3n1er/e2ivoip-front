export default function DebugPage() {
  return (
    <html>
      <head>
        <title>Test Debug E2I VoIP</title>
        <style>{`
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: white;
          }
          .test-box {
            background: #dc2626;
            color: white;
            padding: 20px;
            margin: 10px 0;
            border-radius: 8px;
          }
        `}</style>
      </head>
      <body>
        <h1>E2I VoIP - Test de Debug</h1>
        <p>Cette page utilise du HTML/CSS pur sans Next.js complexités.</p>
        <div className="test-box">
          Si vous voyez cette boîte rouge, le problème ne vient pas du navigateur.
        </div>
        <div style={{background: '#1e40af', color: 'white', padding: '20px', margin: '10px 0', borderRadius: '8px'}}>
          Boîte bleue avec style inline
        </div>
      </body>
    </html>
  )
}