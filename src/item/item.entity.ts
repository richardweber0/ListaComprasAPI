import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 255 })
    descricao: string;

    @ManyToOne(() => Usuario, usuario => usuario.items)
    usuario: Usuario
}