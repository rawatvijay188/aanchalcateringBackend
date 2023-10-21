-- Table: catering.CATERING_ORDERS

-- DROP TABLE IF EXISTS catering."CATERING_ORDERS";

CREATE TABLE IF NOT EXISTS catering."CATERING_ORDERS"
(
    "RATION" jsonb NOT NULL,
    "BAKERY" jsonb NOT NULL,
    "DAIRY" jsonb NOT NULL,
    "DRESS" jsonb NOT NULL,
    "PAANI" jsonb NOT NULL,
    "BURF" jsonb NOT NULL,
    "STALL" jsonb NOT NULL,
    "SBJI" jsonb NOT NULL,
    "OTHER" jsonb NOT NULL,
    "ORDER_DATE" date NOT NULL,
    "CUSTOMER_NAME" character(200) COLLATE pg_catalog."default" NOT NULL,
    "CREATED_DATE" date
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS catering."CATERING_ORDERS"
    OWNER to postgres;