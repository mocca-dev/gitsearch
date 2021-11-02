import { useQuery, gql } from '@apollo/client';
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
      <ExchangeRates />
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

const EXCHANGE_RATES = gql`
  query {
    repository(owner: "octocat", name: "Hello-World") {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
