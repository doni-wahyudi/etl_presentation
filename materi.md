Slide 1 — Apa itu ETL?

ETL = Extract, Transform, Load

ETL adalah proses untuk:

Extract

Mengambil data dari berbagai data source

Transform

Mengubah dan menyiapkan data agar sesuai dengan kebutuhan

Load

Memasukkan data yang sudah diproses ke target system

Data Sources
     │
     ▼
   Extract
     │
     ▼
  Transform
     │
     ▼
    Load
     │
     ▼
Data Warehouse
Slide 2 — Kenapa Kita Membutuhkan ETL?

Dalam kondisi nyata, data biasanya:

Tersebar di banyak system
Memiliki format berbeda
Memiliki data duplikat
Memiliki missing value
Memiliki kualitas yang tidak konsisten
Membutuhkan business rules
Sulit langsung digunakan untuk reporting
Tanpa ETL
PostgreSQL ──┐
MySQL ───────┤
API ─────────┼──→ Analyst
Excel ───────┘
Dengan ETL
Multiple Data Sources
          │
          ▼
         ETL
          │
          ▼
Centralized Data
          │
          ▼
Analytics / Reporting
Slide 3 — ETL Bukan Sekadar Memindahkan Data

ETL mencakup:

Data Integration
Data Cleaning
Data Standardization
Data Validation
Business Rules
Data Aggregation

ETL = Data Movement + Data Processing + Data Quality

Slide 4 — ETL Tools

Beberapa tools yang umum digunakan:

Category	Tools
Cloud ETL	AWS Glue, Azure Data Factory
Workflow Orchestration	Apache Airflow
Data Integration	Apache NiFi
Enterprise ETL	Informatica, Talend
Transformation	dbt
Big Data Processing	Apache Spark
Workflow Automation	n8n
Slide 5 — Bagaimana Memilih ETL Tools?

Jangan memilih tool hanya berdasarkan popularitas.

Pertimbangkan:

Data volume
Data velocity
Data source
Transformation complexity
Scalability
Cost
Monitoring
Security
Infrastructure
Team expertise

The best tool is not always the most powerful tool.

Slide 6 — ETL vs ELT

ETL = Extract, Transform, Load

Source
  │
  ▼
Extract
  │
  ▼
Transform
  │
  ▼
Load
  │
  ▼
Target

ELT = Extract, Load, Transform

Source
  │
  ▼
Extract
  │
  ▼
Load
  │
  ▼
Data Warehouse
  │
  ▼
Transform
Slide 7 — ETL vs ELT
ETL	ELT
Transform sebelum Load	Transform setelah Load
Processing dilakukan sebelum target	Processing memanfaatkan target
Data biasanya sudah diproses sebelum masuk target	Raw data dapat disimpan terlebih dahulu
Cocok untuk environment tertentu	Cocok untuk modern Data Warehouse
Transformation-centric	Data Warehouse-centric
Slide 8 — Apa itu Extract?

Extract = mengambil data dari data source

Contoh source:

Database
PostgreSQL
MySQL
SQL Server
Oracle
File
CSV
Excel
JSON
XML
External System
REST API
Third-party system
Slide 9 — Jenis Extraction
1. Full Extraction

Mengambil seluruh data.

SELECT *
FROM orders;
2. Incremental Extraction

Mengambil data yang baru atau berubah.

SELECT *
FROM orders
WHERE updated_at > last_extract_time;
3. CDC

CDC = Change Data Capture

Menangkap perubahan:

INSERT
UPDATE
DELETE
Slide 10 — Tantangan pada Extract

Hal yang harus diperhatikan:

Source database load
Network bandwidth
API rate limit
Authentication
Timeout
Retry
Duplicate data
Missing data
Schema changes
Data consistency
Slide 11 — Apa itu Initial Load?

Initial Load = mengambil seluruh existing data untuk pertama kali.

Source
1,000,000 records
       │
       ▼
  Initial Load
       │
       ▼
Target
1,000,000 records

Biasanya dilakukan ketika:

Pipeline pertama kali dibuat
Membuat Data Warehouse baru
Migrasi system
Membuat target table baru
Slide 12 — Contoh Initial Load
Source
orders

ID     Customer    Amount
-------------------------
O001   C001        100000
O002   C002        250000
O003   C003        150000
...
O1M    C999        500000
Initial Load
Extract ALL
     ↓
Transform
     ↓
Load
     ↓
Data Warehouse
Slide 13 — Strategi Initial Load untuk Data Besar
Full Load
Extract everything
       ↓
Target
Batch Load
100K
 ↓
100K
 ↓
100K
 ↓
...
Parallel Load
Partition A ──┐
Partition B ──┤
Partition C ──┼──→ Target
Partition D ──┘
Slide 14 — Apa itu Delta Load?

Delta Load = hanya memproses data yang baru atau berubah sejak proses sebelumnya.

Contoh:

Hari 1
100,000 records
Hari 2
+2,000 new
+500 updated
Delta
2,500 records

Bukan:

102,500 records
Slide 15 — Delta Load Menggunakan Timestamp

Misalnya kita memiliki:

updated_at

Query:

SELECT *
FROM orders
WHERE updated_at > last_successful_load;

Alur:

Last Successful Load
          ↓
     Filter Source
          ↓
    Changed Records
          ↓
       Transform
          ↓
         Load
Slide 16 — Tantangan Delta Load
Late-arriving Data
Event terjadi
10:00

Data masuk
10:15
Update
created_at ≠ updated_at
Delete
Source:
DELETE record

Target:
???
Clock Difference
Application Time
       ≠
Database Time
Slide 17 — Initial Load vs Delta Load
	Initial Load	Delta Load
Data	Semua existing data	Data baru / berubah
Frequency	Biasanya sekali	Periodic / continuous
Volume	Besar	Relatif kecil
Processing	Lebih berat	Lebih ringan
Complexity	Lebih sederhana	Lebih kompleks
Fokus	Baseline	Menjaga data tetap up to date
Slide 18 — Apa itu Data Transformation?

Data Transformation = mengubah raw data menjadi data yang sesuai dengan kebutuhan bisnis dan target system.

Tahapan umum:

Raw Data
   ↓
Cleaning
   ↓
Standardization
   ↓
Validation
   ↓
Join
   ↓
Business Rules
   ↓
Aggregation
   ↓
Curated Data
Slide 19 — Data Cleaning
Raw Data
john doe
JOHN DOE
 John Doe
Setelah Cleaning
JOHN DOE
Duplicate
C001 | John Doe
C001 | John Doe

↓

C001 | John Doe
Slide 20 — Handling Missing Value
Raw
Customer | Age
---------|-----
C001     | 25
C002     | NULL
C003     | 30

Possible handling:

NULL
0
Average
Unknown
Slide 21 — Data Standardization
Date
25/08/2026
2026-08-25
Aug 25, 2026

↓

2026-08-25
Gender
Male
M
L
Pria

↓

M
Currency
Rp 10.000
IDR 10000
10,000 IDR

↓

10000
Slide 22 — Data Validation

Contoh validation rules:

amount >= 0
customer_id IS NOT NULL
order_date <= current_date
email memiliki format valid
Slide 23 — Business Rules
Raw Data
Total Transaction = 1,500,000
Business Rule
IF total >= 1,000,000
THEN customer_segment = "Premium"
Result
Customer Segment
= Premium
Slide 24 — Join Data dari Multiple Sources
Customer
C001 | Doni
C002 | Andi
Order
O001 | C001 | 100000
O002 | C002 | 200000
Product
P001 | Haircut
P002 | Coloring
Setelah Transformation
Customer
   +
Order
   +
Product
   ↓
Integrated Dataset
Slide 25 — Contoh Transformation Pipeline
RAW DATA
   │
   ▼
Filter
   │
   ▼
Clean
   │
   ▼
Standardize
   │
   ▼
Validate
   │
   ▼
Join
   │
   ▼
Business Rules
   │
   ▼
Aggregate
   │
   ▼
CURATED DATA
Slide 26 — Putting Everything Together
                    DATA SOURCES
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      PostgreSQL        MySQL           API
          │              │              │
          └──────────────┼──────────────┘
                         │
                      EXTRACT
                         │
                         ▼
                  INITIAL LOAD
                         │
                         ▼
                     STAGING
                         │
                         ▼
                  TRANSFORMATION
                         │
             ┌───────────┼───────────┐
             │           │           │
          Cleaning   Validation     Join
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                  DATA WAREHOUSE
                         │
                         ▼
                   DATA MART
                         │
                         ▼
                REPORTING / BI

BI = Business Intelligence

Slide 27 — Setelah Initial Load

Setelah baseline tersedia:

             SOURCE
                │
                ▼
           DELTA LOAD
                │
                ▼
          New / Changed Data
                │
                ▼
          TRANSFORMATION
                │
                ▼
         DATA WAREHOUSE
Slide 28 — The Big Picture

ETL is a continuous data pipeline, not a one-time data transfer.

Source
  ↓
Extract
  ↓
Initial Load ────────┐
                     │
                     ▼
                 Transform
                     │
                     ▼
               Data Warehouse
                     ▲
                     │
                 Delta Load
                     │
                     │
                   Source