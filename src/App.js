import { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import './App.css';
import Input from './Components/Input/Input';
import Select from './Components/Select/Select';
import SubmitButton from './Components/SubmitButton/SubmitButton';

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
    console.log(data, searchText);
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
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <ul>
          {data?.search.edges.map(
            (node, i) =>
              node.node.login && (
                <li key={node.node.login + i}>{node.node.login}</li>
              )
          )}
        </ul>
      ) : (
        <p>There is no data returned.</p>
      )}
    </div>
  );
}

export default App;
