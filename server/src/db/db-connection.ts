import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
// https://github.com/vendure-ecommerce/vendure/blob/master/packages/core/src/api/common/request-context.ts
import { Connection, Schema, Model } from 'mongoose';

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

  getModel<Doc>(name: string, schema: Schema<Doc>): Model<Doc> {
    return this.connection.model(name, schema);
  }
}
