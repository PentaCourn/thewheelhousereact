import React from 'react';
import Header from '../components/header';

import Footer from '../components/footer';
import DisplayCarComponent from '../components/displayCarComponent';

function CarDisplay() {
    return (
        <div>
            <Header />
            <div className='body'>
                <DisplayCarComponent />
            </div>
            
            <Footer />
            {/* Add your content here */}
        </div>
    );
}

export default CarDisplay;