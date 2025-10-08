import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [searchresult, setSearchresult] = useState("");
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    let search = e.target.search_field.value;
    navigate("/search/" + search, { replace: true });
  }
  const searchInput = "";
  const notFound = true;

  return (
    <aside className="sidebar">
      <div className="search card">
        <span className="title secondary-title">Search {searchInput !== '' && ": " + searchInput}</span>
        <div className="card-content">
          {(notFound == true && searchInput.length > 2) && (
            <span className="not-found">No coincidences</span>
          )}
          <form onSubmit={doSearch}>
            <input
              type="text"
              id="search_field"
              name="search_field"
              autoComplete="off"
            /* value={searchInput}
            onChange={searchItem} */
            />
            <input type="submit" value="Search" id="search" />
          </form>
        </div>
      </div>
    </aside >
  )
}
