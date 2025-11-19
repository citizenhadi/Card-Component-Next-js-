import "./globals.css";
export const metadata = {
  title: "Card Component",
  description: "The card component is now ready for use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
