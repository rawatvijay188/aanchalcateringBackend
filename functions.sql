--      MENU FUNCTIONS      ----

CREATE OR REPLACE FUNCTION get_menu_items()
RETURNS TABLE (
    id INT,
    category VARCHAR(50),
    item VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT menu.id, menu.category, menu.item
    FROM public.menu;
END;
$$ LANGUAGE plpgsql;



