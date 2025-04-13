import UserDetails from '@/component/userdeatils'
import React from 'react'

type PageProps = {
    params: {
      username: string;
    };
  };

function page( { params }: PageProps) {
  return (
    <div>
        <UserDetails params={params} />
    </div>
  )
}

export default page