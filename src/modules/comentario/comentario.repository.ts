import { EntityRepository, Repository } from 'typeorm';
import { Comentario } from './entity/comentario.entity';

@EntityRepository(Comentario)
export class ComentarioRepository extends Repository<Comentario> {}