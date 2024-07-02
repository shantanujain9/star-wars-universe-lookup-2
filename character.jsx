// src/components/Character.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Character.css';

const Character = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const apiUrl = "http://localhost:3000/api/characters";

  useEffect(() => {
    const fetchData = async (url, setFunc) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setFunc(json_response);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchData(`${apiUrl}/${id}`, setData);
    fetchData(`${apiUrl}/${id}/films`, setFilms);
    fetchData(`${apiUrl}/${id}/planets`, setPlanets);
  }, [id]);

  // Ensure data is fetched before rendering
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <section id="generalInfo">
        <p>Gender: {data.gender}</p>
        <p>Skin Color: {data.skin_color}</p>
        <p>Hair Color: {data.hair_color}</p>
        <p>Birth Year: {data.birth_year}</p>
        <p>Height: {data.height}</p>
        <p>Mass: {data.mass}</p>
      </section>
      <h2>Homeworld</h2>
      <section id="planetList">
        {planets.map((planet) => (
          <div key={planet.id}>
            <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
          </div>
        ))}
      </section>
      <h2>Films Appeared In</h2>
      <section id="filmsList">
        {films.map((film) => (
          <div key={film.id}>
            <Link to={`/films/${film.id}`}>{film.title}</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Character;
