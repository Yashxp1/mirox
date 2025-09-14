import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

type Hanlder<T> = (
  req: NextRequest,
  user: { id: string },
  ctx: undefined
) => Promise<T>;

export function withApiHandler<T>(handler: Hanlder<T>) {
  return async (req: NextRequest, ctx?: undefined) => {
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
