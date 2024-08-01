import React, { useEffect, useState } from 'react';
import NavbarComponent from './NavbarComponent';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

export default function HomeComponent() {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedData, setSelectedData] = useState({
    state: "",
    gender: "",
    country: ""
  });

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Function to fetch users from the API
  const fetchUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`);
      const data = await response.json();

      if (data.users.length === 0) {
        setHasMore(false);
      } else {
        // Remove duplicates before updating state
        setUsersData(prev => {
          const uniqueUsers = [...new Map([...prev, ...data.users].map(user => [user.id, user])).values()];
          return uniqueUsers;
        });
        setSkip(prev => prev + 10);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchUsers();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = [...usersData];

      if (selectedData.state) {
        filteredData = filteredData.filter(user => user.address?.state === selectedData.state);
      }
      if (selectedData.gender) {
        filteredData = filteredData.filter(user => user.gender === selectedData.gender);
      }
      if (selectedData.country) {
        filteredData = filteredData.filter(user => user.address?.country === selectedData.country);
      }

      setFilteredUsers(filteredData);
    };

    applyFilters();
  }, [usersData, selectedData]);

  useEffect(() => {
    const sortedData = [...filteredUsers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sortedData);
  }, [sortConfig]);

  const handleFilterChange = (filterData) => {
    setSelectedData(filterData);
  };

  const handleSortToggle = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  return (
    <div>
      <NavbarComponent />
      <FilterComponent usersData={usersData} onFilterChange={handleFilterChange} onSortToggle={handleSortToggle} />
      <TableComponent usersData={filteredUsers} sortConfig={sortConfig} onSort={handleSortToggle} />
      {loading && <div className='loaderContainer'><div className='loader'></div></div>}  
    </div>
  );
}
