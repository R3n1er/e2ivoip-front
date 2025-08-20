export default function TestLayoutPage() {
  return (
    <div>
      <h1 style={{color: '#dc2626', fontSize: '2rem'}}>E2I VoIP - Test Layout Minimal</h1>
      <p>Cette page a son propre layout minimal sans aucune dépendance.</p>
      <div style={{
        background: '#1e40af', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        Boîte bleue avec styles inline
      </div>
    </div>
  )
}