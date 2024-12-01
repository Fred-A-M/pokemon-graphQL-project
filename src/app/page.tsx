// import Link from 'next/link';
import {client, GET_POKEMON} from '@/app/lib/apollo-client';
import Generations from './ui/generation-list';

export default async function Home() {
  
  const {data} = await client.query({
    query: GET_POKEMON,
  });

  return (
    <>
    <div className='flex flex-col items-center '>
      <Generations data={data} />
    </div>
    </>
  );
}
