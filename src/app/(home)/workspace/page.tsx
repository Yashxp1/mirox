import { Box, Plus } from 'lucide-react';

interface WorkspacePageProps {
  params: { workspace: string };
}
const Page = async ({ params }: WorkspacePageProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 text-sm ">
          <p className="font-medium">Workspace</p>
          <p className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium ">
            <Box size={14} /> {params.workspace}
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs font-medium  hover:bg-zinc-700 transition-colors">
          <Plus size={14} /> Add Project
        </button>
      </div>
    </div>
  );
};

export default Page;
