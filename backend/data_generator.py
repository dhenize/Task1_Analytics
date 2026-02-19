import random
from datetime import datetime, timedelta
from faker import Faker
import numpy as np

from models import UniformCategory, Product, Order, OrderItem

fake = Faker()

class DataGenerator:
    def __init__(self):
        self.categories = []
        self.products = []
        self.orders = []
        self.order_items = []
        
    def generate_categories(self):
        uniform_types = ['Shirt', 'Pant', 'Skirt', 'Blazer', 'Sweater', 'PE Uniform', 'Tie', 'Socks']
        sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
        
        for i, uniform_type in enumerate(uniform_types, 1):
            category = (
                f"{uniform_type}",
                uniform_type,
                ','.join(random.sample(sizes, random.randint(3, 6))),
                round(random.uniform(15.99, 89.99), 2)
            )
            self.categories.append(category)
        return self.categories
    
    def generate_products(self):
        product_names = [
            'Classic White', 'Navy Blue', 'Khaki', 'Grey', 'Black',
            'Plaid', 'Striped', 'Premium Cotton', 'Performance Fit',
            'Winter Weight', 'Summer Light', 'Regular Fit'
        ]
        
        for category_id, category in enumerate(self.categories, 1):
            category_name, category_type, size_options, base_price = category
            sizes = size_options.split(',')
            
            # Generate 3-5 products per category
            for _ in range(random.randint(3, 5)):
                product_name = f"{category_name} - {random.choice(product_names)}"
                size = random.choice(sizes)
                price = base_price * random.uniform(0.9, 1.2)
                stock = random.randint(10, 100)
                
                self.products.append((
                    category_id,
                    product_name,
                    size,
                    round(price, 2),
                    stock
                ))
        return self.products
    
    def generate_orders(self, num_orders=1000):
        payment_methods = ['Cash', 'Credit Card', 'Debit Card', 'Online Payment', 'Bank Transfer']
        statuses = ['Completed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        
        start_date = datetime(2024, 1, 1)
        end_date = datetime(2025, 1, 15)
        
        for i in range(1, num_orders + 1):
            # Generate random date and time
            random_days = random.randint(0, (end_date - start_date).days)
            order_date = start_date + timedelta(days=random_days)
            order_time = datetime.combine(order_date, datetime.min.time()) + timedelta(
                hours=random.randint(8, 20),
                minutes=random.randint(0, 59)
            )
            
            # Generate customer info
            customer_name = fake.name()
            customer_email = fake.email()
            
            # Order details
            order_number = f"ORD-{order_date.strftime('%Y%m')}-{i:05d}"
            total_amount = 0  # Will be calculated after adding items
            payment_method = random.choice(payment_methods)
            status = random.choices(
                statuses, 
                weights=[0.4, 0.2, 0.2, 0.15, 0.05], 
                k=1
            )[0]
            
            self.orders.append((
                order_number,
                customer_name,
                customer_email,
                order_date.date(),
                order_time.time(),
                total_amount,
                payment_method,
                status
            ))
        
        return self.orders
    
    def generate_order_items(self):
        if not self.products or not self.orders:
            return []
        
        order_items = []
        for order_id, order in enumerate(self.orders, 1):
            order_total = 0
            num_items = random.randint(1, 6)
            
            for _ in range(num_items):
                product_id = random.randint(1, len(self.products))
                product = self.products[product_id - 1]
                unit_price = product[3]  # price is at index 3
                quantity = random.randint(1, 4)
                subtotal = unit_price * quantity
                order_total += subtotal
                
                order_items.append((
                    order_id,
                    product_id,
                    quantity,
                    unit_price,
                    subtotal
                ))
            
            # Update order total
            self.orders[order_id - 1] = self.orders[order_id - 1][:6] + (order_total,) + self.orders[order_id - 1][7:]
        
        self.order_items = order_items
        return order_items
    
    def generate_all_data(self):
        print("Generating categories...")
        self.generate_categories()
        
        print("Generating products...")
        self.generate_products()
        
        print("Generating orders...")
        self.generate_orders(2000)  # Generate 2000 orders
        
        print("Generating order items...")
        self.generate_order_items()
        
        return {
            'categories': self.categories,
            'products': self.products,
            'orders': self.orders,
            'order_items': self.order_items
        }

def setup_database(db):
    try:
        # First, consume any pending results
        try:
            if db.connection and db.connection.unread_result:
                db.connection.get_rows()
        except:
            pass
            
        # Create tables
        print("Creating tables...")
        UniformCategory.create_table(db)
        Product.create_table(db)
        Order.create_table(db)
        OrderItem.create_table(db)
        
        # Clear existing data (optional - be careful!)
        print("Clearing existing data...")
        db.execute_query("SET FOREIGN_KEY_CHECKS = 0")
        db.execute_query("TRUNCATE TABLE order_items")
        db.execute_query("TRUNCATE TABLE orders")
        db.execute_query("TRUNCATE TABLE products")
        db.execute_query("TRUNCATE TABLE uniform_categories")
        db.execute_query("SET FOREIGN_KEY_CHECKS = 1")
        
        # Generate and insert new data
        print("Generating dummy data...")
        generator = DataGenerator()
        data = generator.generate_all_data()
        
        # Insert categories
        print("Inserting categories...")
        if data['categories']:
            UniformCategory.insert_many(db, data['categories'])
            print(f"✅ Inserted {len(data['categories'])} categories")
        
        # Insert products
        print("Inserting products...")
        if data['products']:
            Product.insert_many(db, data['products'])
            print(f"✅ Inserted {len(data['products'])} products")
        
        # Insert orders
        print("Inserting orders...")
        if data['orders']:
            Order.insert_many(db, data['orders'])
            print(f"✅ Inserted {len(data['orders'])} orders")
        
        # Insert order items
        print("Inserting order items...")
        if data['order_items']:
            OrderItem.insert_many(db, data['order_items'])
            print(f"✅ Inserted {len(data['order_items'])} order items")
        
        print("✅ Data generation complete!")
        return True
    except Exception as e:
        print(f"❌ Error in setup_database: {e}")
        import traceback
        traceback.print_exc()
        return False