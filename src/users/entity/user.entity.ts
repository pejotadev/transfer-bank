import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users') 
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({ type: 'varchar', length: 100 })
    full_name: string; 

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 14 })
    cpf_cnpj: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: ['common', 'merchant'] })
    user_type: 'common' | 'merchant';

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

}
