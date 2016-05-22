package com.xebia.prizyapp.productview;

public class ProductDetail {

	private Long barCode;
	private String description;
	private Double averagePrice;
	private Double lowestPrice;
	private Double highestPrice;
	private Double idealPrice;

	protected ProductDetail() {
	}

	public ProductDetail(Long barCode, String description, Double averagePrice, Double lowestPrice, Double highestPrice,
			Double idealPrice) {
		super();
		this.barCode = barCode;
		this.description = description;
		this.averagePrice = averagePrice;
		this.lowestPrice = lowestPrice;
		this.highestPrice = highestPrice;
		this.idealPrice = idealPrice;
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

	public Double getAveragePrice() {
		return averagePrice;
	}

	public void setAveragePrice(Double averagePrice) {
		this.averagePrice = averagePrice;
	}

	public Double getLowestPrice() {
		return lowestPrice;
	}

	public void setLowestPrice(Double lowestPrice) {
		this.lowestPrice = lowestPrice;
	}

	public Double getHighestPrice() {
		return highestPrice;
	}

	public void setHighestPrice(Double highestPrice) {
		this.highestPrice = highestPrice;
	}

	public Double getIdealPrice() {
		return idealPrice;
	}

	public void setIdealPrice(Double idealPrice) {
		this.idealPrice = idealPrice;
	}

}
