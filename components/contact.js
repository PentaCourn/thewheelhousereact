import '../css/contactUs.css';
import hristo from '../Hristo.png';
import gosheto from '../Gosheto.png';
import boyan from '../Boqn.png';

const Contact = () => {
    const people = [
        {
            name: 'Христо Петков ',
            fn: 'ФН: 21621566',
            image: hristo,
            description: 'Phone: 0888888 Email: email@mail.com',
        },
        {
            name: 'Боян Петков ',
            fn: 'ФН: 21621542',
            image: boyan,
            description: 'Phone: 0889988 Email: email@mail.com',
        },
        {
            name: 'Георги Желязков  ',
            fn: 'ФН: 21621564',
            image: gosheto,
            description: 'Phone: 0888998 Email: email@mail.com',
        },
    ];

    return (
        <div className='contacts-div'>
            {people.map((person, index) => (
                <div className='contacts' key={index}>
                    <img src={person.image} alt={person.name} />
                    <div>
                        <h1>{person.name}</h1>
                        <h2>{person.fn}</h2>
                        <p>{person.description}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default Contact;