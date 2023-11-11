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
    FROM public.menu;
END;
$$ LANGUAGE plpgsql;


--2
CREATE OR REPLACE FUNCTION get_menu_items_by_category(p_category VARCHAR)
RETURNS TABLE (
    id INT,
    category VARCHAR(50),
    item VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT menu.id, menu.category, menu.item
    FROM public.menu
    WHERE menu.category = p_category;
END;
$$ LANGUAGE plpgsql;

-- 2

CREATE OR REPLACE FUNCTION public.add_menu_item(category VARCHAR(50), item VARCHAR(50))
RETURNS VOID AS $$
DECLARE
    new_id INT;
BEGIN
    -- Get the highest existing ID
    SELECT COALESCE(MAX(id), 0) + 1 INTO new_id FROM public.menu;

    -- Insert the new record with the generated ID
    INSERT INTO public.menu (id, category, item)
    VALUES (new_id, category, item);
END;
$$ LANGUAGE plpgsql;

-- 3

CREATE OR REPLACE FUNCTION public.update_menu_details(
    update_id INT, 
    new_category VARCHAR(50), 
    new_item VARCHAR(50))
RETURNS VOID AS $$
BEGIN
    -- Update the details based on provided inputs
    UPDATE public.menu
    SET 
        category = COALESCE(new_category, category),
        item = COALESCE(new_item, item)
    WHERE id = update_id;
END;
$$ LANGUAGE plpgsql;


-- 4

CREATE OR REPLACE FUNCTION public.delete_menu_item(delete_id INT)
RETURNS VOID AS $$
BEGIN
    -- Delete the menu item based on provided ID
    DELETE FROM public.menu WHERE id = delete_id;
END;
$$ LANGUAGE plpgsql;

--- 5
CREATE OR REPLACE FUNCTION get_unique_menu_categories()
RETURNS TABLE (
    category VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT menu.category FROM public.menu;
END;
$$ LANGUAGE plpgsql;

--                 INGEDRIDIENTS FUNCTIONS ----------
-- 5

CREATE OR REPLACE FUNCTION public.add_ingredient(
    p_category character varying,
    p_item character varying,
    p_unit character varying,
    p_rate_per_unit float DEFAULT NULL 
)
RETURNS void AS
$$
DECLARE
    next_id integer;
BEGIN
    SELECT COALESCE(MAX(id), 0) + 1 INTO next_id FROM public.ingredients;

    INSERT INTO public.ingredients (id, category, item, rate_per_unit, unit)
    VALUES (next_id, p_category, p_item, p_rate_per_unit, p_unit);
END;
$$
LANGUAGE plpgsql;


--6

CREATE OR REPLACE FUNCTION public.get_ingredients_by_category(p_category character varying)
RETURNS TABLE (
    id integer,
    category character varying,
    item character varying,
    rate_per_unit float,
    unit character varying
) AS
$$
BEGIN
    RETURN QUERY
    SELECT * FROM public.ingredients WHERE ingredients.category = p_category;
END;
$$
LANGUAGE plpgsql;

--7

CREATE OR REPLACE FUNCTION public.update_ingredient_by_id(
    p_id integer,
    p_category character varying,
    p_item character varying,
    p_rate_per_unit float,
    p_unit character varying
)
RETURNS void AS
$$
BEGIN
    UPDATE public.ingredients
    SET 
        category = p_category,
        item = p_item,
        rate_per_unit = p_rate_per_unit,
        unit = p_unit
    WHERE id = p_id;
END;
$$
LANGUAGE plpgsql;


-- 8

CREATE OR REPLACE FUNCTION public.delete_ingredient_by_id(
    p_id integer
)
RETURNS void AS
$$
BEGIN
    DELETE FROM public.ingredients WHERE id = p_id;
END;
$$
LANGUAGE plpgsql;

---9

SELECT id, category, item, rate_per_unit, unit
	FROM public.ingredients;
	
CREATE OR REPLACE FUNCTION get_unique_ingredient_categories()
RETURNS TABLE (
    category VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ingredients.category FROM public.ingredients;
END;
$$ LANGUAGE plpgsql;


--10
CREATE OR REPLACE FUNCTION get_ingredients_by_category(p_category VARCHAR)
RETURNS TABLE (
    id INT,
    category VARCHAR(50),
    item VARCHAR(50),
    rate_per_unit FLOAT,
    unit VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT ingredients.id, ingredients.category, ingredients.item, ingredients.rate_per_unit, ingredients.unit
    FROM public.ingredients
    WHERE ingredients.category = p_category;
END;
$$ LANGUAGE plpgsql;

--11
CREATE OR REPLACE FUNCTION get_all_ingredients()
RETURNS TABLE (
    id INT,
    category VARCHAR(50),
    item VARCHAR(50),
    rate_per_unit FLOAT,
    unit VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT ingredients.id, ingredients.category, ingredients.item, ingredients.rate_per_unit, ingredients.unit
    FROM public.ingredients;
END;
$$ LANGUAGE plpgsql;