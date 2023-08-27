import { Donator } from './donator';

export class DonatorPair {
  constructor(
    public donators: Donator[],
    public totalItems: number,
  ) {}
}
