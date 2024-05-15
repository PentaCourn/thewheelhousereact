import React from 'react';
import Header from '../components/header';

import Footer from '../components/footer';
import Result from '../components/resultComponent';

function ResultPage() {
    return (
        <div>
            <Header />
            <div className='body'>
                <Result />
            </div>
            
            <Footer />
        </div>
    );
}

export default ResultPage;