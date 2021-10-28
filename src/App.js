import { useState } from 'react';
import './App.css';
import Input from './Components/Input/Input';
import Select from './Components/Select/Select';
import SubmitButton from './Components/SubmitButton/SubmitButton';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <header>
        <h2>Github user search</h2>
      </header>
      <form onSubmit={submitHandler}>
        <Select
          placeholderText="Search by"
          setSelectedOption={setSelectedOption}
          {...selectedOption}
        />
        <Input
          placeholderText={
            selectedOption ? 'Search by ' + selectedOption : 'Select a criteria'
          }
          setSearchText={setSearchText}
          {...searchText}
        />
        <SubmitButton />
      </form>
    </div>
  );
}

export default App;
