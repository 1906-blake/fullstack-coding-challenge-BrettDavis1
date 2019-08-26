package com.grocery.list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grocery.list.models.GroceryItem;
import com.grocery.list.services.GroceryItemService;

@RestController
@RequestMapping("grocery-item")
public class GroceryItemController {
	@Autowired
	private GroceryItemService gis;
	
	@GetMapping("/{id}")
	public List<GroceryItem> findByList(@PathVariable int id) {
		return gis.findByList(id);
	}
}
