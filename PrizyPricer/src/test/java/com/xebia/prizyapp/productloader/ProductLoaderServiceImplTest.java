package com.xebia.prizyapp.productloader;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ProductLoaderServiceImplTest {

	@InjectMocks
	private ProductLoaderService productLoaderService = new ProductLoaderServiceImpl();
	
	@Test
	public void shouldGetAProduct(){

	}
}
