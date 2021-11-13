import React, { useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';

import Input from './../../Components/Input/Input';
import Select from './../../Components/Select/Select';
import SubmitButton from './../../Components/SubmitButton/SubmitButton';
import UserList from './../../Components/UserList/UserList';

const SEARCH = gql`
  query SearchUsers($query: String!, $first: Int!) {
    search(query: $query, type: USER, first: $first) {
      edges {
        node {
          ... on User {
            name
            avatarUrl
            email
            login
            repositories(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
            followers(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
            following(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [selectedOption, setSelectedOption] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  const submitHandler = (e) => {
    e.preventDefault();
    search({
      variables: {
        query: searchText,
        first: 5,
        login: '',
      },
    });
  };
  return (
    <>
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
    </>
  );
};

export default Search;
