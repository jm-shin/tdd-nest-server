import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EMPTY, from, Observable, of } from 'rxjs';
import { mergeMap, map, throwIfEmpty } from 'rxjs/operators';
import { UserPrincipal } from './interface/user-principal.interface';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser(id: string, pass: string): Observable<UserPrincipal> {
    return this.userService.findById(id).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),

      throwIfEmpty(
        () => new UnauthorizedException(`id or password is not matched`),
      ),

      mergeMap((user) => {
        const { id, password, username, email } = user;
        return from(compare(pass, password)).pipe(
          map((m) => {
            if (m) {
              return { id, username, email } as UserPrincipal;
            } else {
              throw new UnauthorizedException(
                'username or password is not matched',
              );
            }
          }),
        );
      }),
    );
  }

  login(user: UserPrincipal): Observable<AccessToken> {
    const payload: JwtPayload = {
      upn: user.username,
      sub: user.id,
      email: user.email,
    };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return { access_token };
      }),
    );
  }
}
