import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokeinfo = ({ data }) => {
  const [encounters, setEncounters] = useState([]);

  useEffect(() => {
    const fetchEncounters = async () => {
      try {
        if (data && data.location_area_encounters) {
          const res = await axios.get(data.location_area_encounters);
          setEncounters(res.data);
        }
      } catch (error) {
        console.error("Error fetching encounters:", error);
      }
    };

    fetchEncounters();
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="abilities">
            {data.abilities.map((poke) => (
              <div className="group" key={poke.ability.name}>
                <h2>{poke.ability.name}</h2>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((poke) => (
              <h3 key={poke.stat.name}>
                {poke.stat.name}:{poke.base_stat}
              </h3>
            ))}
          </div>
          <div className="locations">
            <h3>Locaciones:</h3>
            <ul>
              {encounters.slice(0, 3).map((location, index) => (
                <h4 key={index}>{location.location_area.name}</h4>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Pokeinfo;
