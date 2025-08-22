import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Helper/Helper';   

export default function BusinessListing() {
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const business = searchParams.get("q");
 
  const [businessCategory, setBusinessCategory] = useState([]);

  useEffect(() => {
    // API Calling
    axios
      .get(
        `${BASE_URL}/api/cities?populate=*&filters[businesses][business_name][$containsi]=${business}&filters[name][$containsi]=${city}`
      )
      .then(function (response) {
        console.log("API Response:", response?.data?.data);
        setBusinessCategory(response?.data?.data || []);
      })
      .catch(function (error) {
        console.log("API Error:", error);
      });
  }, [city, business]); 

  return (
    <>
      <div>BusinessListing</div>
      <p><b>City:</b> {city}</p>
      <p><b>Search Query:</b> {business}</p>

      <ul className="list-group">
        {businessCategory.length > 0 ? (
          businessCategory.map((cityItem) => (
            cityItem?.attributes?.businesses?.data?.map((biz) => (
              <li key={biz.id} className="list-group-item">
                {biz?.attributes?.business_name}
              </li>
            ))
          ))
        ) : (
          <li className="list-group-item">No Results Found</li>
        )}
      </ul>
    </>
  );
}
