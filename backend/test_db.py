from database import Database
from models import UniformCategory, Product, Order, OrderItem

def test_database():
    print("Testing database connection...")
    db = Database()
    
    if not db.connection or not db.connection.is_connected():
        print("❌ Failed to connect to database")
        return
    
    print("✅ Connected to database")
    
    # Test creating tables
    print("\nCreating tables...")
    try:
        UniformCategory.create_table(db)
        print("✅ UniformCategory table created")
        
        Product.create_table(db)
        print("✅ Product table created")
        
        Order.create_table(db)
        print("✅ Order table created")
        
        OrderItem.create_table(db)
        print("✅ OrderItem table created")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return
    
    # Verify tables exist
    print("\nVerifying tables...")
    tables = db.get_tables()
    if tables:
        print("Tables in database:")
        for table in tables:
            print(f"  - {table}")
        
        # Check if all required tables exist
        required_tables = ['uniform_categories', 'products', 'orders', 'order_items']
        missing_tables = [t for t in required_tables if t not in tables]
        
        if missing_tables:
            print(f"\n❌ Missing tables: {missing_tables}")
        else:
            print("\n✅ All required tables created successfully!")
            
            # Test inserting a sample category
            print("\nTesting data insertion...")
            try:
                # Insert a test category
                test_category = [
                    ('Test Shirt', 'Shirt', 'S,M,L', 29.99),
                    ('Test Pants', 'Pants', 'M,L,XL', 39.99)
                ]
                result = UniformCategory.insert_many(db, test_category)
                if result:
                    print(f"✅ Successfully inserted {result} test categories")
                else:
                    print("❌ Failed to insert test categories")
            except Exception as e:
                print(f"❌ Error inserting test data: {e}")
    else:
        print("❌ No tables found")
    
    db.close()
    print("\n✅ Database test completed!")

if __name__ == "__main__":
    test_database()