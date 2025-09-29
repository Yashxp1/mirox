import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { workspaceId } = await req.json();

    const workspace = await prisma.workSpace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: workspace.id });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
