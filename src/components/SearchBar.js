import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [places, setPlaces] = useState("");
  const [searchPlace, setSearchPlace] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "http://cdn-api.co-vin.in/api/v2/admin/location/states"
        )
        const data = await response.json();
        setStates(data.states);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStates();
  }, []);

  function handleSearch(event) {
    const place = (event.target.value);
    setPlaces(places);

    const filterPlaces = states.filter((item) =>
      item.state_name.toLowerCase().includes(places.toLowerCase())
    );
    setSearchPlace(filterPlaces);
  }
  function handleSelectPlace(place) {
    setPlaces(place.state_name);
    setSearchPlace([]);
  }
  return (
    <div className={styles.SearchBar}>
      <FaSearch className={styles.icon} />

      <input
        className={styles.field}
        placeholder="search or type here......"
        value={places}
        onChange={handleSearch}
      />
      <div className={styles.Result}>
        <ol>
          {searchPlace.map((result) => (
            <li key={result.state_id} onClick={() => handleSelectPlace(result)}>
              {result.state_name}
            </li>
          ))}
        </ol>
      </div>
      <MdKeyboardVoice className={styles.icon} />
    </div>
  );
}
