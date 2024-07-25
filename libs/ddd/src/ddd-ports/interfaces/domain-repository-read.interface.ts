import { DomainAggregateRoot } from '../../ddd-aggregate-root';
import { DomainEntity } from '../../ddd-entity';
import { Primitives } from '../../ddd-valueobject';

/**
 * Represents a read repository interface for a domain entity or aggregate root.
 * @template TKey - The type of the entity or aggregate root's identifier.
 * @template TDomain - The type of the domain entity or aggregate root.
 */
export interface IDomainReadRepository<
  TKey extends Primitives,
  TDomain extends DomainAggregateRoot<any> | DomainEntity<any>,
> {
  /**
   * Retrieves all domain entities or aggregate roots.
   * @returns A promise that resolves to an array of domain entities or aggregate roots.
   */
  find(): Promise<TDomain[]>;

  /**
   * Retrieves a domain entity or aggregate root by its identifier.
   * @param id - The identifier of the domain entity or aggregate root.
   * @returns A promise that resolves to the found domain entity or aggregate root.
   */
  findById(id: TKey): Promise<TDomain>;
}
