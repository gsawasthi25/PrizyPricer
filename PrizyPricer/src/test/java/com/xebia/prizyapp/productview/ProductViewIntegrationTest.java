package com.xebia.prizyapp.productview;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.xebia.prizyapp.Application;

@ContextConfiguration(classes = { Application.class })
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@TestPropertySource("classpath:application.properties")
public class ProductViewIntegrationTest {

	protected MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}

	@Test
	public void shouldGetProductDetailForABarCode() throws Exception {

		mockMvc.perform(get("/getProductDetail/{barCode}", 123450))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.barCode", is(123450)))
				.andExpect(jsonPath("$.description", is("Tea Mug0")))
				.andExpect(jsonPath("$.averagePrice", is(101.15)))
				.andExpect(jsonPath("$.lowestPrice", is(100.2)))
				.andExpect(jsonPath("$.highestPrice", is(102.2)))
				.andExpect(jsonPath("$.idealPrice", is(121.34)));
	}

}
