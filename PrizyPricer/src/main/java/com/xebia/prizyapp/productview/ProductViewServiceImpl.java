package com.xebia.prizyapp.productview;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xebia.prizyapp.productloader.Product;
import com.xebia.prizyapp.productloader.ProductPrice;
import com.xebia.prizyapp.productloader.ProductPriceRepository;
import com.xebia.prizyapp.productloader.ProductRepository;

@Service
public class ProductViewServiceImpl implements ProductViewService {

	@Value("${formulae.percentage:20}")
	private int percentage;

	@Value("${formulae.lowOffSet:2}")
	private int lowOffSet;

	@Value("${formulae.highOffSet:2}")
	private int highOffset;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductPriceRepository ProductPriceRepository;

	@Override
	public Page<Product> getProducts(Pageable pageable) {
		return this.productRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public ProductDetail getProductDetail(Long barCode) {
		List<ProductPrice> productPriceList = this.ProductPriceRepository.findByBarCodeOrderByPriceDesc(barCode);
		if(productPriceList == null || productPriceList.isEmpty()){
			return null;
		}
		Product product = this.productRepository.findByBarCode(barCode);

		ProductDetail productDetail = new ProductDetail();
		productDetail.setBarCode(product.getBarCode());
		productDetail.setDescription(product.getDescription());
		productDetail.setHighestPrice(productPriceList.get(0).getPrice());
		productDetail.setLowestPrice(productPriceList.get(productPriceList.size() - 1).getPrice());

		List<Double> list = productPriceList.stream().map(ProductPrice::getPrice).collect(Collectors.toList());
		productDetail.setAveragePrice(calculateAverage(list));
		productDetail.setIdealPrice(calculateIdealPrice(list, highOffset, lowOffSet, percentage));
		return productDetail;
	}

	private Double calculateIdealPrice(List<Double> list, int highestOffset, int lowestOffset, int percentage) {

		// If the total number of price is less than the sum of high and low
		// offset then apply simple average
		if (list.size() <= highestOffset + lowestOffset) {
			return calculateAverage(list);
		}

		while (highestOffset > 0) {
			list.remove(highestOffset - 1);
			highestOffset--;
		}
		while (lowestOffset > 0) {
			list.remove(list.size() - lowestOffset);
			lowestOffset--;
		}

		double trimmedAverage = calculateAverage(list);

		return trimmedAverage * (percentage / 100.0) + trimmedAverage;
	}

	private double calculateAverage(List<Double> list) {
		return list.stream().mapToDouble(a -> a).average().getAsDouble();
	}

}
