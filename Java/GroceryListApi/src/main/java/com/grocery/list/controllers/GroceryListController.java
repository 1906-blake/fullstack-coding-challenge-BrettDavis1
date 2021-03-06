package com.grocery.list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grocery.list.models.GroceryItem;
import com.grocery.list.models.GroceryList;
import com.grocery.list.services.GroceryListService;

@RestController
@RequestMapping("grocery-lists")
public class GroceryListController {
	@Autowired
	private GroceryListService gls;
	
	@GetMapping
	private List<GroceryList> findAll() {
		return gls.findAll();
	}
	@GetMapping("/pages")
	private Page<GroceryList> findAllPages(@RequestParam int page) {
		return gls.findAllPages(page);
	}
	
	@PostMapping
	public GroceryList save(@RequestBody GroceryList gl) {
		return gls.save(gl);
	}
	@PostMapping("/{id}/items")
	public GroceryList addItem(@PathVariable int id, @RequestBody GroceryItem item) {
		return gls.addItem(id, item);
	}
	@DeleteMapping("/{id}/items/{itemId}")
	public GroceryList deleteItem(@PathVariable int id, @PathVariable int itemId) {
		return gls.deleteItem(id, itemId);
	}
	@DeleteMapping()
	public GroceryList deleteList(@RequestBody GroceryList list) {
		return gls.deleteList(list);
	}
	
}
