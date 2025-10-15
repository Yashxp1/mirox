import Items from '@/app/dashboard/Items';
import Sidebar from '@/components/Sidebar/Sidebar';
import Topbar from '../Topbar';
import DocUtils from '../DocUtils';

const Page = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  const id = param.id;

  return (
    <div className="flex w-full">
      <div className="z-50 top fixed w-full">
        <Topbar />
      </div>
      <div className="w-[300px] border-r  pt-[46px]">
        <Sidebar />
      </div>
      <div className='flex flex-col w-full'>
        <div className='w-full'>
          <DocUtils />
        </div>
        <div className="p-10 w-full">
          <Items workspaceId={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
