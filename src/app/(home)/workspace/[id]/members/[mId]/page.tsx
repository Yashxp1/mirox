'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useGetOneWSMember,
  useLeaveWS,
  useUpdateMemberRole,
} from '@/api-hooks/useWorkspaces';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Role } from '@/types/workspace';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '@/components/ui/dialog';

const Page = () => {
  const params = useParams();
  const wsId = params.id as string;
  const mId = params.mId as string;

  const { data, isLoading } = useGetOneWSMember(wsId, mId);
  const { mutate, isPending: isUpdating } = useUpdateMemberRole(wsId, mId);

  const { mutate: leaveWS, isPending: isDeleting } = useLeaveWS(wsId);

  const router = useRouter();

  const handleRemoveUser = () => {
    leaveWS(mId, {
      onSuccess: () => {
        router.push(`/workspace/${wsId}/members`);
        toast.success('Member removed');
      },
      onError: () => toast.error('Failed to remove member'),
    });
  };
  const handleRoleUpdate = (newRole: Role) => {
    mutate(
      { role: newRole },

      {
        onSuccess: () => toast.success('Updated role!'),
        onError: () => toast.error('Failed to update role!'),
      }
    );
  };

  return (
    <Card className="max-w-md mx-auto mt-6 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl bg-white dark:bg-zinc-900 overflow-hidden">
      <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={'/logo.svg'}
              alt={data?.user?.name || ''}
              width={100}
              height={100}
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover"
            />
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
              {data?.user?.name}
            </CardTitle>
          </div>

          <p
            className={`text-xs w-fit font-medium transition-all duration-300 cursor-pointer ${
              data?.role === 'ADMIN'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-600/30 hover:border-emerald-600/50'
                : 'text-amber-600 dark:text-amber-400 bg-amber-600/15 hover:bg-amber-600/25 border border-amber-600/30 hover:border-amber-600/50'
            } py-1.5 px-2.5 rounded-lg flex items-center gap-1.5`}
          >
            {data?.role}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        {isLoading ? (
          <Spinner className="w-full flex justify-center items-center" />
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Name</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {data?.user?.name || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Email</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {data?.user?.email || '-'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  User ID
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">
                  {data?.userId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Workspace ID
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">
                  {data?.workspaceId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Member Record ID
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-mono text-xs">
                  {data?.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Joined At
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Unknown date'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                Change Role
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-800"
                  disabled={data?.role === 'MEMBER' || isUpdating}
                  onClick={() => handleRoleUpdate(Role.MEMBER)}
                >
                  {isUpdating ? <Spinner /> : 'Member'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-800"
                  disabled={data?.role === 'ADMIN' || isUpdating}
                  onClick={() => handleRoleUpdate(Role.ADMIN)}
                >
                  {isUpdating ? <Spinner /> : 'Admin'}
                </Button>
              </div>
            </div>

            <div className="flex">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Remove User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Remove user</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove this user?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-center items-center w-full gap-2">
                    <Button
                      onClick={handleRemoveUser}
                      type="button"
                      className="bg-red-600/20 text-red-500 hover:bg-red-600/10"
                      disabled={isDeleting}
                    >
                      {isDeleting ? <Spinner /> : 'Remove'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Page;
