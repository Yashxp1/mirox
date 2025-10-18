import Items from '@/app/dashboard/Items';
import Sidebar from '@/components/Sidebar/Sidebar';
import DocUtils from '../DocUtils';
import Topbar from '@/app/dashboard/Topbar';

const Page = async ({ params }: { params: { id: string; doc: number } }) => {
  const param = await params;
  const wsId = param.id;
  // const docId = param.doc;

  return (
    <div className="flex w-full">
      <div className="z-50 top fixed w-full">
        <Topbar />
      </div>
      <div className="w-[300px] border-r  pt-[46px]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <DocUtils workspaceId={wsId} />
        </div>
        <div className="p-10 w-full">
          <Items workspaceId={wsId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
