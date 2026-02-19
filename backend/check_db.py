from database import Database

def main():
    db = Database()
    conn = db.connection
    print('connection object:', conn)
    try:
        connected = conn.is_connected() if conn else False
    except Exception as e:
        connected = False
    print('is_connected:', connected)
    try:
        print('SELECT 1 =>', db.execute_query('SELECT 1') )
    except Exception as e:
        print('execute_query error:', e)

if __name__ == '__main__':
    main()
