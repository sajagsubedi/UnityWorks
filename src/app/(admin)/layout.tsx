export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for unity works',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
