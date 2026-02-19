class UniformCategory:
    @staticmethod
    def create_table(db):
        query = """
        CREATE TABLE IF NOT EXISTS uniform_categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            type VARCHAR(50) NOT NULL,
            size_options TEXT,
            base_price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
        db.execute_query(query)
    
    @staticmethod
    def insert_many(db, categories):
        query = """
        INSERT INTO uniform_categories (name, type, size_options, base_price)
        VALUES (%s, %s, %s, %s)
        """
        return db.execute_many(query, categories)

class Product:
    @staticmethod
    def create_table(db):
        query = """
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_id INT,
            name VARCHAR(200) NOT NULL,
            size VARCHAR(20),
            price DECIMAL(10, 2) NOT NULL,
            stock_quantity INT DEFAULT 0,
            FOREIGN KEY (category_id) REFERENCES uniform_categories(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
        db.execute_query(query)
    
    @staticmethod
    def insert_many(db, products):
        query = """
        INSERT INTO products (category_id, name, size, price, stock_quantity)
        VALUES (%s, %s, %s, %s, %s)
        """
        return db.execute_many(query, products)

class Order:
    @staticmethod
    def create_table(db):
        query = """
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_number VARCHAR(50) UNIQUE,
            customer_name VARCHAR(200),
            customer_email VARCHAR(200),
            order_date DATE,
            order_time TIME,
            total_amount DECIMAL(10, 2),
            payment_method VARCHAR(50),
            status VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
        db.execute_query(query)
    
    @staticmethod
    def insert_many(db, orders):
        query = """
        INSERT INTO orders (order_number, customer_name, customer_email, order_date, 
                           order_time, total_amount, payment_method, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        return db.execute_many(query, orders)

class OrderItem:
    @staticmethod
    def create_table(db):
        query = """
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            product_id INT,
            quantity INT,
            unit_price DECIMAL(10, 2),
            subtotal DECIMAL(10, 2),
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
        """
        db.execute_query(query)
    
    @staticmethod
    def insert_many(db, items):
        query = """
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
        VALUES (%s, %s, %s, %s, %s)
        """
        return db.execute_many(query, items)

class SalesAnalytics:
    def __init__(self, db):
        self.db = db
    
    def get_sales_by_period(self, period='daily'):
        """Get sales grouped by period"""
        if period == 'daily':
            query = """
            SELECT 
                COALESCE(DATE(order_date), 'No Date') as date, 
                COUNT(*) as order_count,
                COALESCE(SUM(total_amount), 0) as total_sales
            FROM orders
            WHERE order_date IS NOT NULL
            GROUP BY DATE(order_date)
            ORDER BY date DESC
            """
        elif period == 'weekly':
            query = """
            SELECT 
                CONCAT('Week ', WEEK(order_date)) as week,
                MIN(DATE(order_date)) as start_date,
                MAX(DATE(order_date)) as end_date,
                COUNT(*) as order_count,
                COALESCE(SUM(total_amount), 0) as total_sales
            FROM orders
            WHERE order_date IS NOT NULL
            GROUP BY YEAR(order_date), WEEK(order_date)
            ORDER BY MAX(order_date) DESC
            """
        else:  # monthly
            query = """
            SELECT 
                COALESCE(DATE_FORMAT(order_date, '%Y-%m'), 'No Month') as month,
                COALESCE(DATE_FORMAT(order_date, '%M %Y'), 'Unknown') as month_name,
                COUNT(*) as order_count,
                COALESCE(SUM(total_amount), 0) as total_sales
            FROM orders
            WHERE order_date IS NOT NULL
            GROUP BY DATE_FORMAT(order_date, '%Y-%m')
            ORDER BY month DESC
            """
        return self.db.execute_query(query)
    
    def get_most_bought_products(self, limit=5):
        """Get top selling products"""
        query = """
        SELECT 
            p.name, 
            COALESCE(SUM(oi.quantity), 0) as total_quantity,
            COALESCE(SUM(oi.subtotal), 0) as total_revenue,
            COALESCE(uc.name, 'Unknown') as category_name
        FROM products p
        LEFT JOIN order_items oi ON p.id = oi.product_id
        LEFT JOIN uniform_categories uc ON p.category_id = uc.id
        GROUP BY p.id, p.name, uc.name
        HAVING total_quantity > 0
        ORDER BY total_quantity DESC
        LIMIT %s
        """
        return self.db.execute_query(query, (limit,))
    
    def get_peak_hours(self):
        """Get peak ordering hours"""
        query = """
        SELECT HOUR(order_time) as hour,
            COUNT(*) as order_count,
            COALESCE(SUM(total_amount), 0) as total_sales
        FROM orders
        WHERE order_time IS NOT NULL
        GROUP BY HOUR(order_time)
        ORDER BY hour ASC
        """
        return self.db.execute_query(query)
    
    def get_category_sales(self, period='daily'):
        """Get sales by category with accurate calculations"""
        if period == 'daily':
            query = """
            SELECT 
                uc.id,
                uc.name as category,
                uc.type,
                COALESCE(day_sales.order_date, 'No Sales') as date,
                COALESCE(day_sales.order_count, 0) as order_count,
                COALESCE(day_sales.total_items, 0) as total_items,
                COALESCE(day_sales.total_sales, 0) as total_sales
            FROM uniform_categories uc
            LEFT JOIN (
                SELECT 
                    p.category_id,
                    DATE(o.order_date) as order_date,
                    COUNT(DISTINCT o.id) as order_count,
                    SUM(oi.quantity) as total_items,
                    SUM(oi.subtotal) as total_sales
                FROM products p
                JOIN order_items oi ON p.id = oi.product_id
                JOIN orders o ON oi.order_id = o.id
                GROUP BY p.category_id, DATE(o.order_date)
            ) day_sales ON uc.id = day_sales.category_id
            ORDER BY uc.name, date DESC
            """
        elif period == 'weekly':
            query = """
            SELECT 
                uc.id,
                uc.name as category,
                uc.type,
                CONCAT('Week ', week_sales.week_num) as week,
                week_sales.start_date,
                week_sales.end_date,
                COALESCE(week_sales.order_count, 0) as order_count,
                COALESCE(week_sales.total_items, 0) as total_items,
                COALESCE(week_sales.total_sales, 0) as total_sales
            FROM uniform_categories uc
            LEFT JOIN (
                SELECT 
                    p.category_id,
                    WEEK(o.order_date) as week_num,
                    YEAR(o.order_date) as year_num,
                    MIN(DATE(o.order_date)) as start_date,
                    MAX(DATE(o.order_date)) as end_date,
                    COUNT(DISTINCT o.id) as order_count,
                    SUM(oi.quantity) as total_items,
                    SUM(oi.subtotal) as total_sales
                FROM products p
                JOIN order_items oi ON p.id = oi.product_id
                JOIN orders o ON oi.order_id = o.id
                GROUP BY p.category_id, YEAR(o.order_date), WEEK(o.order_date)
            ) week_sales ON uc.id = week_sales.category_id
            ORDER BY uc.name, week_sales.year_num DESC, week_sales.week_num DESC
            """
        else:  # monthly
            query = """
            SELECT 
                uc.id,
                uc.name as category,
                uc.type,
                month_sales.month,
                month_sales.month_name,
                COALESCE(month_sales.order_count, 0) as order_count,
                COALESCE(month_sales.total_items, 0) as total_items,
                COALESCE(month_sales.total_sales, 0) as total_sales
            FROM uniform_categories uc
            LEFT JOIN (
                SELECT 
                    p.category_id,
                    DATE_FORMAT(o.order_date, '%Y-%m') as month,
                    DATE_FORMAT(o.order_date, '%M %Y') as month_name,
                    COUNT(DISTINCT o.id) as order_count,
                    SUM(oi.quantity) as total_items,
                    SUM(oi.subtotal) as total_sales
                FROM products p
                JOIN order_items oi ON p.id = oi.product_id
                JOIN orders o ON oi.order_id = o.id
                GROUP BY p.category_id, DATE_FORMAT(o.order_date, '%Y-%m')
            ) month_sales ON uc.id = month_sales.category_id
            ORDER BY uc.name, month_sales.month DESC
            """
        return self.db.execute_query(query)
    
    
    def get_active_customers(self):
        """Get count of active customers from all data"""
        query = """
        SELECT COUNT(DISTINCT customer_email) as active_customers
        FROM orders
        """
        result = self.db.execute_query(query)
        return result[0]['active_customers'] if result else 0
    
    def get_detailed_report(self, period='daily'):
        """Get detailed report data for downloads"""
        if period == 'daily':
            query = """
            SELECT 
                DATE(o.order_date) as date,
                o.order_number,
                o.customer_name,
                uc.name as category,
                p.name as product_name,
                oi.quantity,
                oi.unit_price,
                oi.subtotal,
                o.payment_method,
                o.status
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            JOIN uniform_categories uc ON p.category_id = uc.id
            WHERE o.order_date >= CURDATE() - INTERVAL 30 DAY
            ORDER BY o.order_date DESC, o.order_time DESC
            """
        elif period == 'weekly':
            query = """
            SELECT 
                CONCAT('Week ', WEEK(o.order_date)) as period,
                MIN(DATE(o.order_date)) as start_date,
                MAX(DATE(o.order_date)) as end_date,
                COUNT(DISTINCT o.id) as order_count,
                COALESCE(SUM(oi.quantity), 0) as total_items,
                COALESCE(SUM(oi.subtotal), 0) as total_sales
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            JOIN uniform_categories uc ON p.category_id = uc.id
            WHERE o.order_date IS NOT NULL
            GROUP BY YEAR(o.order_date), WEEK(o.order_date)
            ORDER BY MAX(o.order_date) DESC
            LIMIT 12
            """
        else:
            query = """
            SELECT 
                DATE_FORMAT(o.order_date, '%Y-%m') as period,
                DATE_FORMAT(o.order_date, '%M %Y') as month_name,
                COUNT(DISTINCT o.id) as order_count,
                COALESCE(SUM(oi.quantity), 0) as total_items,
                COALESCE(SUM(oi.subtotal), 0) as total_sales
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            JOIN uniform_categories uc ON p.category_id = uc.id
            WHERE o.order_date IS NOT NULL
            GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
            ORDER BY period DESC
            LIMIT 12
            """
        return self.db.execute_query(query)