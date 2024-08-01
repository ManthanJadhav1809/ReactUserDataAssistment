import React from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Component/Style/TableComponent.css';

export default function TableComponent({ usersData, sortConfig, onSort }) {
  const { key, direction } = sortConfig;

  // Function to sort data based on sortConfig
  const sortedData = React.useMemo(() => {
    let sortableItems = [...usersData];
    if (key) {
      sortableItems.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [usersData, key, direction]);

  return (
    <div className="tableContainer">
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => onSort('id')}>
                ID 
                <FontAwesomeIcon 
                  icon={faArrowUp} 
                  className='Arrowicon' 
                  color={direction === 'ascending' && key === 'id' ? 'red' : 'black'} 
                /> 
                <FontAwesomeIcon 
                  icon={faArrowDown} 
                  className='Arrowicon' 
                  color={direction === 'descending' && key === 'id' ? 'red' : 'black'} 
                />
              </th>
              <th>Image</th>
              <th onClick={() => onSort('firstName')}>
                Full Name 
                <FontAwesomeIcon 
                  icon={faArrowUp} 
                  className='Arrowicon' 
                  color={direction === 'ascending' && key === 'firstName' ? 'red' : 'black'} 
                /> 
                <FontAwesomeIcon 
                  icon={faArrowDown} 
                  className='Arrowicon' 
                  color={direction === 'descending' && key === 'firstName' ? 'red' : 'black'} 
                />
              </th>
              <th>Demography</th>
              <th>Designation</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id < 10 ? `0${user.id}` : user.id}</td>
                  <td><img className="userImage" src={user.image} alt="User" /></td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.gender === "male" ? "M" : "F"}/{user.age}</td>
                  <td>{user.company?.title || 'N/A'}</td>
                  <td>{user.address?.state || 'N/A'}, USA</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="noData">Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
