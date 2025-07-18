import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
  const [Search, setSearch] = useState('')
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/foodData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
     
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

                <div className="carousel-inner " id="carousel">
                    <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={Search} onChange= {(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn text-white bg-success " type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" className="d-block w-100  " style={{   height: "650px",    objectFit: "cover", filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" className="d-block w-100 " style={{  height: "650px",  objectFit: "cover",  filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" className="d-block w-100 " style={{   height: "650px",  objectFit: "cover", filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

      <div className='container'>
        {
          FoodCat.length > 0 ? FoodCat.map((data) => (
            <div key={data._id} className='fs-3 m-3'>
              {data.CategoryName}
              <hr />
              <div className='row'>
                {
                  FoodItem
                    .filter(item => item.CategoryName === data.CategoryName  && (item.name.toLowerCase().includes(Search.toLowerCase())))
                    .map(filterItem => (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3  md-4'>
                        <Card
                        FoodItem={filterItem}
                         
                          options={filterItem.options[0]}
                          
                        />
                      </div>
                    ))
                }
              </div>
            </div>
          )) : <div>Loading...</div>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Home;
