package com.xebia.prizyapp.productview;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.xebia.prizyapp.productloader.Product;

public interface ProductViewService {

	Page<Product> getProducts(Pageable pageable);

	ProductDetail getProductDetail(Long barCode);

}
