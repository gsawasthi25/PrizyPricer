package com.xebia.prizyapp.store;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface StoreRepository extends Repository<Store, Long>{
	
	List<Store> findAll();
}
