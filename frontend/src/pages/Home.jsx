import React from 'react'
import Header from '../components/header/Header';
import SpecialityMenu from '../components/SpecialityMenu';

const Home = () => {
  return (
     <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Main content will go here */}
        <div className="text-center text-gray-500 mt-8">
          <p>Scroll down to explore our services</p>
        </div>
      </main>
      <div>
        <SpecialityMenu />
      </div>
    </div>
    
  )
}

export default Home