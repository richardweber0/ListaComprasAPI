import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ResponseDTO } from 'src/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { ItemCadastrarDTO } from './dto/response.dto';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class ItemService {
    constructor(
        @Inject('ITEM_REPOSITORY')
        private itemRepository: Repository<Item>,
    ) { }

    async cadastrar(data: ItemCadastrarDTO, usuario: Usuario): Promise<ResponseDTO> {
        let item = new Item()
        item.nome = data.nome
        item.descricao = data.descricao
        item.quantidade = data.quantidade
        item.usuario = usuario
        return this.itemRepository.save(item).then(() => {
            return <ResponseDTO>{
                status: true,
                mensagem: "Item cadastrado com sucesso."
            }
        }).catch((error) => {
            return <ResponseDTO>{
                status: false,
                erro: error,
                mensagem: "Erro ao cadastrar item."
            }
        })
    }
}