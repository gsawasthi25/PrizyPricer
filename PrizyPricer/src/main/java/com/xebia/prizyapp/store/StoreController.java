package com.xebia.prizyapp.store;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StoreController {

	@Autowired
	private StoreService storeService;
	
	@RequestMapping(value="/getStores" , method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public List<Store> getStores(){
		return storeService.getStores();
	}
}
