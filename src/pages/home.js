import React from 'react';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import Footer from '../components/footer';
import ExampleCars from '../components/exmpleCars';

function Home() {
    return (
        <div>
            <Header />
            <div className='body'>
                <SearchComponent />
                <ExampleCars />
            </div>
            
            <Footer />
            {/* Add your content here */}
        </div>
    );
}

export default Home;