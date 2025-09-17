
import { auth } from '@/lib/auth';
import Image from 'next/image';
import React from 'react';

const UserData = async () => {
  const session = await auth();

  return (
    <div className='flex gap-1'>
      <p>{session?.user?.name}</p>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="size-6 flex items-center justify-center rounded-sm bg-orange-600 text-white">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserData;
