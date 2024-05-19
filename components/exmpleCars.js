import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/exampleCars.css';
import LazyLoad from 'react-lazyload';

const ExampleCars = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [cars, setCars] = useState(Array(6).fill({
        images: [],
        vin: null,
        currentImageIndex: 0,
        isLoading: true,
        modelEntity: null,
        price: null
      }));
      
      useEffect(() => {
        
        axios.get('http://localhost:8081/cars/example')
          .then(response => {
            
            const newCars = response.data.slice(0, 6).map(car => ({
              images: car.images,
              vin: car.VIN,
              currentImageIndex: 0,
              isLoading: false,
              modelEntity: car.modelEntity,
              price: car.price
            }));
            setCars(newCars);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching cars:', error);
          });
      }, []);

      
      const nextImage = (index) => {
        setCars(cars => cars.map((car, i) => i === index ? {...car, currentImageIndex: (car.currentImageIndex + 1) % car.images.length} : car));
      };
      
      const prevImage = (index) => {
        setCars(cars => cars.map((car, i) => i === index ? {...car, currentImageIndex: (car.currentImageIndex - 1 + car.images.length) % car.images.length} : car));
      };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
    if (cars.length === 0) {
        return null; 
    }

    return (
        <div className="grid">
        {Array(6).fill(null).map((_, index) => {
            const car = cars[index];
            if (car) {
            return (
                <div className="wrap" key={index}>
                <div className='img'>
                    <LazyLoad height={200} once>{/* LazyLoad is used to load images only when they are visible */}
                        <img className="image" src={car.images[car.currentImageIndex]} alt={`Image ${car.currentImageIndex + 1}`} />
                    </LazyLoad>
                    <div className="controls">

                    <button className="prevButton" onClick={() => prevImage(index)}>&lt;</button>
                    <button className="nextButton" onClick={() => nextImage(index)}>&gt;</button>
                    </div>
                </div>
                <div>
                    <a  onClick={() => {
                        navigate(`/${car.vin}`);
                    
                    }}>
                    {car.modelEntity && <p className="car-details">{car.modelEntity.brandEntity.brandName} {car.modelEntity.modelName}</p>}
                    <p className='car-pricing'>Price: ${car.price}</p>
                    </a>
                </div>
                </div>
            );
            } else {
            return <div className="wrap-empty" key={index}></div>; // empty slot
            }
        })}
        </div>
      );
}
export default ExampleCars;