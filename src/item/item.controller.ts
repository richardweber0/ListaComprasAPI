import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { ResponseDTO } from 'src/dto/response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItemCadastrarDTO } from './dto/response.dto';
import { TokenService } from 'src/token/token.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { Item } from './item.entity';

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

    @UseGuards(JwtAuthGuard)
    @Get("listar")
    async listar(@Request() req): Promise<Item[]> {
        const userId = req.user.userId;
        return this.itemService.listar(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async buscar(@Param('id') id: number, @Req() req): Promise<Item> {
        let token = req.headers.authorization;
        let usuario: Usuario = await this.tokenService.getUsuarioToken(token);
        if (usuario) {
            return this.itemService.buscar(Number(id));
        } else {
            throw new HttpException({
                errorMessage: "Token inválido",
            }, HttpStatus.UNAUTHORIZED);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete("excluir/:id")  // Especificar que o id é um parâmetro de rota
    async excluir(@Param('id') id: number, @Req() req): Promise<ResponseDTO> {
        let token = req.headers.authorization;
        let usuario: Usuario = await this.tokenService.getUsuarioToken(token);
        if (usuario) {
            return this.itemService.excluir(Number(id));
        } else {
            throw new HttpException({
                errorMessage: "Token inválido",
            }, HttpStatus.UNAUTHORIZED);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put("alterar/:id")
    async alterar(@Body() data: ItemCadastrarDTO, @Req() req): Promise<ResponseDTO> {
        let token = req.headers.authorization
        let usuario: Usuario = await this.tokenService.getUsuarioToken(token)
        if (usuario) {
            return this.itemService.alterar(data, usuario)
        }
        else {
            throw new HttpException({
                errorMessage: "Token inválido",
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}