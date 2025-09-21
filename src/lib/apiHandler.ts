import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

type Hanlder<T, P = Record<string, string>> = (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: P }
) => Promise<T>;

export function withApiHandler<T, P = Record<string, string>>(
  handler: Hanlder<T, P>
) {
  return async (req: NextRequest, ctx?: { params: P }) => {
    try {
      const session = await auth();

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const result = await handler(req, { id: session.user.id }, ctx);

      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    } catch (error) {
      console.error('API ERROR:', error);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error ? error.message : 'Internal server error',
        },
        { status: 500 }
      );
    }
  };
}
