package com.carrental.controller;

import com.carrental.dto.LoginRequestDTO;
import com.carrental.dto.LoginResponseDTO;
import com.carrental.service.AuthService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;

@Controller("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Post("/login")
    public HttpResponse<?> login(@Body LoginRequestDTO request) {
        try {
            LoginResponseDTO response = authService.login(request);
            return HttpResponse.ok(response);
        } catch (RuntimeException e) {
            return HttpResponse.unauthorized();
        }
    }
}