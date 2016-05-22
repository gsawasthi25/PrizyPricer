package com.xebia.prizyapp.productloader;

public interface ProductLoaderService {
	Product getProduct(long barCode);

	boolean saveProductPrice(ProductPrice productPrice);
}
