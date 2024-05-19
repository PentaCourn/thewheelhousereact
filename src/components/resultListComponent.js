  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import '../css/resultList.css';
  import LazyLoad from 'react-lazyload';

  const ResultList = ({ trigger }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    const [cars, setCars] = useState(Array(5).fill({
      images: [],
      vin: null,
      currentImageIndex: 0,
      isLoading: true,
      modelEntity: null,
      price: null
    }));
    const carsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCars, setCurrentCars] = useState([]);
    const [sort, setSort] = useState('asc');
    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
      setCurrentPage(1);
      const searchData = JSON.parse(localStorage.getItem('searchParams'));
      const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
    setCurrentCars(currentCars);
      axios.post('http://localhost:8081/cars/search', searchData) 
        .then(response => {
          const newCars = response.data.map(car => ({
            images: car.images,
            transmission: car.transmissionEntity,
            fuelType: car.fuelTypeEntity,
            interior: car.interiorColorEntity,
            exterior: car.exteriorColorEntity,
            doors: car.numberOfDoors,
            mileage: car.mileage,
            year: car.yearOfProduction,
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
    }, [trigger]);
    useEffect(() => {
      const indexOfLastCar = currentPage * carsPerPage;
      const indexOfFirstCar = indexOfLastCar - carsPerPage;
      const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
      setCurrentCars(currentCars);
    }, [cars, currentPage]);

        
    const nextImage = (index) => {
      setCars(cars => cars.map((car, i) => {
        if (i === index) {
          return {...car, currentImageIndex: (car.currentImageIndex + 1) % car.images.length};
        }
        return car;
      }));
    };
    
    const prevImage = (index) => {
      setCars(cars => cars.map((car, i) => {
        if (i === index) {
          return {...car, currentImageIndex: (car.currentImageIndex - 1 + car.images.length) % car.images.length};
        }
        return car;
      }));
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    
      if (cars.length === 0) {
          return null; 
      }

      return (
        <div className='parent-container'>
        {currentCars.map((car, index) => {
          const indexOfFirstCarOnPage = (currentPage - 1) * carsPerPage;
          const carIndexInCarsArray = indexOfFirstCarOnPage + index;
          if (car && car.transmission) {
              return (
                  <div className="wrap-res" key={index}>
                  <div className='img-res'>
                      <LazyLoad height={200} once>{/* LazyLoad is used to load images only when they are visible */}
                          <img className="image-res" src={car.images[car.currentImageIndex]} alt={`Image ${car.currentImageIndex + 1}`} />
                      </LazyLoad>
                      <div className="controls-res">

                      <button className="prevButton-res" onClick={() => prevImage(carIndexInCarsArray)}>&lt;</button>
                      <button className="nextButton-res" onClick={() => nextImage(carIndexInCarsArray)}>&gt;</button>
                      </div>
                  </div>
                  <div className='car-details-div'>
                      <a href={`http://localhost:3000/${car.vin}`} onClick={e => e.stopPropagation()}>
                      {car.modelEntity && 
                      <p className="car-details-res">{car.modelEntity.brandEntity.brandName} {car.modelEntity.modelName}</p>}
                      <p className='details-text'>
                          Transmission: {car.transmission.transmission}<br />
                          Fuel Type: {car.fuelType.fuelType}<br />
                          Interior Color: {car.interior.color}<br />
                          Exterior Color: {car.exterior.color}<br />
                          Number of Doors: {car.doors}<br />
                          Mileage: {car.mileage}<br />
                          Year: {car.year}
                          </p>
                      <p className='car-pricing-res'>Price: ${car.price}</p>
                      </a>
                  </div>
                  </div>
              );
              } else {
              return <div className="wrap-empty-res" key={index}></div>; // empty slot
              }
          })}
          <div className='pagination-container'>
            <p>Page {currentPage} of {Math.ceil(cars.length / carsPerPage)}<br /><br /><br /><br /></p>
            
          {[...Array(Math.ceil(cars.length / carsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)}
            style={currentPage === number + 1 ? { textDecoration: 'underline' } : {}}>
              {number + 1}
            </button>

          ))}
        </div>
        <div className='sort-div'>
        <button
            onClick={() => {
              setSort('asc');
              setCars(cars => [...cars].sort((a, b) => a.price - b.price));
            }}
          >Sort By Price Ascending</button>
          <button
            onClick={() => {
              setSort('desc');
              setCars(cars => [...cars].sort((a, b) => b.price - a.price));
            }}
          >Sort By Price Descending</button>
                  </div>
                  </div>
                );
          };

  export default ResultList;