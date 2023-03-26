import { DefaultNamingStrategy, Table, NamingStrategyInterface } from 'typeorm';
import { RandomGenerator } from 'typeorm/util/RandomGenerator';

export class DatabaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[],
  ): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = this.getTableName(tableOrName);
    const replacedTableName = tableName.replace('.', '_');

    const key = [replacedTableName, ...clonedColumnNames].join('_');
    const sha = RandomGenerator.sha1(key).substring(0, 27);

    return 'FK_' + key + '_' + sha;
  }
}
