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

    async alterar(data: ItemCadastrarDTO, usuario: Usuario): Promise<ResponseDTO> {
        try {
            await this.itemRepository.update(data.id, {
                nome: data.nome,
                descricao: data.descricao,
                usuario: usuario
            });

            return {
                status: true,
                mensagem: "Item alterado com sucesso."
            };
        } catch (error) {
            return {
                status: false,
                mensagem: "Erro ao alterar item."
            };
        }
    }

    async listar(userId: number): Promise<Item[]> {
        return this.itemRepository.find({
            where: { usuario: { id: userId } }
        });
    }

    async buscar(id: number): Promise<Item> {
        return this.itemRepository.findOne({
            where: { id }
        });
    }

    async excluir(data: number): Promise<ResponseDTO> {
        let item = new Item()
        item.id = data
        return this.itemRepository.delete(item).then(() => {
            return <ResponseDTO>{
                status: true,
                mensagem: "Item excluído com sucesso."
            }
        }).catch((error) => {
            return <ResponseDTO>{
                status: false,
                erro: error,
                mensagem: "Erro ao excluir item."
            }
        })
    }
}