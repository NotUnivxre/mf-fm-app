import './globals.css'; // <-- INI WAJIB ADA (sesuaikan kalau namamu globals.css pakai 's')
import Sidebar from '../components/Sidebar';
import BottomPlayer from '../components/BottomPlayer';

export const metadata = {
  title: 'mf.ify - Apple Music Clone',
  description: 'A local music streaming app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gradient-to-b from-[#2a2a2d] to-[#000000] overflow-y-auto pb-28">
          {children}
        </main>
        <BottomPlayer />
      </body>
    </html>
  );
}