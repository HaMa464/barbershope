import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import DashboardPage from './components/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'booking' | 'dashboard'>('booking');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {currentPage === 'booking' ? <BookingPage /> : <DashboardPage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
