package com.xebia.prizyapp.productloader;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name ="productprice")
public class ProductPrice implements Serializable {

	private static final long serialVersionUID = -7592565866497262191L;

	@SuppressWarnings("unused")
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@NotNull
	@Column(name = "barcode")
	private Long barCode;
	@NotNull
	@Column(name ="storeid")
	private Long storeId;
	@NotNull
	private Double price;
	private String notes;
	
	

	protected ProductPrice() {
	}

	public ProductPrice(Integer id, Long barCode, Long storeId, Double price, String notes) {
		super();
		this.id = id;
		this.barCode = barCode;
		this.storeId = storeId;
		this.price = price;
		this.notes = notes;
	}

	public Long getBarCode() {
		return barCode;
	}

	public void setBarCode(Long barCode) {
		this.barCode = barCode;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

}
