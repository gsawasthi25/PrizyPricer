package com.xebia.prizyapp.productloader;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.xebia.prizyapp.Application;

@ContextConfiguration(classes = {Application.class})
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@TestPropertySource("classpath:application.properties")
public class ProductLoaderIntegrationTest {
	protected MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
	
	@Test
	public void shouldGetAProductForAnId() throws Exception {

		mockMvc.perform(get("/getProduct/{id}", "123456")).andExpect(status().isOk())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$.barCode", is(123456)))
				.andExpect(jsonPath("$.description", is("Coffee Mug Black")));
	}
	
	@Test
	public void shouldSaveProductPrice() throws Exception {
		mockMvc.perform(post("/saveProductPrice").contentType(APPLICATION_JSON_UTF8_VALUE)
				.content("{\"barCode\":123, \"storeId\":1, \"price\": 200.20, \"notes\":\"testd\"}"))
				.andExpect(status().isOk());
	}
}
