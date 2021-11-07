import { useEffect, useState } from 'react';
import {
  // useQuery,
  gql,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

  useEffect(() => {
    getStaticProps().then((data) => console.log(data.props.pinnedItems));
  }, []);

  return (
    <div className="App">
      {/* <ExchangeRates /> */}
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

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // repository(owner: "octocat", name: "Hello-World") {
  //   issues(last: 20, states: CLOSED) {
  //     edges {
  //       node {
  //         title
  //         url
  //         labels(first: 5) {
  //           edges {
  //             node {
  //               name
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  const { data } = await client.query({
    query: gql`
      query SearchUsers($query: String!, $first: Int!) {
        search(query: $query, type: USER, first: $first) {
          edges {
            node {
              ... on User {
                login
              }
            }
          }
        }
      }
    `,
    variables: {
      query: 'mocca-dev',
      first: 10,
      login: '',
    },
  });

  const { search } = data;
  const pinnedItems = search.edges.map((edge) => edge.node);

  return {
    props: { pinnedItems },
  };
}
