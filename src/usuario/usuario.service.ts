import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDTO } from './dto/usuario.cadastrar.dto';
import { ResponseDTO } from 'src/dto/response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async listar(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async cadastrar(data: UsuarioCadastrarDTO): Promise<ResponseDTO> {
        let usuario = new Usuario()
        usuario.id = data.id
        usuario.user = data.usuario
        usuario.password = bcrypt.hashSync(data.senha, 8)
        return this.usuarioRepository.save(usuario)
            .then((result) => {
                return <ResponseDTO>{
                    status: true,
                    mensagem: "Usuário cadastrado com sucesso."
                }
            })
            .catch((error) => {
                return <ResponseDTO>{
                    status: false,
                    erro: error,
                    mensagem: "Erro ao cadastrar usuário."
                }
            })
    }

    async findOne(username: string): Promise<Usuario | undefined> {
        return this.usuarioRepository.findOne({ where: { user: username } });
    }
}