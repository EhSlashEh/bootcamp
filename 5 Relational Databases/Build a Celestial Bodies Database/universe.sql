--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-04 22:31:35

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

DROP DATABASE universe;
--
-- TOC entry 3335 (class 1262 OID 16398)
-- Name: universe; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Canada.1252';


ALTER DATABASE universe OWNER TO postgres;

\connect universe

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: galaxy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galaxy (
);


ALTER TABLE public.galaxy OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16408)
-- Name: moon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moon (
);


ALTER TABLE public.moon OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16405)
-- Name: planet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planet (
);


ALTER TABLE public.planet OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16402)
-- Name: star; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.star (
);


ALTER TABLE public.star OWNER TO postgres;

--
-- TOC entry 3326 (class 0 OID 16399)
-- Dependencies: 214
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3329 (class 0 OID 16408)
-- Dependencies: 217
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3328 (class 0 OID 16405)
-- Dependencies: 216
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3327 (class 0 OID 16402)
-- Dependencies: 215
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: postgres
--



-- Completed on 2023-04-04 22:31:35

--
-- PostgreSQL database dump complete
--

