package com.weichuan.ecommerce.service;

import com.weichuan.ecommerce.dto.Purchase;
import com.weichuan.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
