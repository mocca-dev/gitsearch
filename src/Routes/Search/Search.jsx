import React, { useEffect, useState } from 'react';

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
        cursor
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
const SEARCH_MORE = gql`
  query SearchMore($query: String!, $first: Int!, $after: String!) {
    search(query: $query, type: USER, first: $first, after: $after) {
      edges {
        cursor
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
  const [searchValue, setSearchValue] = useState('');
  const [nextCursor, setNextCursor] = useState('');
  const [list, setList] = useState({ search: { edges: [] } });
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);
  const [loadMore, { loading: loadingMore, data: dataMore }] =
    useLazyQuery(SEARCH_MORE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ searchText }) => {
    setSearchValue(searchText);
    search({
      variables: {
        query: searchText,
        first: 5,
      },
    });
  };

  const onLoadMore = () => {
    loadMore({
      variables: {
        query: searchValue,
        first: 5,
        after: nextCursor,
      },
    });
  };

  useEffect(() => {
    if (data && data.search.edges.length) {
      setList(data);
      setNextCursor(data.search.edges[data.search.edges.length - 1].cursor);
    }
  }, [data]);

  useEffect(() => {
    if (dataMore && dataMore.search.edges.length) {
      setList({
        ...list,
        search: { edges: [...list.search.edges, ...dataMore.search.edges] },
      });
      setNextCursor(
        dataMore.search.edges[dataMore.search.edges.length - 1].cursor
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMore]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="search-container">
          <span className="input-btn">
            <Input
              placeholderText={
                selectedOption ? selectedOption + '...' : 'Select a criteria'
              }
              register={register}
              errors={errors.searchText}
            />
            <SubmitButton />
          </span>
        </div>
        <Select
          placeholderText="Search by"
          setSelectedOption={setSelectedOption}
          {...selectedOption}
        />
      </form>
      <UserList
        data={list}
        loading={loading}
        loadingMore={loadingMore}
        error={error}
        onLoadMore={() => onLoadMore()}
      />
    </>
  );
};

export default Search;
