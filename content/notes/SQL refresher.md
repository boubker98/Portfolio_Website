---
title: SQL Refresher
date: 2024-03-24
tags: [SQL, Data Engineering]
---

# Intermediate SQL
## Aggregate functions 
- SUM(): adds together all values in a particular column
- MIN(): fetches the lowest value in a particular column
- MAX(): fetches the highest value in a particular column
- AVG(): calculates the average of a group of selected values
- COUNT(): counts how many rows are in a particular column

## Group By
Simply put, group by separates data into groups that can be aggregated independently.
```postgresql
SELECT  	
	category,
	SUM(spend)
FROM product_spend 
GROUP BY category;
```

we can group by multiple columns, whenever the aggregation we want depends on a combination of multiple attributes, not just one. Basically, you’re creating groups that are unique across **all the columns in the `GROUP BY` clause**.

rules to uphold when grouping by a column or more:
- every column in select that isn't inside an aggregate function must be in group by
- include a column in group by if you want to see results split by that column
- columns inside an aggregate function do not need to be in group by
- if we want to column in the result but not in group by, it must be aggregated somehow
## Having
Due to WHERE's shortcomings in dealing with aggregated groups (mainly cuz it's for filtering rows before aggregation), HAVING comes in to filter groups after aggregation.
Having lets us keep or discard entire groups based on a condition that usually involves aggregate functions like SUM(), COUNT(), AVG(),...
```sql
SELECT ticker, AVG(open) 
FROM stock_prices 
GROUP BY ticker 
HAVING AVG(open) > 200;
```

|                       | WHERE                                                                    | HAVING                                                                             |
| --------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| When it filters       | Values BEFORE Grouping                                                   | Values after Grouping                                                              |
| Operates on data from | Individual rows                                                          | Aggregated values from groups of rows                                              |
| example               | `SELECT username, followers FROM instagram_data WHERE followers > 1000;` | `SELECT country FROM instagram_data GROUP BY country HAVING AVG(followers) > 100;` |
> HAVING can also be used with multiple conditions, we can add AND and whatever conditions necessary

## Distinct
Used in conjunction with SELECT to return only distinct values 
```sql
SELECT DISTINCT manufacturer FROM pharmacy_sales;
```

## Arithmetic
We can use math expressions to transform column values
```sql
SELECT particle_speed / 10.0 + speed_offset 
FROM particle_sensor_data WHERE (particle_position ^ 2) * 10.0 > 500 AND sensor_type = 'photon' AND measurement_day %  7 = 0;
```

| **Operator**    | **Description**                           | **Example** | **Result** |
| --------------- | ----------------------------------------- | ----------- | ---------- |
| +               | Addition                                  | 15 + 5      | 20         |
| -               | Subtraction                               | 15 - 5      | 10         |
| *               | Multiplication                            | 15 * 5      | 75         |
| /               | Division                                  | 15 / 5      | 3          |
| %               | Modulus (Remainder of Division)           | 14 % 5      | 4          |
| ^               | Exponentiation (Not standard in all DBMS) | 15 ^ 2      | 225        |
| - (as a prefix) | Negation                                  | -15         | -15        |
for order of operations, sql follows PEMDAS

|SQL Statement|Result|Explanation|
|---|---|---|
|SELECT 3 + 7 * 2;|17|Multiplication comes before addition.|
|SELECT (3 + 7) * 2;|20|Parentheses means addition happens first.|
|SELECT 10 / 2 + 3 * 4;|17|10/2 = 5, 3*4=12, so 5 + 12 = 17.|
|SELECT (10 / 2) + (3 * 4);|17|Same as above, but more explicit with parens!|

## Math 
### ABS(): Calculating absolute differences
```sql
SELECT    date,    ticker,   (close-open) AS difference,   ABS(close-open) AS abs_difference FROM stock_prices WHERE EXTRACT(YEAR FROM date) = 2023   AND ticker = 'GOOG';
```

### ROUND(): Rounding numbers
```sql
SELECT    ticker,   AVG(close) AS avg_close,   ROUND(AVG(close), 2) AS rounded_avg_close FROM stock_prices WHERE EXTRACT(YEAR FROM date) = 2022 GROUP BY ticker;
```

### CEIL() and FLOOR(): Rounding up and down
```sql
SELECT    date,   ticker,   high,   CEIL(high) AS resistance_level,   low,   FLOOR(low) AS support_level FROM stock_prices WHERE ticker = 'META' ORDER BY date;
```

### POWER(): Calculating squared values
```sql
SELECT    date,   ticker,   close,   ROUND(POWER(close, 2),2) AS squared_close FROM stock_prices WHERE ticker IN ('AAPL', 'GOOG', 'MSFT') ORDER BY date;
```

### MOD() or %: Modulus
```sql
SELECT    ticker,   close,   MOD(close, 5) AS price_remainder_mod,   close%5 AS price_remainder_modulo FROM stock_prices WHERE ticker = 'GOOG';
```

## Division
In SQL, integer division discards the remainder from the output, providing only the integer part of the result, but we can use a couple of tricks to retain the decimal part:
### CAST()
Convert one or both operands into decimal or floating-point data types
```sql
SELECT 
  CAST(10 AS DECIMAL)/4,
  CAST(10 AS FLOAT)/4,
  10/CAST(6 AS DECIMAL),
  10/CAST(6 AS FLOAT);
```

### Multiply by 1.0
Doing this converts an integer into a decimal or floating-point data type, allowing for the inclusion of decimal places in the result.
```sql
SELECT    10/6,   10*1.0/6,   10/6*1.0,   10/(6*1.0);
```

### ::DECIMAL/::FLOAT
The `::` notation is a versatile tool to cast data types explicitly. When used for division, it signifies that you want the division to be executed with the specified data type, effectively achieving decimal or floating-point output.
```sql
SELECT    10::DECIMAL/4,   10::FLOAT/4,   10/4::DECIMAL,   10/4::FLOAT,   10::DECIMAL/6,   10::FLOAT/6;
```

## NULL
Indicates the absence of a value, NULL doesn't represent a specific value but rather a missing or unknown piece of information
- `IS NULL` and `IS NOT NULL`: Used to identify null and non-null values.
- `COALESCE()`: Returns the first non-null value from a list of arguments.
- `IFNULL()`: Substitutes null value with a specified value specified.

Identifying null values with IS NULL and IS NOT NULL
```sql
SELECT * FROM goodreads WHERE book_title = NULL;
```

Takes multiple inputs and returns the first non-null value
```sql
SELECT COALESCE(book_rating, 0) 
FROM goodreads;
```

Fill the gaps using IFNULL() with default values
```sql
SELECT    book_title,    IFNULL(book_rating, 0) AS rated_books FROM goodreads;
```
 >While both the `COALESCE()` and `IFNULL()` functions serve a similar purpose of handling `NULL` values, there is a key difference between them.
>**`COALESCE()` function:** Versatile for multiple arguments, it returns the first non-null value among them.

```sql
COALESCE(arg1, arg2, arg3, ...)
```
>**`IFNULL()` function:** Handles two arguments, returning the second if the first is null; else, it returns the first.

```sql
IFNULL(expression, value_if_null)
```

## CASE
Allows us to shape, transform, manipulate and filter data based on specified conditions

CASE in SELECT creates new columns, categorizes data or performs calculations based on specific conditions
```sql
SELECT
  column_1,
  column_2, 
  CASE 
    WHEN condition_1 THEN result_1
    WHEN condition_2 THEN result_2
    WHEN ... THEN ...
    ELSE result_3 -- If condition_1 and condition_2 are not met, return result_3 in ELSE clause
  END AS column_3_name -- Give your new column an alias
FROM table_1;
```

CASE in WHERE filters rows based on specific conditions 
```sql
SELECT   column_1,   column_2 
FROM table_1 
WHERE CASE
		WHEN condition_1 THEN result_1 
		WHEN condition_2 THEN result_2    
		WHEN ... THEN ...     
		ELSE result_3 -- If condition_1 and condition_2 are not met, return result_3 in ELSE clause   END;
```

## JOIN
There are 4 types of joins:
- Inner join: only matches
- Left join: everything from left, plus matches
- Right join: everything from right, plus matches
- Full outer join: everything from both, matched if possible
- Cross join: every possible combination
![[Pasted image 20250925155551.png]]
### INNER JOIN
- returns only the rows where there's a match in both tables
- if a row in one table has no corresponding match in the other, it will not appear in the result
```sql
SELECT c.customer_id, c.name, o.order_id
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id;
```

### LEFT JOIN
- returns all rows from the left table, and the matched rows from the right table
- if there's no match on the right side, you'll still see the left row, with null values for the right side
```sql
SELECT c.customer_id, c.name, o.order_id
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id;
```

### RIGHT JOIN
- The opposite of left join
- returns all rows from the right table, matched rows from the left table
- if there's no match, the left side will show null
```sql
SELECT c.customer_id, c.name, o.order_id
FROM customers c
RIGHT JOIN orders o
    ON c.customer_id = o.customer_id;
```

### FULL OUTER JOIN
- returns all rows from both tables
- rows that don't have a match on either side will still appear, with null for the missing columns
```sql
SELECT c.customer_id, c.name, o.order_id
FROM customers c
FULL OUTER JOIN orders o
    ON c.customer_id = o.customer_id;
```

### CROSS JOIN
- returns the cartesian product of the two tables
- every row in table A is combined with every row in table B
- Typically used for generating combinations or when you deliberately want all pairings
```sql
SELECT from e.employee_name, p.project_name
FROM employees e
CROSS JOIN projects p;
```

## DATETIME 
| Function | PostgreSQL | MySQL | SQL Server |
|----------|------------|-------|------------|
| Current Date | `CURRENT_DATE` | `CURDATE()` | `CAST(GETDATE() AS DATE)` |
| Current Time | `CURRENT_TIME` | `CURTIME()` | `CAST(GETDATE() AS TIME)` |
| Current DateTime | `NOW()` | `NOW()` | `GETDATE()` |
| UTC DateTime | `CURRENT_TIMESTAMP` | `UTC_TIMESTAMP()` | `GETUTCDATE()` |
Extracting Parts of Date

| Part | PostgreSQL | MySQL | SQL Server |
|------|------------|-------|------------|
| Year | `EXTRACT(YEAR FROM ts)` | `YEAR(ts)` | `YEAR(ts)` |
| Month | `EXTRACT(MONTH FROM ts)` | `MONTH(ts)` | `MONTH(ts)` |
| Day | `EXTRACT(DAY FROM ts)` | `DAY(ts)` | `DAY(ts)` |
| Hour | `EXTRACT(HOUR FROM ts)` | `HOUR(ts)` | `DATEPART(HOUR, ts)` |
| Minute | `EXTRACT(MINUTE FROM ts)` | `MINUTE(ts)` | `DATEPART(MINUTE, ts)` |
| Second | `EXTRACT(SECOND FROM ts)` | `SECOND(ts)` | `DATEPART(SECOND, ts)` |
Date Arithmetic

| Operation | PostgreSQL | MySQL | SQL Server |
|-----------|------------|-------|------------|
| Add Days | `ts + INTERVAL '5 days'` | `DATE_ADD(ts, INTERVAL 5 DAY)` | `DATEADD(DAY, 5, ts)` |
| Subtract Days | `ts - INTERVAL '5 days'` | `DATE_SUB(ts, INTERVAL 5 DAY)` | `DATEADD(DAY, -5, ts)` |
| Difference in Days | `AGE(ts1, ts2)` or `ts1 - ts2` | `DATEDIFF(ts1, ts2)` | `DATEDIFF(DAY, ts1, ts2)` |

Formatting Dates

| Task | PostgreSQL | MySQL | SQL Server |
|------|------------|-------|------------|
| Format Date | `TO_CHAR(ts, 'YYYY-MM-DD')` | `DATE_FORMAT(ts, '%Y-%m-%d')` | `FORMAT(ts, 'yyyy-MM-dd')` |
| Parse String → Date | `TO_DATE('2025-09-25', 'YYYY-MM-DD')` | `STR_TO_DATE('2025-09-25', '%Y-%m-%d')` | `CAST('2025-09-25' AS DATE)` |
# Advanced SQL
## CTEs 
Common Table Expression create temporary tables to store results, making complex queries more readable and maintainable, these temp tables exist only for the duration of the main query, streamlining your analysis process
## Subqueries
also known as inner queries, it's basically a query embedded within another, by nesting the queries we can generate tables to perform calculations and filter data within the main query. subqueries enable granular control over data, enhancing the precision of our analysis

