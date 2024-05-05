<template>
  <div>
    <div>
      <div class="p-4 sm:ml-64">
        <div
          class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
        >
          <!-- Pilih Customer -->
          <div class="mb-4">
            <label
              for="customer"
              class="block text-sm font-medium text-gray-700"
              >Pilih Customer</label
            >
            <select
              v-model="selectedCustomer"
              id="customer"
              name="customer"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option
                v-for="customer in customerData"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.customer_name }}
              </option>
            </select>
          </div>

          <!-- Pilih Payment -->
          <div class="mb-4">
            <label for="payment" class="block text-sm font-medium text-gray-700"
              >Pilih Payment</label
            >
            <select
              v-model="selectedPayment"
              id="payment"
              name="payment"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option
                v-for="payment in paymentData"
                :key="payment.id"
                :value="payment.id"
              >
                {{ payment.name }}
              </option>
            </select>
          </div>

          <!-- Pilih Product -->
          <div class="mb-4">
            <label for="product" class="block text-sm font-medium text-gray-700"
              >Pilih Product</label
            >
            <select
              v-model="selectedProduct"
              id="product"
              name="product"
              @change="updateProductDetails"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option
                v-for="product in productData"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>

          <!-- Input Discount per Product -->
          <div class="mb-4" v-if="selectedProducts.length > 0">
            <label
              for="discount"
              class="block text-sm font-medium text-gray-700"
              >Input Discount per Product</label
            >
            <input
              v-model="selectedProducts[0].discount"
              type="number"
              id="discount"
              name="discount"
              @change="calculateTotalPrice"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <!-- Input Discount Tambahan -->
          <div class="mb-4">
            <label
              for="additionalDiscount"
              class="block text-sm font-medium text-gray-700"
              >Input Discount Tambahan</label
            >
            <input
              v-model="additionalDiscount"
              type="number"
              id="additionalDiscount"
              name="additionalDiscount"
              @change="calculateTotalPrice"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

           <!-- Tampilkan Product yang Sudah Dipilih dan Total Harga Belanjaan beserta Discount nya -->
           <div class="mb-4">
            <h2 class="text-lg font-medium text-gray-900">
              Product yang Sudah Dipilih
            </h2>
            <ul class="divide-y divide-gray-200">
              <li v-for="item in selectedProducts" :key="item.id" class="py-2">
                <span
                  >{{ item.name }}: {{ item.price }} x {{ item.quantity }} =
                  Rp.{{ item.totalPrice }}</span
                >
              </li>
            </ul>
            <p class="mt-2">Total Harga Belanjaan: Rp.{{ totalPrice }}</p>
          </div>

          <!-- Tambah atau Kurang Quantity -->
          <div class="mb-4">
            <button
              @click="increaseQuantity"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
            >
              Tambah Quantity
            </button>
            <button
              @click="decreaseQuantity"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-2"
            >
              Kurang Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import customerData from "../json/customer.json";
import paymentData from "../json/payment.json";
import productData from "../json/product.json";

export default {
  data() {
    return {
      customerData: [],
      selectedCustomer: null,
      paymentData: [],
      selectedPayment: null,
      productData: [],
      selectedProduct: null,
      discount: 0,
      additionalDiscount: 0,
      totalPrice: 0, // Initialize totalPrice in data
    };
  },
  mounted() {
    this.customerData = customerData.data;
    this.paymentData = paymentData;
    this.productData = productData;
    this.calculateTotalPrice(); // Calculate total price on mount
  },
  computed: {
    selectedProducts() {
      if (!this.selectedProduct) return [];
      const product = this.productData.find(
        (p) => p.id === this.selectedProduct
      );
      return [
        { ...product, quantity: 1, totalPrice: product.price, discount: 0 },
      ];
    },
  },
  methods: {
    updateProductDetails() {
      // Logic to update product details based on selected product
    },
    increaseQuantity() {
      if (this.selectedProducts.length > 0) {
        this.selectedProducts[0].quantity++;
        this.calculateTotalPrice(); // Update total price
      }
    },
    decreaseQuantity() {
      if (
        this.selectedProducts.length > 0 &&
        this.selectedProducts[0].quantity > 1
      ) {
        this.selectedProducts[0].quantity--;
        this.calculateTotalPrice(); // Update total price
      }
    },
    calculateTotalPrice() {
      const totalPriceWithoutDiscount = this.selectedProducts.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const totalDiscount = this.selectedProducts.reduce(
        (total, item) =>
          total + (item.price * item.quantity * item.discount) / 100,
        0
      );
      this.totalPrice =
        totalPriceWithoutDiscount - totalDiscount - this.additionalDiscount;
    },
  },
};
</script>

  
  <style>
</style>
  