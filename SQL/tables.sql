CREATE TABLE grocery_list (
	list_id SERIAL PRIMARY KEY,
	list_name TEXT NOT NULL
);
CREATE TABLE grocery_item (
	item_id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
	item_type TEXT NOT NULL,
	list INTEGER NOT NULL REFERENCES grocery_list(list_id)
);