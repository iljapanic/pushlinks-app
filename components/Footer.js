export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="container mx-auto pb-8 pt-20">
      <div className="flex items-center justify-center text-secondary">
        <p className="text-sm">Pushlinks — {currentYear}</p>
      </div>
    </footer>
  )
}
