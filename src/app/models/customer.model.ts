import { Address } from './address.model';

export class Customer {
  constructor(public id: string, public name: string, public address: Address) {}
}

