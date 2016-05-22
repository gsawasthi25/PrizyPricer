package com.xebia.prizyapp.productview;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xebia.prizyapp.productloader.Product;

@Controller
public class ProductViewController {

	@Autowired
	private ProductViewService productViewService;

	@RequestMapping(value = "/getProducts", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public Page<Product> getProducts(Pageable pageable) {
		return this.productViewService.getProducts(pageable);
	}

	@RequestMapping(value = "/getProductDetail/{barCode}", method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	public ProductDetail getProductDetails(@PathVariable("barCode") Long barCode) {
		return this.productViewService.getProductDetail(barCode);
	}
}
