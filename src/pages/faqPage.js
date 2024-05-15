import React from 'react';


import Header from '../components/header';
import Footer from '../components/footer';
import FAQComponent from '../components/faq';

const FAQ = () => {


    return (
        <div>
            <Header />
            <div className='body'>
                <FAQComponent />
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;