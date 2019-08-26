package com.grocery.list.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grocery.list.models.GroceryItem;

public interface GroceryItemRepo extends JpaRepository<GroceryItem, Integer>{

}
