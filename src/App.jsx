// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css"; // For basic styling

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const [filterQuery, setFilterQuery] = useState("");

  // Fetch data using async/await
  const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setItems(data);
      setFilteredItems(data); // Initially, the filtered list is the same as items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Sort items based on title
  const handleSort = (order) => {
    setSortType(order);
    const sorted = [...filteredItems].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredItems(sorted);
  };

  // Filter items based on user input
  const handleFilter = (query) => {
    setFilterQuery(query);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="App">
      <h1>Items List</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Filter by name"
          value={filterQuery}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button onClick={() => handleSort("asc")}>Sort Ascending</button>
        <button onClick={() => handleSort("desc")}>Sort Descending</button>
      </div>

      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <strong>Name: {item.name}</strong>
            <p>UserName: {item.username}</p>
            <p>Email: {item.email}</p>
            <p>Phone: {item.phone}</p>
            <p>Website: {item.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
