import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { ResponseDTO } from 'src/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItemCadastrarDTO } from './dto/response.dto';
import { TokenService } from 'src/token/token.service';
import { Usuario } from 'src/usuario/usuario.entity';

@Controller("item")
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly tokenService: TokenService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("cadastrar")
    async cadastrar(@Body() data: ItemCadastrarDTO, @Req() req): Promise<ResponseDTO> {
        let token = req.headers.authorization
        let usuario: Usuario = await this.tokenService.getUsuarioToken(token)
        if (usuario) {
            return this.itemService.cadastrar(data, usuario)
        }
        else {
            throw new HttpException({
                errorMessage: "Token inválido",
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}