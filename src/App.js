import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import './App.css';
import Input from './Components/Input/Input';
import Select from './Components/Select/Select';
import SubmitButton from './Components/SubmitButton/SubmitButton';
import UserList from './Components/UserList/UserList';

const SEARCH = gql`
  query SearchUsers($query: String!, $first: Int!) {
    search(query: $query, type: USER, first: $first) {
      edges {
        node {
          ... on User {
            login
            email
            name
          }
        }
      }
    }
  }
`;

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  const submitHandler = (e) => {
    e.preventDefault();
    search({
      variables: {
        query: searchText,
        first: 10,
        login: '',
      },
    });
  };

  return (
    <div className="App">
      <header>
        <h2>Github user search</h2>
      </header>
      <form onSubmit={submitHandler} className="search-form">
        <Select
          placeholderText="Search by"
          setSelectedOption={setSelectedOption}
          {...selectedOption}
        />
        <div className="search-container">
          <Input
            placeholderText={
              selectedOption
                ? 'Search by ' + selectedOption
                : 'Select a criteria'
            }
            setSearchText={setSearchText}
            {...searchText}
          />
          <SubmitButton />
        </div>
      </form>
      <UserList data={data} loading={loading} error={error} />
    </div>
  );
}

export default App;
