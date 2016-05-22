package com.xebia.prizyapp.productloader;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.xebia.prizyapp.TestBaseController;

public class ProductLoaderControllerTest extends TestBaseController {

	@Autowired
	private ProductLoaderService productLoaderService;

	@Test
	public void shouldGetAProductForAnId() throws Exception {

		Product product = new Product(123456L, "Tea Mug");
		when(productLoaderService.getProduct(123456)).thenReturn(product);

		mockMvc.perform(get("/getProduct/{id}", "123456")).andExpect(status().isOk())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.barCode", is(product.getBarCode().intValue())))
				.andExpect(jsonPath("$.description", is(product.getDescription())));
	}

	@Test
	public void shouldSaveProductPrice() throws Exception {
		//ProductPrice productPrice = new ProductPrice(null, 123L, 1L, 200.20F, "test price");
		when(this.productLoaderService.saveProductPrice( Mockito.any(ProductPrice.class))).thenReturn(true);

		mockMvc.perform(post("/saveProductPrice").contentType(APPLICATION_JSON_UTF8_VALUE)
				.content("{\"barCode\":123, \"storeId\":1, \"price\": 200.20, \"notes\":\"testd\"}"))
				.andExpect(status().isOk());
	}

}
