package com.xebia.prizyapp;

import static org.mockito.Mockito.mock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.xebia.prizyapp.productloader.ProductLoaderService;
import com.xebia.prizyapp.productview.ProductViewService;
import com.xebia.prizyapp.store.StoreService;

@Configuration
@Profile("test")
public class TestApplication {

	@Bean
	public ProductLoaderService productLoaderService() {
		return mock(ProductLoaderService.class);
	}

	@Bean
	public StoreService storeService() {
		return mock(StoreService.class);
	}

	@Bean
	public ProductViewService productViewService() {
		return mock(ProductViewService.class);
	}
}
