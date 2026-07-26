import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const result = super.canActivate(context);

    if (result instanceof Promise) {
      return result.catch(() => true);
    }

    if (typeof result === 'boolean') {
      return result;
    }

    return result.pipe(catchError(() => of(true)));
  }

  handleRequest<TUser>(err: Error | null, user: TUser): TUser | undefined {
    if (err) {
      return undefined;
    }

    return user;
  }
}
