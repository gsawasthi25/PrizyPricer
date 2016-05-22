package com.xebia.prizyapp.store;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService{

	@Autowired
	private StoreRepository storeRepository;

	@Override
	public List<Store> getStores() {
		return this.storeRepository.findAll();
	}

}
