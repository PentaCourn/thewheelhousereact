import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//npm install axios
import axios from 'axios';
import '../css/searchComponent.css';



const SearchComponent = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let searchData = JSON.parse(localStorage.getItem('searchParams'));
  
  useEffect(() => {
    // Fetch data from Spring Boot backend
    axios.all([
      axios.get('http://localhost:8081/brands/'),
      axios.get('http://localhost:8081/features/'),
      axios.get('http://localhost:8081/transmissions/'),
      axios.get('http://localhost:8081/fuels/'),
      axios.get('http://localhost:8081/colors/')
    ]).then(axios.spread((brandsRes, featuresRes, transmissionsRes, fuelTypesRes, colorsRes) => {
      setBrands(brandsRes.data);
      setCheckboxes(featuresRes.data);
      setTransmissions(transmissionsRes.data);
      setFuelTypes(fuelTypesRes.data);
      setExteriorColor(colorsRes.data);
      setInteriorColor(colorsRes.data);
  
      // Set loading to false after data is fetched
      setIsLoading(false);
    })).catch(error => {
      console.error('Error fetching data:', error);
    });


    searchData = {
      brandName: null,
      modelName: null,
      priceMax: null,
      mileageMax: null,
      transmission: null,
      fuelType: null,
      exteriorColor: null,
      interiorColor: null,
      features: [],
    };

    localStorage.setItem('searchParams', JSON.stringify(searchData));


    localStorage.setItem('searchParams', JSON.stringify(searchData));


  }, []);

 
  return (
    <div className="wrapper">
      <div className="search-container">
        {isLoading ? (
        <div className='loading' >Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <table>
              <tbody>
                <tr>
                  <td className='label-column'>
                    <label >Brand:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(event) => {
                      const selectedBrand = event.target.value;
                      if (selectedBrand === "") {
                        setModels([]);
                        searchData.brandName = null;
                        return;
                      }
                      axios.get(`http://localhost:8081/models/all/${selectedBrand}`)
                        .then(response => {
                          setModels(response.data);
                          searchData.brandName = selectedBrand;
                          searchData.modelName = null;
                          localStorage.setItem('searchParams', JSON.stringify(searchData));
                        })
                        .catch(error => {
                          console.error('Error fetching models:', error);
                        });
                        
                    }}>
                      <option value="">Any...</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='label-column'>
                    <label>Max price:</label>
                  </td>
                  <td className='input-column'>
                    <input 
                        type="number" 
                        min="0" 
                        step="1" 
                        placeholder="Any..." 
                        onChange={(e) => {
                          if (e.target.value < 0) e.target.value = 0;
                          if (e.target.value === "") searchData.priceMax = null;
                          else searchData.priceMax = e.target.value;
                          localStorage.setItem('searchParams', JSON.stringify(searchData));
                        }}
                      />
                  </td>
                </tr>
                  
                <tr>
                  <td className='label-column'>
                    <label>Transmission:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(e) => {
                      if (e.target.value === "") searchData.transmission = null;
                      else searchData.transmission = e.target.value;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                    }}>
                      <option value="" >Any...</option>
                      {transmissions.map(transmission => (
                        <option key={transmission.id} value={transmission.transmission}>{transmission.transmission}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='label-column'>
                    <label>Exterior Color:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(e) => {
                      if (e.target.value === "") searchData.exteriorColor = null;
                      else searchData.exteriorColor = e.target.value;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                    }}>
                    <option value="" >Any...</option>
                      {exteriorColor.map(color => (
                        <option key={color.id} value={color.color}>{color.color}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2}>
                    <button type="submit" className='search' onClick={() => navigate('/search')}>Search</button>
                  </td>
                </tr>
              </tbody>
            </table>
            


            <table>
              <tbody>
                <tr>
                  <td className='label-column'>
                    <label>Model:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(e) => {
                      if (e.target.value === "") searchData.modelName = null;
                      else searchData.modelName = e.target.value;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                    }}>
                      <option value="">Any...</option>
                      {models.map(model => (
                        <option key={model.id} value={model.modelName}>{model.modelName}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='label-column'>
                    <label>Max millage:</label>
                  </td>
                  <td className='input-column'>
                    <input 
                      type="number" 
                      min="0" 
                      step="1" 
                      placeholder="Any..." 
                      onChange={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                        if (e.target.value === "") searchData.mileageMax = null;
                        else searchData.mileageMax = e.target.value;
                        localStorage.setItem('searchParams', JSON.stringify(searchData));
                      }}
                    />
                  </td>
                </tr>
                  
                <tr>
                  <td className='label-column'>
                    <label>Fuel type:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(e) => {
                      if (e.target.value === "") searchData.fuelType = null;
                      else searchData.fuelType = e.target.value;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                    }}>
                      <option value="" >Any...</option>
                      {fuelTypes.map(fuelType => (
                        <option key={fuelType.id} value={fuelType.fuelType}>{fuelType.fuelType}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='label-column'>
                    <label>Interior Color:</label>
                  </td>
                  <td className='input-column'>
                    <select defaultValue="" onChange={(e) => {
                      if (e.target.value === "") searchData.interiorColor = null;
                      else searchData.interiorColor = e.target.value;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                    }}>
                      <option value="" >Any...</option>
                      {interiorColor.map(color => (
                        <option key={color.id} value={color.color}>{color.color}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                  
                <tr>
                  <td colSpan={2} className='final-column'>
                    <p>Fields without a specific selection will display all</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="separator"></div>
            {/* Checkboxes */}
            <table>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                  <td>
                    <div className="checkbox-container">
                      {checkboxes[i] && (
                        <>
                          <input type="checkbox" id={`${checkboxes[i].feature}`}  onChange={(e) => {
                            if (e.target.checked) {
                              searchData.features.push(e.target.id);
                            } else {
                              const index = searchData.features.indexOf(e.target.id);
                              if (index > -1) {
                                searchData.features.splice(index, 1);
                              }
                            }
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                          }}/>
                          <label htmlFor={`checkbox-${checkboxes[i].feature}`}>{checkboxes[i].feature}</label>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="checkbox-container">
                      {checkboxes[i + 5] && (
                        <>
                          <input type="checkbox" id={`${checkboxes[i + 5].feature}`} onChange={(e) => {
                            if (e.target.checked) {
                              searchData.features.push(e.target.id);
                            } else {
                              const index = searchData.features.indexOf(e.target.id);
                              if (index > -1) {
                                searchData.features.splice(index, 1);
                              }
                            }
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                          }}/>
                          <label htmlFor={`checkbox-${checkboxes[i + 5].feature}`}>{checkboxes[i + 5].feature}</label>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                ))}
                <tr>
                  <td className='final-column' colSpan={2} >
                    <div>When nothing is selected it will not search for features</div>
                  </td>
                </tr>
              </tbody>
            </table>

              

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
