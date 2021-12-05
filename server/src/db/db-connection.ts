import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection, EntitySchema, ObjectType } from 'typeorm';
// https://github.com/vendure-ecommerce/vendure/blob/master/packages/core/src/api/common/request-context.ts
@Injectable()
export class DbConnection {
  constructor(@InjectConnection() private connection: Connection) {}

  /**
   * @description
   * The plain TypeORM Connection object. Should be used carefully as any operations
   * performed with this connection will not be performed within any outer
   * transactions.
   */
  get rawConnection(): Connection {
    return this.connection;
  }

  /**
   * @description
   * Returns a TypeORM repository. Note that when no RequestContext is supplied, the repository will not
   * be aware of any existing transaction. Therefore calling this method without supplying a RequestContext
   * is discouraged without a deliberate reason.
   */
  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity>;

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    return this.connection.getRepository(target);
  }
}
