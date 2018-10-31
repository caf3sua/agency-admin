package com.baoviet.app.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebMvcConfig {
//	@Bean
//    public WebMvcConfigurerAdapter forwardToIndex() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addViewControllers(ViewControllerRegistry registry) {
//                // forward requests to /apidoc to their index.html
//                registry.addViewController("/").setViewName(
//                        "forward:/index.html");
//            }
//        };
//    }
	
	/*@Bean
	public FilterRegistrationBean someFilterRegistration() {

	    FilterRegistrationBean registration = new FilterRegistrationBean();
	    registration.setFilter(vsaFilter());
	    registration.addUrlPatterns("/*");
	    registration.setOrder(1);
	    return registration;
	} 

	public Filter vsaFilter() {
	    return new VsaFilter();
	}*/
}
