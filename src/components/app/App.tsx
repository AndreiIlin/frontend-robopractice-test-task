import React from 'react';
import DataProvider from '../../provider/DataProvider';
import Header from '../header/Header';
import SearchField from '../searchField/SearchField';
import NotWorkingHoursTable from '../table/NotWorkingHoursTable';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <DataProvider>
        <SearchField />
        <NotWorkingHoursTable />
      </DataProvider>
    </>
  );
};

export default App;
