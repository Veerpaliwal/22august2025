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
    try {
      axios
        .get(
          `${BASE_URL}/api/cities?populate=*&filters[businesses][business_name][$containsi]=${business}&filters[name][$containsi]=${city}`
        )
        .then(function (response) {
          // handle success
          console.log("API Response:", response?.data?.data);
          setBusinessCategory(response?.data?.data);
        })
        .catch(function (error) {
          // handle error
          console.log("API Error:", error);
        });
    } catch (error) {
      console.log("Try-Catch Error:", error);
    }
  }, [city, business]);

  return (
    <>
      <div>BusinessListing</div>
      <p>
        <b>City:</b> {city}
      </p>
      <p>
        <b>Search Query:</b> {business}
      </p>

      <ul className="list-group">
        {console.log(businessCategory)}

        {businessCategory.length > 0 &&
          businessCategory.map((cv, idx, arr) => {
            return (
              <li key={cv.id} className="list-group-item">
                An item
              </li>
            );
          })}
      </ul>
    </>
  );
}
