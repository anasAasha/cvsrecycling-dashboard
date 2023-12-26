
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import config from '../../config';
import LazyLoad from 'react-lazyload';


const Banner = () => {

  const [banners, setBanners] = useState([]);

  
  const [newBannerFile, setNewBannerFile] = useState(null);

  const [forceUpdate, setForceUpdate] = useState(false);
  const fetchBanners = () => {
    fetch(`${config.apiUrl}/banner/all`)
      .then(response => response.json())
      .then(data => {
     
        if (data.Bannar && Array.isArray(data.Bannar)) {
          setBanners(data.Bannar);
        } else {
          console.error('Invalid data structure:', data);
        }
      })
      .catch(error => console.error('Error fetching banners:', error));
  };
  const handlePicFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
  
      const formData = new FormData();
      formData.append("image", file);
  
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
  
      fetch(`${config.apiUrl}/image/add`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          if (result && result.image) {
            setNewBannerFile(result.image);
           
          } else {
            console.error('Invalid response structure:', result);
          }
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          setNewBannerFile(null);
        });
    } else {
      setNewBannerFile(null);
    }
  };
  

  const addBanner = () => {
   
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "image": newBannerFile
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch(`${config.apiUrl}/banner/add`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setForceUpdate((prev) => !prev);
      })
      .catch(error => console.log('error', error));
  };
  

  
  const deleteBanner = (bannerId) => {
    fetch(`${config.apiUrl}/banner/delete/${bannerId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
     
        fetchBanners();
        toast.success('Banner deleted successfully.');
      })
      .catch(error => {
       
        toast.error('Failed to delete banner.');
      });
  };


  useEffect(() => {
    fetchBanners();
  }, [forceUpdate]);

  return (
    <div className="tab-pane banner-edit pt-3">
     
      {banners.map(banner => (
        <Form.Group key={banner.id} className="row mb-3">
          <Form.Label className="col-md-4 col-lg-3">{banner.id}</Form.Label>
          <div className="col-md-8 col-lg-9">
          <LazyLoad height={200} offset={100}>
            <img src={banner.image} alt="banner" />
            </LazyLoad>
            <div className="pt-2">
              <Button
                
                title="Delete banner image"
                variant='danger'
                onClick={() => deleteBanner(banner.id)}
              >
                <FaTrash/>
              </Button>
            </div>
          </div>
        </Form.Group>
      ))}

      <Form.Group className="row mb-3">
        <Form.Label className="col-md-4 col-lg-3">Add Banner</Form.Label>
        <div className="col-md-8 col-lg-9">
          <Form.Control
            type="file"
            onChange={handlePicFileChange}
          />
          <Button  className="my-2" onClick={addBanner}>
            Add Banner
          </Button>
        </div>
      </Form.Group>

     
    </div>
  );
};

export default Banner;
