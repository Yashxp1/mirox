import { prisma } from './prisma';

export async function getWorkspace(wsId: string | undefined, user:string) {
  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: { members: true },
  });

  if (!workspace || workspace.authorId !== user) {
    throw new Error('Workspace not found or unauthorized');
  }

  return workspace;
}
