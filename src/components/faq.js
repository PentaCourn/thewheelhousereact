import React from 'react';
import '../css/faq.css';

const FAQComponent = () => {
    const faqData = [
        { question: 'How to sell my car?', 
        answer: 'Contact us and give use the information of the car with some images and we will add it.' },
        { question: 'How to contact us?', 
        answer: 'Use the "Contact Us" button there is the information of the team.' },
        { question: 'How to buy a car?', 
        answer: 'When you have chosen your car contact the seller.' },
        { question: 'How much do I have to pay to sell my car?',
        answer: 'When you sell your car you have to pay atleast 5% of the price of the car as a fee to us.' },
        { question: 'Is there a fee to buy a car?',
        answer: 'No, there is no fee to buy a car.' },
        { question: 'Is there a fee to add my car to the site?',
        answer: 'Only if the car is sold.' },
        { question: 'The car I want is not on the site, what can I do?',
        answer: 'Contact us and we will try to find the car for you.' },
        { question: 'How can I find the car I want?',
        answer: 'Use the search form and search for the car you want.' },
        { question: 'How can I see the car in person?',
        answer: 'Contact the seller and make an appointment.' },
        { question: 'There is no features of the car I want, what can I do?',
        answer: 'Contact us and we will add the features.' },

    ];

    return (
        <div className='faq-container'>
            {faqData.map((faq, index) => (
                <div className='faq-item' key={index}>
                    <div className='faq-question'>
                        <h3>Q: {faq.question}</h3>
                    </div>
                    <div className='faq-answer'>
                        <p>A: {faq.answer}</p>
                    </div>
                   
                    
                </div>
            ))}
        </div>
    );
};

export default FAQComponent;