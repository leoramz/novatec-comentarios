import { ApiProperty } from "@nestjs/swagger";
import { Comentario } from "../../../modules/comentario/entity/comentario.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Max, Min } from "class-validator";

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', unique: true, length: 32, nullable: false })
    username: string;

    @ApiProperty()
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}