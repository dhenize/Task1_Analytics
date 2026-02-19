import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG
import time

class Database:
    def __init__(self):
        self.connection = None
        self.connect()
    
    def connect(self):
        try:
            self.connection = mysql.connector.connect(**DB_CONFIG)
            # Set to autocommit mode and use buffered cursors
            self.connection.autocommit = True
            print("✅ Connected to MySQL database")
        except Error as e:
            print(f"❌ Error connecting to MySQL: {e}")
    
    def ensure_connection(self):
        """Ensure the connection is alive"""
        try:
            if not self.connection or not self.connection.is_connected():
                print("🔄 Reconnecting to MySQL database...")
                self.connect()
            return True
        except Exception as e:
            print(f"❌ Connection error: {e}")
            return False
    
    def execute_query(self, query, params=None):
        """Execute a single query with proper result handling"""
        if not self.ensure_connection():
            return None
            
        cursor = None
        try:
            # Use buffered cursor to prevent unread results
            cursor = self.connection.cursor(dictionary=True, buffered=True)
            cursor.execute(query, params or ())
            
            if query.strip().upper().startswith('SELECT'):
                result = cursor.fetchall()
                # Ensure all results are consumed
                while cursor.nextset():
                    pass
                return result
            else:
                self.connection.commit()
                return cursor.rowcount
                
        except Error as e:
            print(f"❌ Error executing query: {e}")
            return None
        finally:
            if cursor:
                cursor.close()
    
    def execute_many(self, query, params_list):
        """Execute a query with multiple parameter sets"""
        if not self.ensure_connection():
            return None
            
        cursor = None
        try:
            cursor = self.connection.cursor(buffered=True)
            cursor.executemany(query, params_list)
            self.connection.commit()
            return cursor.rowcount
        except Error as e:
            print(f"❌ Error executing many: {e}")
            return None
        finally:
            if cursor:
                cursor.close()
    
    def get_tables(self):
        """Get list of all tables"""
        result = self.execute_query("SHOW TABLES")
        if result:
            return [list(row.values())[0] for row in result]
        return []
    
    def test_connection(self):
        """Simple connection test"""
        try:
            result = self.execute_query("SELECT 1 as test")
            return result is not None and result[0]['test'] == 1
        except:
            return False
    
    def close(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("🔌 MySQL connection closed")