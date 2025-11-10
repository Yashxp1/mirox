import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

type Handler<T, P = Record<string, string>> = (
  req: NextRequest,
  user: { id: string },
  ctx: { params: P }
) => Promise<T>;

export function withApiHandler<T, P = Record<string, string>>(
  handler: Handler<T, P>
) {
  return async (req: NextRequest, ctx?: { params?: Promise<P> }) => {
    try {
      const session = await auth();

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const params = ctx?.params ? await ctx.params : ({} as P);

      const result = await handler(
        req,
        { id: session.user.id },
        { params }
      );

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