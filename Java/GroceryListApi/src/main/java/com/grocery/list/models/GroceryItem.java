package com.grocery.list.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "grocery_item")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class GroceryItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private int itemId;
	
	private String item;
	
	@Column(name = "item_type")
	private String itemType;
	@OneToOne
	@JoinColumn(name = "list")
	private GroceryList list;
	
	public GroceryItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GroceryItem(int itemId, String item, String itemType, GroceryList list) {
		super();
		this.itemId = itemId;
		this.item = item;
		this.itemType = itemType;
		this.list = list;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	public GroceryList getList() {
		return list;
	}

	public void setList(GroceryList list) {
		this.list = list;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((item == null) ? 0 : item.hashCode());
		result = prime * result + itemId;
		result = prime * result + ((itemType == null) ? 0 : itemType.hashCode());
		result = prime * result + ((list == null) ? 0 : list.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GroceryItem other = (GroceryItem) obj;
		if (item == null) {
			if (other.item != null)
				return false;
		} else if (!item.equals(other.item))
			return false;
		if (itemId != other.itemId)
			return false;
		if (itemType == null) {
			if (other.itemType != null)
				return false;
		} else if (!itemType.equals(other.itemType))
			return false;
		if (list == null) {
			if (other.list != null)
				return false;
		} else if (!list.equals(other.list))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "GroceryItem [itemId=" + itemId + ", item=" + item + ", itemType=" + itemType + ", list=" + list + "]";
	}
	
}
