'use client';
import { useGetWSMembers } from '@/api-hooks/useWorkspaces';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useGetWSMembers(id);

  if (isError) return <p>an error occured</p>;
  return (
    <div>
      {' '}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.map((i) => (
            <div key={i.id}>
              <h1>{i.wsId}</h1>
              <p>{i.CreatedAt}</p>
              {/* <p>{}</p> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Page;
