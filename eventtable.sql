-- 1
CREATE OR REPLACE FUNCTION insert_event(
   p_event_title character varying,
    p_organizer character varying,
    p_event_type character varying,
    p_address character varying,
    p_venue character varying,
    p_date_of_booking timestamp without time zone,
    p_date_of_function timestamp without time zone,
    p_number_of_person integer,
    p_mobile_number character varying,
    p_booking_amount character varying,
    p_advance character varying,
    p_balance character varying,
    p_price_per_plate character varying,
    p_note character varying
)
RETURNS VOID AS
$$
DECLARE
    new_id integer;
BEGIN
    -- Calculate the new ID based on the total number of entries
    SELECT COALESCE(max(id), 0) + 1 INTO new_id FROM events;

    -- Insert the new row with the calculated ID
    INSERT INTO events (
        id,
        event_title,
        organizer,
        event_type,
        address,
        venue,
        date_of_booking,
        date_of_function,
        number_of_person,
        mobile_number,
        booking_amount,
        advance,
        balance,
        price_per_plate,
        note
    ) VALUES (
        new_id,
         p_event_title,
        p_organizer,
        p_event_type,
        p_address,
        p_venue,
        p_date_of_booking,
        p_date_of_function,
        p_number_of_person,
        p_mobile_number,
        p_booking_amount,
        p_advance,
        p_balance,
        p_price_per_plate,
        p_note
    );
END;
$$
LANGUAGE plpgsql;
