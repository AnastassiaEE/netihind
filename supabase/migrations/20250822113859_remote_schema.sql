

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."get_packages_by_address_test"("p_oid" "text", "p_sort" "text", "p_provider_ids" integer[], "p_technology_ids" integer[]) RETURNS TABLE("provider_name" "text", "provider_img_url" "text", "internet_technology_abbr" "text", "internet_technology_description" "text", "internet_package_name" "text", "internet_package_price" real, "internet_download_speed" numeric, "internet_upload_speed" numeric, "discount_price" real, "discount_duration" "text", "installation_min_price" real, "installation_description" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
     -- First query
        SELECT
        providers.name AS provider_name,                                      
        providers.image_url AS provider_img_url,                             
        technologies.abr AS internet_technology_abbr,                         
        technologies.name AS internet_technology_description,                                         
        provider_internet_packages.name as internet_package_name,                      
        CAST(provider_technology_internet_packages.price as REAL) as internet_package_price, 
        CAST(internet_speeds.download_speed AS NUMERIC) AS internet_download_speed,
        CAST(internet_speeds.upload_speed AS NUMERIC) AS internet_upload_speed,   
        CAST(discounts.price as REAL) as discount_price,                                    
        discounts."length_InMonths" as discount_duration,                     
        CAST(provider_installations.min_price as REAL) as installation_min_price,         
        provider_installations.description as installation_description
    FROM
        addresses
        INNER JOIN address_provider_technologies ON addresses.ads_oid = address_provider_technologies.address_ads_oid
        INNER JOIN provider_technologies ON address_provider_technologies.provider_technology_id = provider_technologies.id
        INNER JOIN providers ON provider_technologies.provider_id = providers.id
        INNER JOIN technologies ON provider_technologies.technology_id = technologies.id
        INNER JOIN technology_types ON technologies.technology_type = technology_types.id
        LEFT JOIN provider_installations ON provider_installations.provider_id = providers.id
        INNER JOIN provider_technology_internet_packages ON provider_technology_internet_packages.provider_technology_id = address_provider_technologies.provider_technology_id
        INNER JOIN provider_internet_packages ON provider_technology_internet_packages.provider_internet_package_id = provider_internet_packages.id
        LEFT JOIN internet_speeds ON provider_internet_packages.internet_speed_id = internet_speeds.id
        LEFT JOIN discounts ON provider_technology_internet_packages.discount_id = discounts.id
    WHERE
        addresses.ads_oid = p_oid
        AND (
            -- Фильтрация по провайдерам
            (p_provider_ids IS NULL OR cardinality(p_provider_ids) = 0 OR provider_technologies.provider_id = ANY(p_provider_ids))
        )
        AND (
            -- Фильтрация по технологиям
            (p_technology_ids IS NULL OR cardinality(p_technology_ids) = 0 OR provider_technologies.technology_id = ANY(p_technology_ids))
        )
        
    ORDER BY
        -- First sort by technology connection type
        CASE
            WHEN p_sort = 'speed_desc' THEN 
                CASE 
                    WHEN technology_types.connection_type_id = 1 THEN 0
                    ELSE 1
                END
            ELSE NULL  -- Default case for other sorts
        END,
        -- Then sort by download speed in descending order
        CASE 
            WHEN p_sort = 'speed_desc' THEN -COALESCE(internet_speeds.download_speed, -999999)
            WHEN p_sort = 'price_asc' THEN COALESCE(discounts.price, provider_technology_internet_packages.price)
            WHEN p_sort = 'price_desc' THEN -COALESCE(discounts.price, provider_technology_internet_packages.price)
            ELSE provider_internet_packages.id 
        END;
END;
$$;


ALTER FUNCTION "public"."get_packages_by_address_test"("p_oid" "text", "p_sort" "text", "p_provider_ids" integer[], "p_technology_ids" integer[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_providers_by_address"("p_oid" "text") RETURNS TABLE("id" smallint, "name" "text", "img_url" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT providers.id as id, providers.name as name, providers.image_url as img_url
    FROM
        address_provider_technologies 
        inner join provider_technologies ON address_provider_technologies.provider_technology_id = provider_technologies.id
        inner join providers on provider_technologies.provider_id = providers.id
    WHERE 
        address_provider_technologies.address_ads_oid = p_oid
    ORDER BY providers.id;
end;
$$;


ALTER FUNCTION "public"."get_providers_by_address"("p_oid" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_string_translations"() RETURNS TABLE("id" smallint, "original" "text", "et" "text", "ru" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY 
    SELECT s.id, s.original, s.et, s.ru
    FROM string_translations s;
END;
$$;


ALTER FUNCTION "public"."get_string_translations"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_technologies_by_address"("p_oid" "text") RETURNS TABLE("id" smallint, "abbr" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT technologies.id, technologies.abr
    FROM
        address_provider_technologies 
        inner join provider_technologies ON address_provider_technologies.provider_technology_id = provider_technologies.id
        inner join technologies on provider_technologies.technology_id = technologies.id
    WHERE 
        address_provider_technologies.address_ads_oid = p_oid
    ORDER BY technologies.id;
end;
$$;


ALTER FUNCTION "public"."get_technologies_by_address"("p_oid" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."technology_types" (
    "id" smallint NOT NULL,
    "service_id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "connection_type_id" smallint
);


ALTER TABLE "public"."technology_types" OWNER TO "postgres";


ALTER TABLE "public"."technology_types" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Typetechnology_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."address_provider_technologies" (
    "address_ads_oid" "text" NOT NULL,
    "provider_technology_id" smallint NOT NULL
);


ALTER TABLE "public"."address_provider_technologies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."address_provider_technologies_duplicate" (
    "address_ads_oid" "text" NOT NULL,
    "provider_technology_id" smallint NOT NULL
);


ALTER TABLE "public"."address_provider_technologies_duplicate" OWNER TO "postgres";


COMMENT ON TABLE "public"."address_provider_technologies_duplicate" IS 'This is a duplicate of address_provider_technologies';



CREATE TABLE IF NOT EXISTS "public"."addresses" (
    "ads_oid" "text" NOT NULL,
    "county" "text" NOT NULL,
    "city" "text" NOT NULL,
    "street" "text" NOT NULL
);


ALTER TABLE "public"."addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."connection_types" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."connection_types" OWNER TO "postgres";


ALTER TABLE "public"."connection_types" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."connection_type_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."device_types" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."device_types" OWNER TO "postgres";


ALTER TABLE "public"."device_types" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."device_types_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."devices" (
    "id" smallint NOT NULL,
    "brand" "text" NOT NULL,
    "model" "text"
);


ALTER TABLE "public"."devices" OWNER TO "postgres";


COMMENT ON TABLE "public"."devices" IS 'all equipment necessary for connection';



CREATE TABLE IF NOT EXISTS "public"."discounts" (
    "id" smallint NOT NULL,
    "description" "text",
    "price" real NOT NULL,
    "length_InMonths" "text" NOT NULL
);


ALTER TABLE "public"."discounts" OWNER TO "postgres";


ALTER TABLE "public"."discounts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."discounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."devices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."equipment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."internet_speeds" (
    "id" smallint NOT NULL,
    "download_speed" smallint,
    "upload_speed" smallint
);


ALTER TABLE "public"."internet_speeds" OWNER TO "postgres";


ALTER TABLE "public"."internet_speeds" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."internet_package_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."provider_internet_packages" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "internet_speed_id" smallint NOT NULL,
    "description" "text",
    "provider_id" smallint DEFAULT '1'::smallint
);


ALTER TABLE "public"."provider_internet_packages" OWNER TO "postgres";


COMMENT ON TABLE "public"."provider_internet_packages" IS 'This is a duplicate of provider_internet_packages';



ALTER TABLE "public"."provider_internet_packages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."internet_packages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 32767
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."payment_options" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."payment_options" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payment_options_id_seq"
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payment_options_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payment_options_id_seq" OWNED BY "public"."payment_options"."id";



CREATE TABLE IF NOT EXISTS "public"."provider_installations" (
    "id" smallint NOT NULL,
    "provider_id" smallint NOT NULL,
    "description" "text",
    "min_price" real NOT NULL
);


ALTER TABLE "public"."provider_installations" OWNER TO "postgres";


ALTER TABLE "public"."provider_installations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."provider_connection_prices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."provider_devices" (
    "id" smallint NOT NULL,
    "provider_id" smallint NOT NULL,
    "device_id" smallint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."provider_devices" OWNER TO "postgres";


ALTER TABLE "public"."provider_devices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."provider_devices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."provider_technologies" (
    "id" smallint NOT NULL,
    "technology_id" smallint NOT NULL,
    "description" "text" NOT NULL,
    "provider_id" smallint NOT NULL
);


ALTER TABLE "public"."provider_technologies" OWNER TO "postgres";


ALTER TABLE "public"."provider_technologies" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."provider_technologies_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."provider_technology_internet_packages" (
    "id" smallint NOT NULL,
    "price" real NOT NULL,
    "discount_id" smallint,
    "provider_internet_package_id" smallint NOT NULL,
    "provider_technology_id" smallint NOT NULL
);


ALTER TABLE "public"."provider_technology_internet_packages" OWNER TO "postgres";


COMMENT ON TABLE "public"."provider_technology_internet_packages" IS 'This is a duplicate of provider_technology_internet_packages';



ALTER TABLE "public"."provider_technology_internet_packages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."provider_technology_internet_packages_duplicate_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 32767
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."provider_tv_channels" (
    "tv_channel_id" smallint NOT NULL,
    "provider_id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "channel_logo" "text",
    "Audio" "text",
    "Subtitles" "text"
);


ALTER TABLE "public"."provider_tv_channels" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."providers" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "company_name" "text" NOT NULL,
    "api_url" "text",
    "image_url" "text"
);


ALTER TABLE "public"."providers" OWNER TO "postgres";


ALTER TABLE "public"."providers" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."providers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."services" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."services" OWNER TO "postgres";


ALTER TABLE "public"."services" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."services_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."string_translations" (
    "id" smallint NOT NULL,
    "original" "text" NOT NULL,
    "et" "text" NOT NULL,
    "ru" "text" NOT NULL
);


ALTER TABLE "public"."string_translations" OWNER TO "postgres";


ALTER TABLE "public"."string_translations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."string_translations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."technologies" (
    "id" smallint NOT NULL,
    "technology_type" smallint NOT NULL,
    "abr" "text" NOT NULL,
    "name" "text",
    "priority" smallint,
    "max_speed" numeric
);


ALTER TABLE "public"."technologies" OWNER TO "postgres";


ALTER TABLE "public"."technologies" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."technologies_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."tv_channels" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."tv_channels" OWNER TO "postgres";


COMMENT ON TABLE "public"."tv_channels" IS 'all tv channels from all providers';



ALTER TABLE "public"."tv_channels" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tv_channels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."payment_options" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payment_options_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."technology_types"
    ADD CONSTRAINT "Typetechnology_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."address_provider_technologies"
    ADD CONSTRAINT "address_ads_oid_provider_technology_id" UNIQUE ("address_ads_oid", "provider_technology_id");



ALTER TABLE ONLY "public"."address_provider_technologies_duplicate"
    ADD CONSTRAINT "address_provider_technologies_address_ads_oid_provider_tech_key" UNIQUE ("address_ads_oid", "provider_technology_id");



ALTER TABLE ONLY "public"."address_provider_technologies_duplicate"
    ADD CONSTRAINT "address_provider_technologies_duplicate_pkey" PRIMARY KEY ("address_ads_oid", "provider_technology_id");



ALTER TABLE ONLY "public"."address_provider_technologies"
    ADD CONSTRAINT "address_provider_technologies_pkey" PRIMARY KEY ("address_ads_oid", "provider_technology_id");



ALTER TABLE ONLY "public"."addresses"
    ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("ads_oid");



ALTER TABLE ONLY "public"."connection_types"
    ADD CONSTRAINT "connection_type_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."connection_types"
    ADD CONSTRAINT "connection_types_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."device_types"
    ADD CONSTRAINT "device_types_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."device_types"
    ADD CONSTRAINT "device_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."discounts"
    ADD CONSTRAINT "discounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."devices"
    ADD CONSTRAINT "equipment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."internet_speeds"
    ADD CONSTRAINT "internet_packages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_internet_packages"
    ADD CONSTRAINT "internet_packages_pkey1" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."internet_speeds"
    ADD CONSTRAINT "internet_speed_variants_download_speed_upload_speed" UNIQUE ("download_speed", "upload_speed");



ALTER TABLE ONLY "public"."providers"
    ADD CONSTRAINT "name_company_name" UNIQUE ("name", "company_name");



ALTER TABLE ONLY "public"."payment_options"
    ADD CONSTRAINT "payment_options_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."payment_options"
    ADD CONSTRAINT "payment_options_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_installations"
    ADD CONSTRAINT "provider_connections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_installations"
    ADD CONSTRAINT "provider_connections_provider_id_key" UNIQUE ("provider_id");



ALTER TABLE ONLY "public"."provider_devices"
    ADD CONSTRAINT "provider_devices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_technologies"
    ADD CONSTRAINT "provider_technologies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_technology_internet_packages"
    ADD CONSTRAINT "provider_technology_internet_packages_duplicate_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."provider_tv_channels"
    ADD CONSTRAINT "provider_tv_channels_pkey" PRIMARY KEY ("provider_id", "tv_channel_id");



ALTER TABLE ONLY "public"."provider_tv_channels"
    ADD CONSTRAINT "provider_tv_channels_tv" UNIQUE ("tv_channel_id", "provider_id");



ALTER TABLE ONLY "public"."providers"
    ADD CONSTRAINT "providers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."technology_types"
    ADD CONSTRAINT "service_id_name" UNIQUE ("service_id", "name");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."string_translations"
    ADD CONSTRAINT "string_translations_original_key" UNIQUE ("original");



ALTER TABLE ONLY "public"."string_translations"
    ADD CONSTRAINT "string_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technology_type_abr_max_speed" UNIQUE ("technology_type", "abr", "max_speed");



ALTER TABLE ONLY "public"."tv_channels"
    ADD CONSTRAINT "tv_channels_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."tv_channels"
    ADD CONSTRAINT "tv_channels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."address_provider_technologies"
    ADD CONSTRAINT "address_provider_technologies_address_ads_oid_fkey" FOREIGN KEY ("address_ads_oid") REFERENCES "public"."addresses"("ads_oid");



ALTER TABLE ONLY "public"."address_provider_technologies_duplicate"
    ADD CONSTRAINT "address_provider_technologies_dupli_provider_technology_id_fkey" FOREIGN KEY ("provider_technology_id") REFERENCES "public"."provider_technologies"("id");



ALTER TABLE ONLY "public"."address_provider_technologies_duplicate"
    ADD CONSTRAINT "address_provider_technologies_duplicate_address_ads_oid_fkey" FOREIGN KEY ("address_ads_oid") REFERENCES "public"."addresses"("ads_oid");



ALTER TABLE ONLY "public"."address_provider_technologies"
    ADD CONSTRAINT "address_provider_technologies_provider_technology_id_fkey" FOREIGN KEY ("provider_technology_id") REFERENCES "public"."provider_technologies"("id");



ALTER TABLE ONLY "public"."provider_internet_packages"
    ADD CONSTRAINT "internet_packages_internet_speed_id_fkey" FOREIGN KEY ("internet_speed_id") REFERENCES "public"."internet_speeds"("id");



ALTER TABLE ONLY "public"."provider_installations"
    ADD CONSTRAINT "provider_connections_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id");



ALTER TABLE ONLY "public"."provider_devices"
    ADD CONSTRAINT "provider_devices_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id");



ALTER TABLE ONLY "public"."provider_devices"
    ADD CONSTRAINT "provider_devices_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id");



ALTER TABLE ONLY "public"."provider_internet_packages"
    ADD CONSTRAINT "provider_internet_packages_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id");



ALTER TABLE ONLY "public"."provider_technologies"
    ADD CONSTRAINT "provider_technologies_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id");



ALTER TABLE ONLY "public"."provider_technologies"
    ADD CONSTRAINT "provider_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id");



ALTER TABLE ONLY "public"."provider_technology_internet_packages"
    ADD CONSTRAINT "provider_technology_internet__provider_internet_package_id_fkey" FOREIGN KEY ("provider_internet_package_id") REFERENCES "public"."provider_internet_packages"("id");



ALTER TABLE ONLY "public"."provider_technology_internet_packages"
    ADD CONSTRAINT "provider_technology_internet_packag_provider_technology_id_fkey" FOREIGN KEY ("provider_technology_id") REFERENCES "public"."provider_technologies"("id");



ALTER TABLE ONLY "public"."provider_technology_internet_packages"
    ADD CONSTRAINT "provider_technology_internet_packages_duplicat_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id");



ALTER TABLE ONLY "public"."provider_tv_channels"
    ADD CONSTRAINT "provider_tv_channels_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id");



ALTER TABLE ONLY "public"."provider_tv_channels"
    ADD CONSTRAINT "provider_tv_channels_tv_channel_id_fkey" FOREIGN KEY ("tv_channel_id") REFERENCES "public"."tv_channels"("id");



ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technologies_technology_type_fkey" FOREIGN KEY ("technology_type") REFERENCES "public"."technology_types"("id");



ALTER TABLE ONLY "public"."technology_types"
    ADD CONSTRAINT "technology_types_connection_type_id_fkey" FOREIGN KEY ("connection_type_id") REFERENCES "public"."connection_types"("id");



ALTER TABLE ONLY "public"."technology_types"
    ADD CONSTRAINT "technology_types_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id");



CREATE POLICY "Address Provider Technologies are viewable by everyone" ON "public"."address_provider_technologies" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Addresses are viewable by everyone" ON "public"."addresses" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Devices are viewable for everyone" ON "public"."devices" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Discounts are viewable by everyone" ON "public"."discounts" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Internet Speeds are viewable by everyone" ON "public"."internet_speeds" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Provider Installations are viewable by everyone" ON "public"."provider_installations" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Provider Internet Packages are viewable by everyone" ON "public"."provider_internet_packages" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Provider Technologies are viewable by everyone" ON "public"."provider_technologies" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Provider Technology Internet Packages are viewable by everyone" ON "public"."provider_technology_internet_packages" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Providers are viewable by everyone" ON "public"."providers" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Services are viewable by everyone" ON "public"."services" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "String Translations are viewable by everyone" ON "public"."string_translations" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Technologies are viewable by everyone" ON "public"."technologies" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "Technology Types are viewable by everyone" ON "public"."technology_types" FOR SELECT TO "authenticated", "anon" USING (true);



ALTER TABLE "public"."address_provider_technologies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."address_provider_technologies_duplicate" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."addresses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."connection_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."device_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."devices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."discounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."internet_speeds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_devices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_installations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_internet_packages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_technologies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_technology_internet_packages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."provider_tv_channels" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."providers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."services" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."string_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."technologies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."technology_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tv_channels" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."get_packages_by_address_test"("p_oid" "text", "p_sort" "text", "p_provider_ids" integer[], "p_technology_ids" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_packages_by_address_test"("p_oid" "text", "p_sort" "text", "p_provider_ids" integer[], "p_technology_ids" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_packages_by_address_test"("p_oid" "text", "p_sort" "text", "p_provider_ids" integer[], "p_technology_ids" integer[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_providers_by_address"("p_oid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_providers_by_address"("p_oid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_providers_by_address"("p_oid" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_string_translations"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_string_translations"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_string_translations"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_technologies_by_address"("p_oid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_technologies_by_address"("p_oid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_technologies_by_address"("p_oid" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."technology_types" TO "anon";
GRANT ALL ON TABLE "public"."technology_types" TO "authenticated";
GRANT ALL ON TABLE "public"."technology_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."Typetechnology_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Typetechnology_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Typetechnology_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."address_provider_technologies" TO "anon";
GRANT ALL ON TABLE "public"."address_provider_technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."address_provider_technologies" TO "service_role";



GRANT ALL ON TABLE "public"."address_provider_technologies_duplicate" TO "anon";
GRANT ALL ON TABLE "public"."address_provider_technologies_duplicate" TO "authenticated";
GRANT ALL ON TABLE "public"."address_provider_technologies_duplicate" TO "service_role";



GRANT ALL ON TABLE "public"."addresses" TO "anon";
GRANT ALL ON TABLE "public"."addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."addresses" TO "service_role";



GRANT ALL ON TABLE "public"."connection_types" TO "anon";
GRANT ALL ON TABLE "public"."connection_types" TO "authenticated";
GRANT ALL ON TABLE "public"."connection_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."connection_type_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."connection_type_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."connection_type_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."device_types" TO "anon";
GRANT ALL ON TABLE "public"."device_types" TO "authenticated";
GRANT ALL ON TABLE "public"."device_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."device_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."device_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."device_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."devices" TO "anon";
GRANT ALL ON TABLE "public"."devices" TO "authenticated";
GRANT ALL ON TABLE "public"."devices" TO "service_role";



GRANT ALL ON TABLE "public"."discounts" TO "anon";
GRANT ALL ON TABLE "public"."discounts" TO "authenticated";
GRANT ALL ON TABLE "public"."discounts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."equipment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."equipment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."equipment_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."internet_speeds" TO "anon";
GRANT ALL ON TABLE "public"."internet_speeds" TO "authenticated";
GRANT ALL ON TABLE "public"."internet_speeds" TO "service_role";



GRANT ALL ON SEQUENCE "public"."internet_package_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."internet_package_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."internet_package_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_internet_packages" TO "anon";
GRANT ALL ON TABLE "public"."provider_internet_packages" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_internet_packages" TO "service_role";



GRANT ALL ON SEQUENCE "public"."internet_packages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."internet_packages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."internet_packages_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payment_options" TO "anon";
GRANT ALL ON TABLE "public"."payment_options" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_options" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_installations" TO "anon";
GRANT ALL ON TABLE "public"."provider_installations" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_installations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."provider_connection_prices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."provider_connection_prices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."provider_connection_prices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_devices" TO "anon";
GRANT ALL ON TABLE "public"."provider_devices" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_devices" TO "service_role";



GRANT ALL ON SEQUENCE "public"."provider_devices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."provider_devices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."provider_devices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_technologies" TO "anon";
GRANT ALL ON TABLE "public"."provider_technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_technologies" TO "service_role";



GRANT ALL ON SEQUENCE "public"."provider_technologies_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."provider_technologies_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."provider_technologies_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_technology_internet_packages" TO "anon";
GRANT ALL ON TABLE "public"."provider_technology_internet_packages" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_technology_internet_packages" TO "service_role";



GRANT ALL ON SEQUENCE "public"."provider_technology_internet_packages_duplicate_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."provider_technology_internet_packages_duplicate_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."provider_technology_internet_packages_duplicate_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."provider_tv_channels" TO "anon";
GRANT ALL ON TABLE "public"."provider_tv_channels" TO "authenticated";
GRANT ALL ON TABLE "public"."provider_tv_channels" TO "service_role";



GRANT ALL ON TABLE "public"."providers" TO "anon";
GRANT ALL ON TABLE "public"."providers" TO "authenticated";
GRANT ALL ON TABLE "public"."providers" TO "service_role";



GRANT ALL ON SEQUENCE "public"."providers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."providers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."providers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."services" TO "anon";
GRANT ALL ON TABLE "public"."services" TO "authenticated";
GRANT ALL ON TABLE "public"."services" TO "service_role";



GRANT ALL ON SEQUENCE "public"."services_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."services_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."services_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."string_translations" TO "anon";
GRANT ALL ON TABLE "public"."string_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."string_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."string_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."string_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."string_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."technologies" TO "anon";
GRANT ALL ON TABLE "public"."technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."technologies" TO "service_role";



GRANT ALL ON SEQUENCE "public"."technologies_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."technologies_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."technologies_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tv_channels" TO "anon";
GRANT ALL ON TABLE "public"."tv_channels" TO "authenticated";
GRANT ALL ON TABLE "public"."tv_channels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tv_channels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tv_channels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tv_channels_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
