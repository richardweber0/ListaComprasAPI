import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDTO } from './dto/usuario.cadastrar.dto';
import { ResponseDTO } from 'src/dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller("usuario")
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("listar")
    async listar(): Promise<Usuario[]> {
        return this.usuarioService.listar()
    }

    @Post("cadastrar")
    async cadastrar(@Body() data: UsuarioCadastrarDTO): Promise<ResponseDTO> {
        return this.usuarioService.cadastrar(data)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('login-token')
    async loginToken(@Request() req, @Body() data) {
        return this.authService.loginToken(data.token);
    }
}