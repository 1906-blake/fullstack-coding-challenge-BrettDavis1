package com.grocery.list.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.list.models.GroceryItem;
import com.grocery.list.models.GroceryList;
import com.grocery.list.repos.GroceryItemRepo;
import com.grocery.list.repos.GroceryListRepo;

@Service
public class GroceryListService {
	@Autowired
	private GroceryListRepo glr;
	@Autowired
	private GroceryItemRepo gir;
	
	public List<GroceryList> findAll() {
		return glr.findAll();
	}
	public GroceryList save(GroceryList gl) {
		return glr.saveAndFlush(gl);
	}
	public GroceryList addItem(int id, GroceryItem item) {
		item.setList(glr.getOne(id));
		gir.saveAndFlush(item);
		return glr.getOne(id);
	}
	public GroceryList deleteItem(int id, int itemId) {
		gir.deleteById(itemId);
		return glr.getOne(id);
	}
	public GroceryList deleteList(GroceryList list) {
		List<GroceryItem> items = gir.findByListListId(list.getListId());
		for(int i = 0; i < items.size(); i++) {
			gir.deleteById(items.get(i).getItemId());
		}
		glr.deleteById(list.getListId());
		return list;
	}
}
