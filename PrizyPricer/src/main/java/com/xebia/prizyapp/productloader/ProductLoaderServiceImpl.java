package com.xebia.prizyapp.productloader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductLoaderServiceImpl implements ProductLoaderService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductPriceRepository productPriceRepository;

	@Override
	public Product getProduct(long barCode) {
		return this.productRepository.findByBarCode(barCode);
	}

	@Override
	public boolean saveProductPrice(ProductPrice productPrice) {
		return this.productPriceRepository.save(productPrice) != null ? true : false;
	}
}
