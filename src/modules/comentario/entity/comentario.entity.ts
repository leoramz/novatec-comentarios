import { ApiProperty } from "@nestjs/swagger";
import { Max } from "class-validator";
import { text } from "express";
import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comentarios')
export class Comentario extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @ManyToOne(type => User, user => user.id)
    subject: User;

    @ApiProperty()
    @Column({ type: 'varchar', nullable: false })
    website: string;
    
    @ApiProperty()
    @Column({ type: 'varchar', nullable: false })
    text: string;

    @ApiProperty()
    @Column({ type: 'varchar', nullable: false })
    email: string;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}