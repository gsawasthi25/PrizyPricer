package com.xebia.prizyapp.productloader;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class ProductLoaderController {

	@Autowired
	private ProductLoaderService productLoaderService;

	@RequestMapping(value = "/getProduct/{barCode}", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public Product getProduct(@PathVariable("barCode") long barCode) {
		return this.productLoaderService.getProduct(barCode);
	}

	@RequestMapping(value = "/saveProductPrice", method = POST)
	@ResponseStatus(value = OK)
	public void saveProductPrice(@RequestBody ProductPrice productPrice) {
		this.productLoaderService.saveProductPrice(productPrice);
	}
}
