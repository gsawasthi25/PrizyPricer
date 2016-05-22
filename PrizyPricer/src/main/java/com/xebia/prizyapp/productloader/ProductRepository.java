package com.xebia.prizyapp.productloader;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

public interface ProductRepository extends Repository<Product, Long>{

	Product findByBarCode(long barCode);

	Page<Product> findAll(Pageable pageable);

}
