import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    user: string;

    @Column({ length: 255 })
    password: string;
}