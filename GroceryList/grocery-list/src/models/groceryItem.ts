import { GroceryList } from './groceryList';

export class GroceryItem {
    constructor(
        public itemId = 0,
        public item = '',
        public itemType = '',
        public list: GroceryList
    ) {}
}