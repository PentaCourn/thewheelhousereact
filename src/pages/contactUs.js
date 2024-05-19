import React from 'react';


import Header from '../components/header';
import Footer from '../components/footer';
import Contact from '../components/contact';

const ContactUs = () => {


    return (
        <div>
            <Header />
            <div className='body'>
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;