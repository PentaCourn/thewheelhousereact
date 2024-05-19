import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//npm install axios
import axios from 'axios';
import '../css/searchComponent.css';



const VerticalSearch = ({ triggerSetter }) => {
  const navigate = useNavigate();
 
  let searchData = JSON.parse(localStorage.getItem('searchParams')) || {
    brandName: null,
    priceMax: null,
    transmission: null,
    exteriorColor: null,
    modelName: null,
    mileageMax: null,
    fuelType: null,
    interiorColor: null,
    features: []
  };
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(searchData.brandName);
  const [selectedModel, setSelectedModel] = useState(searchData.modelName);
  const [selectedTransmission, setSelectedTransmission] = useState(searchData.transmission);
  const [selectedExteriorColor, setSelectedExteriorColor] = useState(searchData.exteriorColor);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(searchData.interiorColor);
  const [selectedFuelType, setSelectedFuelType] = useState(searchData.fuelType);
  const [selectedFeatures, setSelectedFeatures] = useState(searchData.features);
  const [selectedPriceMax, setSelectedPriceMax] = useState(searchData.priceMax);
  const [selectedMileageMax, setSelectedMileageMax] = useState(searchData.mileageMax);

  
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
    setIsLoading(true);
    if (selectedBrand) {
      axios.get(`http://localhost:8081/models/all/${selectedBrand}`)
        .then(response => {
          setModels(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching models:', error);
        });
    }


  }, []);

  if (isLoading) {
    return <div className='loading' >Loading...</div>
  }
 
  return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <table>
              <tbody>
                <tr>
                  <td className='label-column-vertical'>
                    <label >Brand:</label>
                  </td>
                  <td className='input-column-vertical'>
                    <select value={selectedBrand || ""} onChange={(event) => {
                      const selectedBrand = event.target.value;
                      setSelectedBrand(selectedBrand);
                      if (selectedBrand === "") {
                        setModels([]);
                        searchData.brandName = null;
                        searchData.modelName = null;
                        localStorage.setItem('searchParams', JSON.stringify(searchData));
                        triggerSetter(prevTrigger => prevTrigger + 1);
                        return;
                      }
                      axios.get(`http://localhost:8081/models/all/${selectedBrand}`)
                        .then(response => {
                          setModels(response.data);
                          searchData.brandName = selectedBrand;
                          searchData.modelName = null;
                          localStorage.setItem('searchParams', JSON.stringify(searchData));
                          triggerSetter(prevTrigger => prevTrigger + 1);
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
                  <td className='label-column-vertical'>
                    <label>Model:</label>
                  </td>
                  <td className='input-column-vertical'>
                    <select value={selectedModel || ""}  onChange={(e) => {
                      const selectedModel = e.target.value;
                      setSelectedModel(selectedModel);
                      if (selectedModel === "") searchData.modelName = null;
                      else searchData.modelName = selectedModel;
                      localStorage.setItem('searchParams', JSON.stringify(searchData));
                      triggerSetter(prevTrigger => prevTrigger + 1);
                    }}>
                      <option value="">Any...</option>
                      {models.map(model => (
                        <option key={model.id} value={model.modelName}>{model.modelName}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className='label-column-vertical'>
                    <label>Max price:</label>
                  </td>
                  <td className='input-column-vertical'>
                    <input 
                        type="number" 
                        min="0" 
                        step="1" 
                        placeholder="Any..." 
                        value={searchData.priceMax || ""}
                        onChange={(e) => {
                            setSelectedPriceMax(selectedPriceMax);
                          if (e.target.value < 0) e.target.value = 0;
                          if (e.target.value === "") searchData.priceMax = null;
                          else searchData.priceMax = e.target.value;
                          localStorage.setItem('searchParams', JSON.stringify(searchData));
                          triggerSetter(prevTrigger => prevTrigger + 1);
                        }}
                      />
                  </td>
                </tr>

                <tr>
                  <td className='label-column-vertical'>
                    <label>Max millage:</label>
                  </td>
                  <td className='input-column-vertical'>
                    <input 
                      type="number" 
                      min="0" 
                      step="1" 
                      value={searchData.mileageMax || ""}
                      placeholder="Any..." 
                      onChange={(e) => {
                        setSelectedMileageMax(selectedMileageMax);
                        if (e.target.value < 0) e.target.value = 0;
                        if (e.target.value === "") searchData.mileageMax = null;
                        else searchData.mileageMax = e.target.value;
                        localStorage.setItem('searchParams', JSON.stringify(searchData));
                        triggerSetter(prevTrigger => prevTrigger + 1);
                      }}
                    />
                  </td>
                </tr>
                  
                <tr>
                    <td className='label-column-vertical'>
                        <label>Transmission:</label>
                    </td>
                    <td className='input-column-vertical'>
                        <select value={selectedTransmission || ""} onChange={(e) => {
                            const newTransmission = e.target.value;
                            setSelectedTransmission(newTransmission);
                            if (newTransmission === "") searchData.transmission = null;
                            else searchData.transmission = newTransmission;
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                            triggerSetter(prevTrigger => prevTrigger + 1);
                        }}>
                        <option value="" >Any...</option>
                        {transmissions.map(transmission => (
                            <option key={transmission.id} value={transmission.transmission}>{transmission.transmission}</option>
                        ))}
                        </select>
                    </td>
                </tr>

                

                

                
                  
                <tr>
                    <td className='label-column-vertical'>
                        <label>Fuel type:</label>
                    </td>
                    <td className='input-column-vertical'>
                        <select value={selectedFuelType || ""} onChange={(e) => {
                            const newFuelType = e.target.value;
                            setSelectedFuelType(newFuelType);
                            if (newFuelType === "") searchData.fuelType = null;
                            else searchData.fuelType = newFuelType;
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                            triggerSetter(prevTrigger => prevTrigger + 1);
                        }}>
                        <option value="" >Any...</option>
                        {fuelTypes.map(fuelType => (
                            <option key={fuelType.id} value={fuelType.fuelType}>{fuelType.fuelType}</option>
                        ))}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td className='label-column-vertical'>
                        <label>Exterior Color:</label>
                    </td>
                    <td className='input-column-vertical'>
                        <select value={selectedExteriorColor || ""} onChange={(e) => {
                            const newColor = e.target.value;
                            setSelectedExteriorColor(newColor);
                            if (newColor === "") searchData.exteriorColor = null;
                            else searchData.exteriorColor = newColor;
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                            triggerSetter(prevTrigger => prevTrigger + 1);
                        }}>
                        <option value="" >Any...</option>
                        {exteriorColor.map(color => (
                            <option key={color.id} value={color.color}>{color.color}</option>
                        ))}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td className='label-column-vertical'>
                        <label>Interior Color:</label>
                    </td>
                    <td className='input-column-vertical'>
                        <select value={selectedInteriorColor || ""} onChange={(e) => {
                            const newColor = e.target.value;
                            setSelectedInteriorColor(newColor);
                            if (newColor === "") searchData.interiorColor = null;
                            else searchData.interiorColor = newColor;
                            localStorage.setItem('searchParams', JSON.stringify(searchData));
                            triggerSetter(prevTrigger => prevTrigger + 1);
                        }}>
                        <option value="" >Any...</option>
                        {interiorColor.map(color => (
                            <option key={color.id} value={color.color}>{color.color}</option>
                        ))}
                        </select>
                    </td>
                </tr>

                {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td colSpan={2}>
                                    <div className="checkbox-container-vertical ">
                                        {checkboxes[i] && (
                                            <>
                                                <input type="checkbox" id={`checkbox-${checkboxes[i].feature}`} 
                                                checked={searchData.features.includes(checkboxes[i].feature)}
                                                onChange={(e) => {
                                                    let updatedFeatures;
                                                    if (e.target.checked) {
                                                        updatedFeatures = [...searchData.features, checkboxes[i].feature];
                                                    } else {
                                                        updatedFeatures = searchData.features.filter(feature => feature !== checkboxes[i].feature);
                                                    }
                                                    const updatedSearchData = {...searchData, features: updatedFeatures};
                                                    setSelectedFeatures(updatedSearchData);  // Assuming setSearchData is the state setter for searchData
                                                    localStorage.setItem('searchParams', JSON.stringify(updatedSearchData));
                                                    triggerSetter(prevTrigger => prevTrigger + 1);
                                                }}/>
                                                <label htmlFor={`checkbox-${checkboxes[i].feature}`}>{checkboxes[i].feature}</label>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i + 5}>
                            <td colSpan={2}>
                            <div className="checkbox-container-vertical ">
                                {checkboxes[i + 5] && (
                                    <>
                                        <input type="checkbox" id={`${checkboxes[i + 5].feature}`} 
                                        checked={searchData.features.includes(checkboxes[i + 5].feature)}
                                        onChange={(e) => {
                                            let updatedFeatures;
                                            if (e.target.checked) {
                                                updatedFeatures = [...searchData.features, checkboxes[i + 5].feature];
                                            } else {
                                                updatedFeatures = searchData.features.filter(feature => feature !== checkboxes[i + 5].feature);
                                            }
                                            const updatedSearchData = {...searchData, features: updatedFeatures};
                                            setSelectedFeatures(updatedSearchData);  // Assuming setSearchData is the state setter for searchData
                                            localStorage.setItem('searchParams', JSON.stringify(updatedSearchData));
                                            triggerSetter(prevTrigger => prevTrigger + 1);
                                        }}/>
                                        <label htmlFor={`checkbox-${checkboxes[i + 5].feature}`}>{checkboxes[i + 5].feature}</label>
                                    </>
                                )}
                            </div>
                            </td>
                        </tr>
                ))}
              </tbody>
            </table>

              

          </div>


  );
};

export default VerticalSearch;
