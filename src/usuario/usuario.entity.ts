import { Item } from 'src/item/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    user: string;

    @Column({ length: 255 })
    password: string;

    @OneToMany(() => Item, item => item.usuario)
    items: Item[]
}