package com.xebia.prizyapp.store;

import static org.hamcrest.Matchers.is;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.xebia.prizyapp.TestBaseController;
import com.xebia.prizyapp.productloader.Product;

public class StoreControllerTest extends TestBaseController{

	@Autowired
	private StoreService storeService;
	
	@Test
	public void shouldGetStoresList() throws Exception {

		List<Store> storeList = new ArrayList<Store>();
		Store firstStore = new Store(1L, "store 1", "location A");
		Store secondStore = new Store(1L, "store 1", "location A");
		storeList.add(firstStore);
		storeList.add(secondStore);
		
		Mockito.when(storeService.getStores()).thenReturn(storeList);

		mockMvc.perform(get("/getStores")).andExpect(status().isOk())
				.andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
				.andExpect(jsonPath("$[0].id", is(storeList.get(0).getId().intValue())))
				.andExpect(jsonPath("$[0].name", is(storeList.get(0).getName())));
	}
}
