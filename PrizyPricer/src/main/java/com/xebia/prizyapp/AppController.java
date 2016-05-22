package com.xebia.prizyapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AppController {

	@RequestMapping("/")
	@ResponseBody
	public String getApp(){
		return "app";
	}
}
