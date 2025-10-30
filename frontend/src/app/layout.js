import './globals.css';
import { Kode_Mono, Orbitron, Merienda } from 'next/font/google'; // Import all three custom fonts

// Define the fonts, making them available throughout the application via CSS variables
const kodeMono = Kode_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kode-mono', // Use this variable in your CSS (e.g., font-family: var(--font-kode-mono))
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron', // Use this variable in your CSS
  display: 'swap',
});

const merienda = Merienda({ // Added the Merienda font
  subsets: ['latin'],
  weight: ['300', '900'],
  variable: '--font-merienda', // New font variable
  display: 'swap',
});


// STEP 1: METADATA (from index.html)
// Next.js handles <title> and <meta> tags using this export
export const metadata = {
  title: 'TARS Website',
  description: 'TARS Website - A futuristic UI for showcasing your team and projects.',
};

// STEP 2: ROOT LAYOUT (replaces index.html and main.jsx structure)
export default function RootLayout({ children }) {
  // Apply font variables to the <html> tag so they are globally available.
  return (
    <html
      lang="en"
      className={`${kodeMono.variable} ${orbitron.variable} ${merienda.variable} font-sans`} // Included Merienda variable
    >
      <head>
        {/* Next.js manages most meta tags, but we explicitly add the theme color */}
        <meta name="theme-color" content="#1E0E43" />
      </head>
      {/* STEP 3: APPLY GLOBAL STYLES (from App.jsx and index.html body) */}
      <body className="bg-black text-white bg-custom-dark-gradient-tars">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
