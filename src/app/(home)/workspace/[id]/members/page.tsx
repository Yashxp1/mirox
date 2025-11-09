'use client';
import { useGetWSMembers } from '@/api-hooks/useWorkspaces';
import { Spinner } from '@/components/ui/spinner';
import { User } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const params = useParams();
  const wsId = params.id as string;
  const { data, isLoading, isError } = useGetWSMembers(wsId);

  if (isError)
    return (
      <p className="text-destructive text-sm text-center mt-10">
        An error occurred.
      </p>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner className="size-6" />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <p className="text-muted-foreground text-sm text-center mt-10">
        No members found.
      </p>
    );

  return (
    <div className=" flex flex-col items-center py-10 px-4 bg-background text-foreground transition-colors duration-200">
      <div className="w-full max-w-5xl text-sm border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_1fr] gap-4 border-b border-border px-5 py-3 font-medium text-muted-foreground bg-muted/40">
          <p>Name</p>
          <p>Role</p>
          <p>Joined</p>
          <p>Email</p>
        </div>

        {data.map((i) => (
          <div
            key={i.id}
            className=""
          >
            <Link href={`/workspace/${wsId}/members/${i.userId}`} className='grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_1fr] gap-4 border-b border-border px-5 py-1.5 items-center  transition-colors'>
              <div className="flex items-center gap-2">
                <User size={16} />
                <p className="truncate">{i?.name|| 'Unnamed'}</p>
              </div>
              <p
                className={`text-xs w-fit font-medium transition-all duration-300 cursor-pointer ${
                  i.role === 'ADMIN'
                    ? 'text-emerald-600 dark:text-emerald-400 '
                    : 'text-amber-600 dark:text-amber-400'
                } py-1.5 rounded-lg flex items-center gap-1.5`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    i.role === 'ADMIN'
                      ? 'bg-emerald-600 dark:bg-emerald-400'
                      : 'bg-amber-600 dark:bg-amber-400'
                  }`}
                />
                {i.role.toLowerCase()}
              </p>

              <p className="text-muted-foreground text-xs">
                {new Date(i.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="truncate">{i?.email || 'N/A'}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
