package com.carrental.config;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Filter;
import io.micronaut.http.filter.HttpServerFilter;
import io.micronaut.http.filter.ServerFilterChain;
import io.micronaut.core.async.publisher.Publishers;

import org.reactivestreams.Publisher;

@Filter("/**")
public class CorsFilter implements HttpServerFilter {

    @Override
    public Publisher<MutableHttpResponse<?>> doFilter(HttpRequest<?> request, ServerFilterChain chain) {

        // Preflight (OPTIONS)
        if (request.getMethod().name().equals("OPTIONS")) {
            return Publishers.just(HttpResponse.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
            );
        }

        return Publishers.map(chain.proceed(request), response -> {
            response.getHeaders()
                .add("Access-Control-Allow-Origin", "*")
                .add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            return response;
        });
    }
}