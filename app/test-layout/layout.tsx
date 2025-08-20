export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body style={{margin: 0, padding: 20, fontFamily: 'Arial, sans-serif'}}>
        {children}
      </body>
    </html>
  )
}