# E-commerce microservices
I asked ChatGpt to create a project idea for me to learn Kafka. It gave me this: an order and invoice generator. I complemented it with a few more features. The project has four microservices:
1. Auth Service
- It allows users to register and log in using Google Single Sign On (SSO).
- Create a JWT token for each user.
2. Order Service
- List orders from a user.
- Create orders and publish the `order.placed` event.
3. Payment Service
- Listen to the `order.placed` event and update the order status as pending payment.
- When users click the `Pay` button, it randomly chooses whether the payment is successful or a failure. After, it publishes `payment.success` or `payment.failed` according to payment status.
4. Invoice Service
- Listen to payment publications.
- If it's a success, generate an invoice number. If it isn't, update the order status to canceled.
	
The technologies used to make this project are Nuxt3, Pinia, Docker, Supabase, Bootstrap, Express, Kafka, JWT, and Passport. To run it, you need the following environment variables:
```
JWT_SECRET
SUPABASE_URL
SUPABASE_KEY
FRONT_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SESSION_SECRET
LOGIN_SERVICE_URL
AUTH_SERVICE
ORDER_SERVICE
PAYMENT_SERVICE
```
