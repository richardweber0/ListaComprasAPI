import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { retry } from 'rxjs';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,
        private usuarioService: UsuarioService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) { }

    async saveToken(hash: string, username: string) {
        let objectToken = await this.tokenRepository.findOne({ where: { username: username } })
        if (objectToken) {
            this.tokenRepository.update(objectToken.id, {
                hash: hash
            })
        }
        else {
            this.tokenRepository.insert({
                hash: hash,
                username: username
            })
        }
    }

    async refreshToken(oldToken: string) {
        let objectToken = await this.tokenRepository.findOne({ where: { hash: oldToken } })
        if (objectToken) {
            let usuario = await this.usuarioService.findOne(objectToken.username)
            return this.authService.login(usuario)
        }
        else {
            return new HttpException({
                errorMessage: "Token inválido",
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}