package com.grocery.list.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grocery.list.models.GroceryList;

public interface GroceryListRepo extends JpaRepository<GroceryList, Integer>{

}
