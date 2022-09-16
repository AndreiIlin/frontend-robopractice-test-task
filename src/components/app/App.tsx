import React from 'react';
import DataProvider from '../../provider/DataProvider';
import Header from '../header/Header';
import NotWorkingHoursTable from '../table/NotWorkingHoursTable';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <DataProvider>
        <NotWorkingHoursTable />
      </DataProvider>
    </>
  );
};

export default App;
