--      MENU FUNCTIONS      ----
-- 1
CREATE OR REPLACE FUNCTION get_menu_items()
RETURNS TABLE (
    id INT,
    category VARCHAR(50),
    item VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT menu.id, menu.category, menu.item
    FROM catering.menu;
END;
$$ LANGUAGE plpgsql;

-- 2

CREATE OR REPLACE FUNCTION catering.add_menu_item(category VARCHAR(50), item VARCHAR(50))
RETURNS VOID AS $$
DECLARE
    new_id INT;
BEGIN
    -- Get the highest existing ID
    SELECT COALESCE(MAX(id), 0) + 1 INTO new_id FROM catering.menu;

    -- Insert the new record with the generated ID
    INSERT INTO catering.menu (id, category, item)
    VALUES (new_id, category, item);
END;
$$ LANGUAGE plpgsql;

-- 3

CREATE OR REPLACE FUNCTION catering.update_menu_details(
    update_id INT, 
    new_category VARCHAR(50), 
    new_item VARCHAR(50))
RETURNS VOID AS $$
BEGIN
    -- Update the details based on provided inputs
    UPDATE catering.menu
    SET 
        category = COALESCE(new_category, category),
        item = COALESCE(new_item, item)
    WHERE id = update_id;
END;
$$ LANGUAGE plpgsql;