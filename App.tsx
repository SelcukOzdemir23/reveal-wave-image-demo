
import React from 'react';
import LandingPage from './components/landing-page';
import Header from './components/header';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen selection:bg-white selection:text-black">
      <Header />
      <main className="flex-grow">
        <LandingPage />
      </main>
    </div>
  );
};

export default App;
