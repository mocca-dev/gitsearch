import React, { useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';

import Input from './../../Components/Input/Input';
import Select from './../../Components/Select/Select';
import SubmitButton from './../../Components/SubmitButton/SubmitButton';
import UserList from './../../Components/UserList/UserList';
import './Search.css';

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
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ searchText }) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
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
            register={register}
            errors={errors.searchText}
          />
          <SubmitButton />
        </div>
      </form>
      <UserList data={data} loading={loading} error={error} />
    </>
  );
};

export default Search;
