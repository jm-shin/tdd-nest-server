import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryColumn()
  idx: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @UpdateDateColumn({ name: 'created_at', nullable: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'updated_at', nullable: false })
  createdAt: Date;
}
