import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import '../css/displayCar.css';

function DisplayCarComponent() {
    const [car, setCar] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        //взимам VIN от URL
        let vin = window.location.pathname.split('/')[1];
        let url = 'http://localhost:8081/cars/' + vin;
        axios.get(url) 
            .then(response => {
            const car = response.data;
            console.log(response.data);
            const newCar = {
                images: car.images,
                transmission: car.transmissionEntity,
                fuelType: car.fuelTypeEntity,
                interior: car.interiorColorEntity,
                exterior: car.exteriorColorEntity,
                description: car.description,
                doors: car.numberOfDoors,
                mileage: car.mileage,
                year: car.yearOfProduction,
                vin: car.VIN,
                currentImageIndex: 0,
                phone: car.phone,
                isLoading: false,
                modelEntity: car.modelEntity,
                features: car.features,
                price: car.price
            };
            setCar(newCar);
            setIsLoading(false);
            })
            .catch(error => {
            console.error('Error fetching cars:', error);
            });
    }, []); 

    const nextImage = () => {
        setCar(car => ({...car, currentImageIndex: (car.currentImageIndex + 1) % car.images.length}));
      };
      
      const prevImage = () => {
        setCar(car => ({...car, currentImageIndex: (car.currentImageIndex - 1 + car.images.length) % car.images.length}));
      };

    return (
        <div>
  <div className='parent'>
  {isModalOpen && (
    <div className="modal">
    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
    <div className="modal-content">
      <img src={car.images[car.currentImageIndex]} alt={`Image ${car.currentImageIndex + 1}`} />
      <div className="modal-controls-display">
        <button className="modal-prevButton" onClick={(e) => {prevImage(); e.stopPropagation();}}>&lt;</button>
        <button className="modal-nextButton" onClick={(e) => {nextImage(); e.stopPropagation();}}>&gt;</button>
      </div>
    </div>
  </div>
    )}
    {car && car.transmission ? (
      <div className="wrap-display">
        <div className='img-display' onClick={() => {console.log('Image clicked'); setIsModalOpen(true);}}>
        <LazyLoad height={200} once>
            <img className="image-display" src={car.images[car.currentImageIndex]} alt={`Image ${car.currentImageIndex + 1}`} />
        </LazyLoad>
        <div className="controls-display">
            <button className="prevButton-display" onClick={(e) => {prevImage(0); e.stopPropagation();}}>&lt;</button>
            <button className="nextButton-display" onClick={(e) => {nextImage(0); e.stopPropagation();}}>&gt;</button>
        </div>
        </div>
        <div className='div-details'>
          <div className='div-car-details'>
              {car.modelEntity && 
              <h1>{car.modelEntity.brandEntity.brandName} {car.modelEntity.modelName}</h1>}
              <div className='phone-div'>
                <h1 className='phone-black'>Contact Seller:</h1>
                <h1 className='phone-blue'>{car.phone}</h1>
              </div>
              </div>
              <div className='div-car-details'>
              <p>
                  Brand: {car.modelEntity.brandEntity.brandName}<br />
                  Model: {car.modelEntity.modelName}<br />
                  VIN: {car.vin}<br />
                  Transmission: {car.transmission.transmission}<br />
                  Fuel Type: {car.fuelType.fuelType}<br />
                  Interior Color: {car.interior.color}<br />
                  Exterior Color: {car.exterior.color}<br />
                  Number of Doors: {car.doors}<br />
                  Mileage: {car.mileage}<br />
                  Year: {car.year}
              </p>
              <div className='price-div'>
                <h1 className='price'>${car.price}</h1>
              </div>
          </div>
        </div>
        <div className='more-info'>
                <p>{car.description}</p>
                <br />
                <br />
                {car.features && car.features.length > 0 && (
                  <div className="features-grid">
                    <ul>
                      {car.features.slice(0, 5).map((feature, index) => (
                        <li key={index}>&#10004; {feature}</li>
                      ))}
                    </ul>
                    <ul>
                      {car.features.slice(5, 10).map((feature, index) => (
                        <li key={index}>&#10004; {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
        </div>
      </div>
    ) : (
      <div className="wrap-empty-res"></div> // empty slot
    )}
  </div>
</div>
    );
}

export default DisplayCarComponent;