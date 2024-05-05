<template>
    <div>
      <div>
        <div class="p-4 sm:ml-64">
          <div
            class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
          >
            <!-- Pilih Customer -->
            <div class="mb-4">
              <label for="customer" class="block text-sm font-medium text-gray-700">Pilih Customer</label>
              <select v-model="selectedCustomer" id="customer" name="customer" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
  
            <!-- Pilih Payment -->
            <div class="mb-4">
              <label for="payment" class="block text-sm font-medium text-gray-700">Pilih Payment</label>
              <select v-model="selectedPayment" id="payment" name="payment" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option v-for="payment in payments" :key="payment.id" :value="payment.id">{{ payment.name }}</option>
              </select>
            </div>
  
            <!-- Pilih Product -->
            <div class="mb-4">
              <label for="product" class="block text-sm font-medium text-gray-700">Pilih Product</label>
              <select v-model="selectedProduct" id="product" name="product" @change="calculateTotalPrice" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
              </select>
            </div>
  
            <!-- Input Discount per Product -->
            <div class="mb-4">
              <label for="discount" class="block text-sm font-medium text-gray-700">Input Discount per Product</label>
              <input v-model="discount" type="number" id="discount" name="discount" @change="calculateTotalPrice" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            </div>
  
            <!-- Tampilkan Product yang Sudah Dipilih dan Total Harga Belanjaan beserta Discount nya -->
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">Product yang Sudah Dipilih</h2>
              <ul class="divide-y divide-gray-200">
                <li v-for="item in selectedProducts" :key="item.id" class="py-2">
                  <span>{{ item.name }}: {{ item.price }} x {{ item.quantity }} = {{ item.totalPrice }}</span>
                </li>
              </ul>
              <p class="mt-2">Total Harga Belanjaan: {{ totalPrice }}</p>
            </div>
  
            <!-- Tambah atau Kurang Quantity -->
            <div class="mb-4">
              <button @click="increaseQuantity">Tambah Quantity</button>
              <button @click="decreaseQuantity">Kurang Quantity</button>
            </div>
  
            <!-- Input Discount Tambahan -->
            <div class="mb-4">
              <label for="additionalDiscount" class="block text-sm font-medium text-gray-700">Input Discount Tambahan</label>
              <input v-model="additionalDiscount" type="number" id="additionalDiscount" name="additionalDiscount" @change="calculateTotalPrice" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [
          { id: 1, name: "Customer 1" },
          { id: 2, name: "Customer 2" },
          { id: 3, name: "Customer 3" }
        ],
        payments: [
          { id: 1, name: "Cash" },
          { id: 2, name: "Credit Card" },
          { id: 3, name: "Online Transfer" }
        ],
        products: [
          { id: 1, name: "Product 1", price: 100 },
          { id: 2, name: "Product 2", price: 200 },
          { id: 3, name: "Product 3", price: 300 }
        ],
        selectedCustomer: null,
        selectedPayment: null,
        selectedProduct: null,
        discount: 0,
        selectedProducts: [],
        additionalDiscount: 0
      };
    },
    computed: {
      totalPrice() {
        let totalPrice = 0;
        this.selectedProducts.forEach((product) => {
          totalPrice += product.totalPrice;
        });
        return totalPrice - this.additionalDiscount;
      }
    },
    methods: {
      calculateTotalPrice() {
        if (this.selectedProduct) {
          const product = this.products.find(p => p.id === parseInt(this.selectedProduct));
          const totalPrice = (product.price - this.discount) * product.quantity;
          this.selectedProducts.push({ ...product, totalPrice });
        }
      },
      increaseQuantity() {
        if (this.selectedProducts.length > 0) {
          const lastIndex = this.selectedProducts.length - 1;
          this.selectedProducts[lastIndex].quantity++;
          this.calculateTotalPrice();
        }
      },
      decreaseQuantity() {
        if (this.selectedProducts.length > 0 && this.selectedProducts[this.selectedProducts.length - 1].quantity > 1) {
          const lastIndex = this.selectedProducts.length - 1;
          this.selectedProducts[lastIndex].quantity--;
          this.calculateTotalPrice();
        }
      }
    }
  };
  </script>
  
  <style>
  </style>
  