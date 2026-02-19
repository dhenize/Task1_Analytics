from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database
from models import SalesAnalytics
import traceback

app = Flask(__name__)
CORS(app)

# Initialize database
db = Database()
analytics = SalesAnalytics(db)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        db_status = "connected" if db.test_connection() else "disconnected"
        return jsonify({
            'status': 'healthy',
            'database': db_status,
            'message': 'Backend is running'
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/api/sales/overview', methods=['GET'])
def get_sales_overview():
    """Get sales overview for dashboard"""
    period = request.args.get('period', 'daily')
    
    try:
        print(f"📊 Fetching {period} sales overview...")
        
        # Get data from analytics
        sales_data = analytics.get_sales_by_period(period) or []
        top_products = analytics.get_most_bought_products(5) or []
        peak_hours = analytics.get_peak_hours() or []
        category_sales = analytics.get_category_sales(period) or []
        active_customers = analytics.get_active_customers() or 0
        
        # Calculate metrics based on selected period
        # Calculate metrics based on selected period
        if period == 'daily':
            # For daily, sum all sales in the data (last 30 days from your data)
            total_revenue = sum(item.get('total_sales', 0) for item in sales_data)
            total_orders = sum(item.get('order_count', 0) for item in sales_data)
        elif period == 'weekly':
            # For weekly, sum all weekly sales
            total_revenue = sum(item.get('total_sales', 0) for item in sales_data)
            total_orders = sum(item.get('order_count', 0) for item in sales_data)
        else:  # monthly
            # For monthly, sum all monthly sales
            total_revenue = sum(item.get('total_sales', 0) for item in sales_data)
            total_orders = sum(item.get('order_count', 0) for item in sales_data)
            
        avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
        
        response_data = {
            'sales_data': sales_data,
            'top_products': top_products,
            'peak_hours': peak_hours,
            'category_sales': category_sales,
            'metrics': {
                'total_revenue': float(total_revenue),
                'total_orders': int(total_orders),
                'avg_order_value': float(avg_order_value),
                'active_customers': int(active_customers)
            }
        }
        
        print(f"✅ Successfully fetched {period} data")
        return jsonify(response_data), 200
        
    except Exception as e:
        print(f"❌ Error in sales overview: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/sales/top-products', methods=['GET'])
def get_top_products():
    """Get top selling products"""
    try:
        limit = request.args.get('limit', 10, type=int)
        products = analytics.get_most_bought_products(limit) or []
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sales/peak-hours', methods=['GET'])
def get_peak_hours():
    """Get peak ordering hours"""
    try:
        hours = analytics.get_peak_hours() or []
        return jsonify(hours), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sales/categories', methods=['GET'])
def get_category_sales():
    """Get sales by category"""
    try:
        period = request.args.get('period', 'daily')
        categories = analytics.get_category_sales(period) or []
        return jsonify(categories), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reports/detailed', methods=['GET'])
def get_detailed_report():
    """Get detailed report data"""
    try:
        period = request.args.get('period', 'daily')
        report_data = analytics.get_detailed_report(period)
        return jsonify(report_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ========== NEW ANALYTICS ENDPOINTS ==========

@app.route('/api/analytics/sizes', methods=['GET'])
def get_size_analytics():
    """Get size distribution"""
    try:
        query = """
        SELECT size, SUM(quantity) as value
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE size IS NOT NULL AND size != ''
        GROUP BY size
        ORDER BY value DESC
        """
        result = db.execute_query(query)
        # Format for pie chart
        formatted = [{"name": r["size"], "value": float(r["value"])} for r in result] if result else []
        return jsonify(formatted)
    except Exception as e:
        print(f"❌ Error in size analytics: {str(e)}")
        return jsonify([]), 500

@app.route('/api/analytics/payments', methods=['GET'])
def get_payment_analytics():
    """Get payment method breakdown"""
    try:
        query = """
        SELECT payment_method as name, COUNT(*) as orders, SUM(total_amount) as total
        FROM orders
        WHERE payment_method IS NOT NULL
        GROUP BY payment_method
        ORDER BY orders DESC
        """
        result = db.execute_query(query)
        # Convert Decimal to float for JSON serialization
        if result:
            for row in result:
                if 'total' in row and row['total'] is not None:
                    row['total'] = float(row['total'])
        return jsonify(result) if result else jsonify([])
    except Exception as e:
        print(f"❌ Error in payment analytics: {str(e)}")
        return jsonify([]), 500

@app.route('/api/analytics/weekday', methods=['GET'])
def get_weekday_analytics():
    """Get weekday vs weekend analysis"""
    try:
        query = """
        SELECT 
            CASE 
                WHEN DAYOFWEEK(order_date) IN (1,7) THEN 'Weekend'
                ELSE 'Weekday'
            END as day_type,
            COUNT(*) as order_count,
            SUM(total_amount) as total_sales
        FROM orders
        GROUP BY day_type
        """
        result = db.execute_query(query)
        # Convert Decimal to float for JSON serialization
        if result:
            for row in result:
                if 'total_sales' in row and row['total_sales'] is not None:
                    row['total_sales'] = float(row['total_sales'])
        return jsonify(result) if result else jsonify([])
    except Exception as e:
        print(f"❌ Error in weekday analytics: {str(e)}")
        return jsonify([]), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)