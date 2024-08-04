import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import logo from './logo.svg';
import './App.css';



import { MDBContainer } from 'mdb-react-ui-kit';
import { Table } from './components/Table';
import { FilterBar } from './components/FilterBar';
import { User } from './types/types';
import { useUserContext } from './context/UserContext';
import useFetch from './hooks/UseFetch';



function App() {
 
  return (
    <div className="App">
      <MDBContainer breakpoint="xl">
        <FilterBar /* onSearch={handleSearch}  */ />
        <Table />
      </MDBContainer>
    </div>
  );
}

export default App;
