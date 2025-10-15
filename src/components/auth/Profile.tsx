import Image from 'next/image';

const Profile = () => {
  // const session = await auth();

  return (
    <div className="flex justify-center items-center rounded-sm ">
      <Image
        src="/default.jpg"
        height="100"
        width="100"
        alt="pfp"
        className="rounded-sm size-7"
      />
    </div>
  );
};

export default Profile;
