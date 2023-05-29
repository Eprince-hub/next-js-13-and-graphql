import { gql } from '@apollo/client';
import Image from 'next/image';
import { getClient } from '../util/client';

export type GitHubProfileResponse = {
  user: {
    name: string;
    avatarUrl: string;
    repositories: {
      edges: {
        node: {
          name: string;
          id: string;
          defaultBranchRef: {
            name: string;
          };
        };
      }[];
    };
  };
};

export default async function Home() {
  const { data } = await getClient().query<GitHubProfileResponse>({
    query: gql`
      query profileQuery($username: String = "Eprince-hub") {
        user(login: $username) {
          name
          avatarUrl
          repositories(last: 10) {
            edges {
              node {
                id
                name
                defaultBranchRef {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });

  return (
    <main
      style={{
        padding: '2rem',
      }}
    >
      <h1>GitHub Profile</h1>

      <br />
      <br />
      <h2>{data.user.name}</h2>

      <Image src={data.user.avatarUrl} alt="avatar" width={400} height={400} />

      <br />

      <h2>Repositories</h2>

      <ul>
        {data.user.repositories.edges.map((repo) => {
          return (
            <li key={`${repo.node.name}-${repo.node.id}`}>
              {repo.node.name} / ({repo.node.defaultBranchRef.name})
            </li>
          );
        })}
      </ul>
    </main>
  );
}
