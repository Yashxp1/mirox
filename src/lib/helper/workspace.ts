import { prisma } from '../prisma';

export async function assertUserInWorkspace(
  workspaceId: string,
  userId: string
) {
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
  });

  if (membership) {
    return membership;
  }

  const workspace = await prisma.workSpace.findFirst({
    where: {
      id: workspaceId,
      authorId: userId,
    },
  });

  if (workspace) {
    return workspace;
  }

  throw new Error('You are not a member of this workspace');
}

export async function assertUserWorkspaceRole(
  workspaceId: string,
  userId: string
) {
  
  const membership = await assertUserInWorkspace(workspaceId, userId);

  if (membership.id !== 'OWNER' && membership.id !== 'ADMIN') {
    throw new Error(
      'You don’t have permission to perform this action in this workspace'
    );
  }

  return membership;
}
