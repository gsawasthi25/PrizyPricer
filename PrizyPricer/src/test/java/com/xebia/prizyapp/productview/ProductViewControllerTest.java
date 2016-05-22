package com.xebia.prizyapp.productview;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.xebia.prizyapp.TestBaseController;
import com.xebia.prizyapp.productloader.Product;

public class ProductViewControllerTest extends TestBaseController {

	@Autowired
	private ProductViewService productViewService;

	@Test
	public void shouldGetAPageOfProduct() throws Exception {

		List<Product> productList = new ArrayList<Product>();
		Product firstProduct = new Product(1L, "first product");
		Product secondProduct = new Product(2L, "second product");
		Product thirdProduct = new Product(3L, "third product");
		Product fourthProduct = new Product(4L, "fourth product");
		productList.add(firstProduct);
		productList.add(secondProduct);
		productList.add(thirdProduct);
		productList.add(fourthProduct);

		Page<Product> productPage = new PageImpl<Product>(productList, new PageRequest(0, 2), 0);
		when(productViewService.getProducts(Mockito.any(Pageable.class))).thenReturn(productPage);

		mockMvc.perform(get("/getProducts?size=2&number=0")).andExpect(status().isOk())
				.andExpect(jsonPath("$.size", is(2))).andExpect(jsonPath("$.number", is(0)))
				.andExpect(jsonPath("$.totalPages", is(2))).andExpect(jsonPath("$.totalElements", is(4)))
				.andExpect(jsonPath("$.content.[0].barCode", is(1)))
				.andExpect(jsonPath("$.content.[0].description", is("first product")));
	}

	@Test
	public void shouldGetProductDetailForABarCode() throws Exception {

		ProductDetail productDetail = new ProductDetail(12345L, "first", 200.20, 198.0, 202.40, 200.50);
		when(productViewService.getProductDetail(12345L)).thenReturn(productDetail);

		mockMvc.perform(get("/getProductDetail/{barCode}", 12345L)).andExpect(status().isOk())
				.andExpect(jsonPath("$.barCode", is(12345)))
				.andExpect(jsonPath("$.description", is("first")))
				.andExpect(jsonPath("$.averagePrice", is(200.20)))
				.andExpect(jsonPath("$.lowestPrice", is(198.0)))
				.andExpect(jsonPath("$.highestPrice", is(202.40)))
				.andExpect(jsonPath("$.idealPrice", is(200.50)));
	}
}
