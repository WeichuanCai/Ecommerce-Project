package com.weichuan.ecommerce.dto;

import com.weichuan.ecommerce.entity.Address;
import com.weichuan.ecommerce.entity.Customer;
import com.weichuan.ecommerce.entity.Order;
import com.weichuan.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
