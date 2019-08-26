package com.grocery.list.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.list.models.GroceryItem;
import com.grocery.list.repos.GroceryItemRepo;

@Service
public class GroceryItemService {
	@Autowired
	private GroceryItemRepo gir;
	
	public List<GroceryItem> findByList(int id) {
		return gir.findByListListId(id);
	}

}
