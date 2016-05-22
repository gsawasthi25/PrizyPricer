package com.xebia.prizyapp.productloader;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Product implements Serializable {

	private static final long serialVersionUID = -7277439319221695304L;

	@Id
	@Column(name = "barcode")
	private Long barCode;

	@Column(name = "description")
	private String description;

	protected Product() {
	}

	public Product(Long barCode, String description) {
		super();
		this.barCode = barCode;
		this.description = description;
	}

	public Long getBarCode() {
		return barCode;
	}

	public void setBarCode(Long barCode) {
		this.barCode = barCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
